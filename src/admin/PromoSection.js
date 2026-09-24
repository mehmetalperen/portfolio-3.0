import { useCallback, useEffect, useState } from "react";
import { Alert, Badge, Button, Form, InputGroup, Spinner, Table } from "react-bootstrap";
import { supabase } from "./supabase";
import { formatDate, tierFromProductId } from "./constants";
import PromoFormModal from "./PromoFormModal";
import PromoDetailModal from "./PromoDetailModal";

/**
 * Discount codes (ANILAR Spec 21, admin RPCs from migration 0051). Self-contained section
 * rendered under the partner codes: list + create + edit + per-code redemption history +
 * the account-wide lifetime limit (promo_config, the third bound on every redemption —
 * min(per-user remaining, lifetime remaining, pool remaining) is what a redeem grants).
 * No delete on purpose: redemption history must stay honest; retiring a code = deactivate.
 */
export default function PromoSection() {
  const [codes, setCodes] = useState(null);
  const [config, setConfig] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formBusy, setFormBusy] = useState(false);
  const [formError, setFormError] = useState(null);
  const [detailCode, setDetailCode] = useState(null);

  const [limitDraft, setLimitDraft] = useState("");
  const [limitBusy, setLimitBusy] = useState(false);

  const load = useCallback(async () => {
    setLoadError(null);
    const [codesRes, configRes] = await Promise.all([
      supabase.rpc("admin_list_promo_codes"),
      supabase.rpc("admin_get_promo_config"),
    ]);
    if (codesRes.error) setLoadError(codesRes.error.message);
    else setCodes(codesRes.data);
    if (!configRes.error && configRes.data) {
      setConfig(configRes.data);
      setLimitDraft(String(configRes.data.lifetime_redemption_limit));
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function submitForm(values) {
    setFormBusy(true);
    setFormError(null);
    const { error } = editing
      ? await supabase.rpc("admin_update_promo_code", {
          p_id: editing.id,
          p_per_user_limit: values.perUserLimit,
          p_max_redemptions: values.maxRedemptions,
          p_bonus_redemptions: values.bonusRedemptions,
          p_applicable_tiers: values.applicableTiers,
          p_active: values.active,
          p_note: values.note,
        })
      : await supabase.rpc("admin_create_promo_code", {
          p_code: values.code,
          p_per_user_limit: values.perUserLimit,
          p_max_redemptions: values.maxRedemptions,
          p_applicable_tiers: values.applicableTiers,
          p_note: values.note,
        });
    setFormBusy(false);
    if (error) {
      setFormError(error.message.includes("CODE_TAKEN") ? "That code already exists." : error.message);
      return;
    }
    setFormOpen(false);
    setEditing(null);
    load();
  }

  async function toggleActive(row) {
    const { error } = await supabase.rpc("admin_update_promo_code", {
      p_id: row.id,
      p_per_user_limit: row.per_user_limit,
      p_max_redemptions: row.max_redemptions,
      p_bonus_redemptions: row.bonus_redemptions,
      p_applicable_tiers: row.applicable_tiers,
      p_active: !row.active,
      p_note: row.note || "",
    });
    if (error) setLoadError(error.message);
    else load();
  }

  async function saveLimit() {
    setLimitBusy(true);
    const { error } = await supabase.rpc("admin_update_promo_config", {
      p_lifetime_limit: Number(limitDraft),
    });
    setLimitBusy(false);
    if (error) setLoadError(error.message);
    else load();
  }

  function tiersLabel(row) {
    if (row.applicable_tiers == null) return "Standard (10–500)";
    return row.applicable_tiers
      .map((t) => tierFromProductId(t))
      .filter(Boolean)
      .sort((a, b) => a - b)
      .join(", ");
  }

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Discount codes</h4>
        <Button
          onClick={() => {
            setEditing(null);
            setFormError(null);
            setFormOpen(true);
          }}
        >
          New code
        </Button>
      </div>

      {config ? (
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="text-muted" style={{ fontSize: "0.9rem" }}>
            Account-wide lifetime limit (every code combined, per user):
          </span>
          <InputGroup size="sm" style={{ width: 140 }}>
            <Form.Control
              type="number"
              min={0}
              value={limitDraft}
              onChange={(e) => setLimitDraft(e.target.value)}
            />
            <Button
              variant="outline-secondary"
              disabled={limitBusy || Number(limitDraft) === config.lifetime_redemption_limit}
              onClick={saveLimit}
            >
              {limitBusy ? "…" : "Save"}
            </Button>
          </InputGroup>
        </div>
      ) : null}

      {loadError && <Alert variant="danger">{loadError}</Alert>}

      {!codes ? (
        <div className="text-center py-4">
          <Spinner animation="border" size="sm" />
        </div>
      ) : codes.length === 0 ? (
        <Alert variant="light" className="text-center border">
          No discount codes yet.
        </Alert>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Code</th>
              <th>Used</th>
              <th>Per user</th>
              <th>Unspent</th>
              <th>Tiers</th>
              <th>Status</th>
              <th>Note</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: "monospace" }}>{c.code}</td>
                <td>
                  {c.redemptions_count}/{c.max_redemptions + c.bonus_redemptions}
                  {c.bonus_redemptions > 0 ? (
                    <span className="text-muted"> (+{c.bonus_redemptions} bonus)</span>
                  ) : null}
                </td>
                <td>{c.per_user_limit}</td>
                <td>{c.unassigned_count}</td>
                <td>{tiersLabel(c)}</td>
                <td>
                  <Badge bg={c.active ? "success" : "secondary"}>{c.active ? "Active" : "Inactive"}</Badge>
                </td>
                <td className="text-muted" style={{ maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {c.note || "—"}
                </td>
                <td>{formatDate(c.created_at)}</td>
                <td className="text-end" style={{ whiteSpace: "nowrap" }}>
                  <Button size="sm" variant="outline-primary" className="me-1" onClick={() => setDetailCode(c)}>
                    Detail
                  </Button>
                  <Button
                    size="sm"
                    variant="outline-secondary"
                    className="me-1"
                    onClick={() => {
                      setEditing(c);
                      setFormError(null);
                      setFormOpen(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button size="sm" variant="outline-secondary" onClick={() => toggleActive(c)}>
                    {c.active ? "Deactivate" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <PromoFormModal
        show={formOpen}
        editing={editing}
        busy={formBusy}
        error={formError}
        onSubmit={submitForm}
        onClose={() => {
          setFormOpen(false);
          setEditing(null);
        }}
      />
      <PromoDetailModal show={detailCode != null} code={detailCode} onClose={() => setDetailCode(null)} />
    </div>
  );
}
