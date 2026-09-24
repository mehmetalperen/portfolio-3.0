import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { TIERS, generateCode } from "./constants";

/**
 * Create + edit share one modal: `editing` (a row from admin_list_partner_codes) switches the
 * mode. The code itself is immutable after creation (admin_update_partner_code doesn't accept
 * it — partners may already have it printed somewhere).
 */
export default function CodeFormModal({ show, editing, busy, error, onSubmit, onClose }) {
  const [code, setCode] = useState("");
  const [label, setLabel] = useState("");
  const [maxAccounts, setMaxAccounts] = useState(1);
  const [infiniteAlbums, setInfiniteAlbums] = useState(false);
  const [albumLimit, setAlbumLimit] = useState(10);
  const [maxTier, setMaxTier] = useState(""); // "" = no cap
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!show) return;
    if (editing) {
      setCode(editing.code);
      setLabel(editing.label || "");
      setMaxAccounts(editing.max_accounts);
      setInfiniteAlbums(editing.free_album_limit == null);
      setAlbumLimit(editing.free_album_limit == null ? 10 : editing.free_album_limit);
      setMaxTier(editing.max_tier == null ? "" : String(editing.max_tier));
      setActive(editing.active);
    } else {
      setCode(generateCode());
      setLabel("");
      setMaxAccounts(1);
      setInfiniteAlbums(false);
      setAlbumLimit(10);
      setMaxTier("");
      setActive(true);
    }
  }, [show, editing]);

  function submit(e) {
    e.preventDefault();
    onSubmit({
      code: code.trim(),
      label: label.trim(),
      maxAccounts: Number(maxAccounts),
      freeAlbumLimit: infiniteAlbums ? null : Number(albumLimit),
      maxTier: maxTier === "" ? null : Number(maxTier),
      active,
    });
  }

  const valid =
    (editing || code.trim().length >= 6) &&
    Number(maxAccounts) > 0 &&
    (infiniteAlbums || Number(albumLimit) > 0);

  return (
    <Modal show={show} onHide={busy ? undefined : onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton={!busy}>
          <Modal.Title>{editing ? `Edit ${editing.code}` : "New partner code"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {!editing && (
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Row className="g-2">
                <Col>
                  <Form.Control
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase())}
                    style={{ fontFamily: "monospace", letterSpacing: "1px" }}
                  />
                </Col>
                <Col xs="auto">
                  <Button variant="outline-secondary" onClick={() => setCode(generateCode())}>
                    Generate
                  </Button>
                </Col>
              </Row>
              <Form.Text muted>At least 6 characters. Partners type this, so keep it readable.</Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Label (partner name)</Form.Label>
            <Form.Control
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Ayşe Wedding Venue"
            />
            <Form.Text muted>Shown to the partner when they link. Optional.</Form.Text>
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Max linked Google accounts</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={maxAccounts}
                  onChange={(e) => setMaxAccounts(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Max tier (free)</Form.Label>
                <Form.Select value={maxTier} onChange={(e) => setMaxTier(e.target.value)}>
                  <option value="">No cap (all tiers)</option>
                  {TIERS.map((t) => (
                    <option key={t} value={t}>
                      up to {t} guests
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Free album limit</Form.Label>
            <Row className="g-2 align-items-center">
              <Col xs="auto">
                <Form.Check
                  type="switch"
                  id="infinite-albums"
                  label="Infinite"
                  checked={infiniteAlbums}
                  onChange={(e) => setInfiniteAlbums(e.target.checked)}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  min={1}
                  value={albumLimit}
                  onChange={(e) => setAlbumLimit(e.target.value)}
                  disabled={infiniteAlbums}
                />
              </Col>
            </Row>
            <Form.Text muted>Shared pool across every account linked to this code.</Form.Text>
          </Form.Group>
          {editing && (
            <Form.Check
              type="switch"
              id="code-active"
              label="Active"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={busy}>
            Cancel
          </Button>
          <Button type="submit" disabled={!valid || busy}>
            {busy ? "Saving…" : editing ? "Save changes" : "Create code"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
