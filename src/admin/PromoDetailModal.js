import { useEffect, useState } from "react";
import { Alert, Badge, Button, Modal, Spinner, Table } from "react-bootstrap";
import { supabase } from "./supabase";
import { formatDate, tierFromProductId } from "./constants";

/**
 * Redemption history for one discount code: who redeemed, whether the credit is still
 * unspent or which tier (and album, via the deterministic 'promo_<id>' purchase link) it
 * bought — with the same album stats the partner detail shows (id, guests, photos; needs
 * ANILAR migration 0052). Read-only — per-user lifetime top-ups
 * (promo_user_budget.bonus_redemptions) stay a Table Editor affair for now.
 */
export default function PromoDetailModal({ show, code, onClose }) {
  const [rows, setRows] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show || !code) return;
    setRows(null);
    setError(null);
    supabase
      .rpc("admin_get_promo_code_detail", { p_id: code.id })
      .then(({ data, error: err }) => {
        if (err) setError(err.message);
        else setRows(data);
      });
  }, [show, code]);

  if (!code) return null;
  return (
    <Modal show={show} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          <span style={{ fontFamily: "monospace" }}>{code.code}</span>
          <Badge bg="secondary" className="ms-2 fs-6">
            {code.redemptions_count}/{code.max_redemptions + code.bonus_redemptions} used
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {!rows ? (
          <div className="text-center py-4">
            <Spinner animation="border" size="sm" />
          </div>
        ) : rows.length === 0 ? (
          <p className="text-muted">Nobody has redeemed this code yet.</p>
        ) : (
          <Table size="sm" hover responsive>
            <thead>
              <tr>
                <th>Redeemed</th>
                <th>By</th>
                <th>Spent on</th>
                <th>Album</th>
                <th>Guests</th>
                <th>Photos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td>{formatDate(r.redeemed_at)}</td>
                  <td>
                    {r.email || "—"}
                    {r.display_name ? <span className="text-muted"> ({r.display_name})</span> : null}
                  </td>
                  <td>
                    {r.tier_product_id ? (
                      `${tierFromProductId(r.tier_product_id)} guests`
                    ) : (
                      <Badge bg="light" text="dark">
                        unspent credit
                      </Badge>
                    )}
                  </td>
                  <td>
                    {r.film_id ? (
                      <>
                        {r.film_name || <em>deleted album</em>}
                        <div className="text-muted" style={{ fontSize: "0.72rem", fontFamily: "monospace" }}>
                          {r.film_id}
                        </div>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td>{r.guest_count ?? "—"}</td>
                  <td>{r.photo_count ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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
