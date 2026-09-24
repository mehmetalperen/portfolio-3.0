import { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Modal, Spinner, Table } from "react-bootstrap";
import { supabase } from "./supabase";
import { formatDate, tierFromProductId } from "./constants";

/**
 * Everything Mehmet asked to see per code (ANILAR spec 33 §3): the linked Google accounts
 * (with unlink) and every album the code's pool paid for — name, id, tier, guest count,
 * photo count. An album row with no film means the allowance was spent but the film insert
 * never landed; the unconsumed purchase covers the partner's next attempt (self-healing).
 */
export default function CodeDetailModal({ show, code, onChanged, onClose }) {
  const [detail, setDetail] = useState(null);
  const [error, setError] = useState(null);
  const [busyUserId, setBusyUserId] = useState(null);

  const load = useCallback(async () => {
    setError(null);
    const { data, error: err } = await supabase.rpc("admin_get_partner_code_detail", {
      p_code_id: code.id,
    });
    if (err) setError(err.message);
    else setDetail(data);
  }, [code]);

  useEffect(() => {
    if (show && code) {
      setDetail(null);
      load();
    }
  }, [show, code, load]);

  async function unlink(userId, email) {
    if (!window.confirm(`Unlink ${email} from ${code.code}? They keep their albums; the account slot frees up.`)) return;
    setBusyUserId(userId);
    const { error: err } = await supabase.rpc("admin_unlink_partner_member", {
      p_code_id: code.id,
      p_user_id: userId,
    });
    setBusyUserId(null);
    if (err) setError(err.message);
    else {
      await load();
      onChanged(); // member count changed — refresh the codes table behind the modal
    }
  }

  if (!code) return null;
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span style={{ fontFamily: "monospace" }}>{code.code}</span>
          {code.label ? <span className="text-muted fs-6 ms-2">{code.label}</span> : null}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!detail ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : (
          <>
            <h6>
              Linked accounts{" "}
              <Badge bg="secondary">
                {detail.members.length}/{code.max_accounts}
              </Badge>
            </h6>
            {detail.members.length === 0 ? (
              <p className="text-muted">Nobody has linked this code yet.</p>
            ) : (
              <Table size="sm" hover responsive>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Linked</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {detail.members.map((m) => (
                    <tr key={m.user_id}>
                      <td>{m.email}</td>
                      <td>{m.display_name || "—"}</td>
                      <td>{formatDate(m.linked_at)}</td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          disabled={busyUserId === m.user_id}
                          onClick={() => unlink(m.user_id, m.email)}
                        >
                          {busyUserId === m.user_id ? "…" : "Unlink"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <h6 className="mt-4">
              Free albums used{" "}
              <Badge bg="secondary">
                {code.albums_used}
                {code.free_album_limit == null ? " (∞ pool)" : `/${code.free_album_limit}`}
              </Badge>
            </h6>
            {detail.albums.length === 0 ? (
              <p className="text-muted">No free albums created yet.</p>
            ) : (
              <Table size="sm" hover responsive>
                <thead>
                  <tr>
                    <th>Album</th>
                    <th>Tier</th>
                    <th>Guests</th>
                    <th>Photos</th>
                    <th>By</th>
                    <th>Used</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.albums.map((a, i) => (
                    <tr key={i}>
                      <td>
                        {a.film_id ? (
                          <>
                            {a.film_name || <em>deleted album</em>}
                            <div className="text-muted" style={{ fontSize: "0.72rem", fontFamily: "monospace" }}>
                              {a.film_id}
                            </div>
                          </>
                        ) : (
                          <em className="text-muted">not used yet (creation didn’t finish; covers their next album)</em>
                        )}
                      </td>
                      <td>{tierFromProductId(a.tier_product_id) ?? "—"}</td>
                      <td>{a.guest_count ?? "—"}</td>
                      <td>{a.photo_count ?? "—"}</td>
                      <td>{a.created_by_email || "—"}</td>
                      <td>{formatDate(a.used_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
