import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, Modal, Row } from "react-bootstrap";
import { MEGA_TIERS, productIdForTier, STANDARD_PROMO_TIERS } from "./constants";

const ALL_TIERS = [...STANDARD_PROMO_TIERS, ...MEGA_TIERS];

/**
 * Create + edit for discount codes (Spec 21). The code text is immutable after creation.
 * bonus_redemptions (edit only) is the manual pool top-up — additive on purpose, so the
 * honest redemptions counter never gets rewound. "All standard tiers" = applicable_tiers
 * NULL, which server-side means 10–500 and never the mega tiers; covering 1000/1500/2000
 * requires switching to an explicit list.
 */
export default function PromoFormModal({ show, editing, busy, error, onSubmit, onClose }) {
  const [code, setCode] = useState("");
  const [note, setNote] = useState("");
  const [perUser, setPerUser] = useState(1);
  const [maxRedemptions, setMaxRedemptions] = useState(20);
  const [bonus, setBonus] = useState(0);
  const [anyTier, setAnyTier] = useState(true);
  const [tiers, setTiers] = useState([]);
  const [active, setActive] = useState(true);

  useEffect(() => {
    if (!show) return;
    if (editing) {
      setCode(editing.code);
      setNote(editing.note || "");
      setPerUser(editing.per_user_limit);
      setMaxRedemptions(editing.max_redemptions);
      setBonus(editing.bonus_redemptions);
      setAnyTier(editing.applicable_tiers == null);
      setTiers(editing.applicable_tiers ?? []);
      setActive(editing.active);
    } else {
      setCode("");
      setNote("");
      setPerUser(1);
      setMaxRedemptions(20);
      setBonus(0);
      setAnyTier(true);
      setTiers([]);
      setActive(true);
    }
  }, [show, editing]);

  function toggleTier(productId) {
    setTiers((current) =>
      current.includes(productId) ? current.filter((t) => t !== productId) : [...current, productId],
    );
  }

  function submit(e) {
    e.preventDefault();
    onSubmit({
      code: code.trim(),
      note: note.trim(),
      perUserLimit: Number(perUser),
      maxRedemptions: Number(maxRedemptions),
      bonusRedemptions: Number(bonus),
      applicableTiers: anyTier ? null : tiers,
      active,
    });
  }

  const valid =
    (editing || code.trim().length > 0) &&
    Number(perUser) > 0 &&
    Number(maxRedemptions) > 0 &&
    (editing ? Number(bonus) >= 0 : true) &&
    (anyTier || tiers.length > 0);

  return (
    <Modal show={show} onHide={busy ? undefined : onClose} centered>
      <Form onSubmit={submit}>
        <Modal.Header closeButton={!busy}>
          <Modal.Title>{editing ? `Edit ${editing.code}` : "New discount code"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {!editing && (
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ fontFamily: "monospace", letterSpacing: "1px" }}
                placeholder="e.g. yaz2026"
              />
              <Form.Text muted>Users type this in the app's discount sheet. Case-insensitive.</Form.Text>
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Note (internal)</Form.Label>
            <Form.Control value={note} onChange={(e) => setNote(e.target.value)} placeholder="never shown to users" />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Per-user limit</Form.Label>
                <Form.Control type="number" min={1} value={perUser} onChange={(e) => setPerUser(e.target.value)} />
                <Form.Text muted>Uses of THIS code per account.</Form.Text>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Total pool</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  value={maxRedemptions}
                  onChange={(e) => setMaxRedemptions(e.target.value)}
                />
                <Form.Text muted>Redemptions across ALL users.</Form.Text>
              </Form.Group>
            </Col>
            {editing ? (
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Bonus</Form.Label>
                  <Form.Control type="number" min={0} value={bonus} onChange={(e) => setBonus(e.target.value)} />
                  <Form.Text muted>Additive pool top-up.</Form.Text>
                </Form.Group>
              </Col>
            ) : null}
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Tiers this code can unlock</Form.Label>
            <Form.Check
              type="radio"
              id="promo-any-tier"
              label="All standard tiers (10–500 guests — mega tiers excluded by design)"
              checked={anyTier}
              onChange={() => setAnyTier(true)}
            />
            <Form.Check
              type="radio"
              id="promo-specific-tiers"
              label="Specific tiers"
              checked={!anyTier}
              onChange={() => setAnyTier(false)}
            />
            {!anyTier ? (
              <div className="mt-2 d-flex flex-wrap gap-3">
                {ALL_TIERS.map((n) => (
                  <Form.Check
                    key={n}
                    type="checkbox"
                    id={`promo-tier-${n}`}
                    label={MEGA_TIERS.includes(n) ? `${n} (mega)` : String(n)}
                    checked={tiers.includes(productIdForTier(n))}
                    onChange={() => toggleTier(productIdForTier(n))}
                  />
                ))}
              </div>
            ) : null}
          </Form.Group>
          {editing && (
            <Form.Check
              type="switch"
              id="promo-active"
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
