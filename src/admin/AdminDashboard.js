import { useCallback, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Alert, Badge, Button, Container, Form, Modal, Spinner, Table } from "react-bootstrap";
import { ALLOWED_EMAIL, supabase } from "./supabase";
import { formatDate } from "./constants";
import CodeFormModal from "./CodeFormModal";
import CodeDetailModal from "./CodeDetailModal";
import PromoSection from "./PromoSection";

/**
 * Kadra owner dashboard (ANILAR spec 33 §3), served only at /secretadmindashboard — linked
 * from nowhere, noindex'd via the meta below AND an X-Robots-Tag header (public/_headers),
 * and deliberately absent from robots.txt/sitemap (a Disallow line would advertise the path).
 *
 * The email check here is COSMETIC (fail-fast UX). The real boundary is is_kadra_admin()
 * inside every admin_* RPC: email + Google provider, verified server-side in Postgres.
 */
export default function AdminDashboard() {
  const [session, setSession] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [codes, setCodes] = useState(null);
  const [loadError, setLoadError] = useState(null);

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [formBusy, setFormBusy] = useState(false);
  const [formError, setFormError] = useState(null);

  const [detailCode, setDetailCode] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteText, setDeleteText] = useState("");
  const [deleteBusy, setDeleteBusy] = useState(false);

  useEffect(() => {
    document.title = "Kadra Admin";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setAuthLoading(false);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const email = session?.user?.email ?? null;
  const authorized = email === ALLOWED_EMAIL;

  const loadCodes = useCallback(async () => {
    setLoadError(null);
    const { data, error } = await supabase.rpc("admin_list_partner_codes");
    if (error) setLoadError(error.message);
    else setCodes(data);
  }, []);

  useEffect(() => {
    if (authorized) loadCodes();
  }, [authorized, loadCodes]);

  async function signIn() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/secretadmindashboard` },
    });
  }

  async function submitForm(values) {
    setFormBusy(true);
    setFormError(null);
    const { error } = editing
      ? await supabase.rpc("admin_update_partner_code", {
          p_id: editing.id,
          p_label: values.label,
          p_max_accounts: values.maxAccounts,
          p_free_album_limit: values.freeAlbumLimit,
          p_max_tier: values.maxTier,
          p_active: values.active,
        })
      : await supabase.rpc("admin_create_partner_code", {
          p_code: values.code,
          p_label: values.label,
          p_max_accounts: values.maxAccounts,
          p_free_album_limit: values.freeAlbumLimit,
          p_max_tier: values.maxTier,
        });
    setFormBusy(false);
    if (error) {
      setFormError(error.message.includes("CODE_TAKEN") ? "That code already exists." : error.message);
      return;
    }
    setFormOpen(false);
    setEditing(null);
    loadCodes();
  }

  /** Quick active/inactive flip straight from the table row (full-replace update, spec 33 §1). */
  async function toggleActive(row) {
    const { error } = await supabase.rpc("admin_update_partner_code", {
      p_id: row.id,
      p_label: row.label || "",
      p_max_accounts: row.max_accounts,
      p_free_album_limit: row.free_album_limit,
      p_max_tier: row.max_tier,
      p_active: !row.active,
    });
    if (error) setLoadError(error.message);
    else loadCodes();
  }

  async function confirmDelete() {
    setDeleteBusy(true);
    const { error } = await supabase.rpc("admin_delete_partner_code", { p_id: deleting.id });
    setDeleteBusy(false);
    if (error) {
      setLoadError(error.message);
    }
    setDeleting(null);
    setDeleteText("");
    loadCodes();
  }

  if (authLoading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!session) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: 420 }}>
        <h4 className="mb-4">Kadra Admin</h4>
        <Button onClick={signIn}>Sign in with Google</Button>
      </Container>
    );
  }

  if (!authorized) {
    return (
      <Container className="py-5 text-center" style={{ maxWidth: 480 }}>
        <Alert variant="danger">
          Signed in as <strong>{email}</strong> — not authorized.
        </Alert>
        <Button variant="secondary" onClick={() => supabase.auth.signOut()}>
          Sign out
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-4" style={{ maxWidth: 1100 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Partner codes</h4>
        <div>
          <Button
            className="me-2"
            onClick={() => {
              setEditing(null);
              setFormError(null);
              setFormOpen(true);
            }}
          >
            New code
          </Button>
          <Button variant="outline-secondary" onClick={() => supabase.auth.signOut()}>
            Sign out
          </Button>
        </div>
      </div>

      {loadError && <Alert variant="danger">{loadError}</Alert>}

      {!codes ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : codes.length === 0 ? (
        <Alert variant="light" className="text-center border">
          No partner codes yet — create the first one.
        </Alert>
      ) : (
        <Table hover responsive>
          <thead>
            <tr>
              <th>Code</th>
              <th>Label</th>
              <th>Accounts</th>
              <th>Free albums</th>
              <th>Max tier</th>
              <th>Status</th>
              <th>Created</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {codes.map((c) => (
              <tr key={c.id}>
                <td style={{ fontFamily: "monospace" }}>{c.code}</td>
                <td>{c.label || "—"}</td>
                <td>
                  {c.member_count}/{c.max_accounts}
                </td>
                <td>
                  {c.albums_used}
                  {c.free_album_limit == null ? " / ∞" : ` / ${c.free_album_limit}`}
                </td>
                <td>{c.max_tier == null ? "No cap" : `≤ ${c.max_tier}`}</td>
                <td>
                  <Badge bg={c.active ? "success" : "secondary"}>{c.active ? "Active" : "Inactive"}</Badge>
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
                  <Button size="sm" variant="outline-secondary" className="me-1" onClick={() => toggleActive(c)}>
                    {c.active ? "Deactivate" : "Activate"}
                  </Button>
                  <Button size="sm" variant="outline-danger" onClick={() => setDeleting(c)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <PromoSection />

      <CodeFormModal
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

      <CodeDetailModal
        show={detailCode != null}
        code={detailCode}
        onChanged={loadCodes}
        onClose={() => setDetailCode(null)}
      />

      <Modal show={deleting != null} onHide={deleteBusy ? undefined : () => setDeleting(null)} centered>
        <Modal.Header closeButton={!deleteBusy}>
          <Modal.Title>Delete {deleting?.code}?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This permanently deletes the code and unlinks its {deleting?.member_count} account(s). Albums already
            created stay untouched; usage history is kept. Prefer <strong>Deactivate</strong> unless you're sure.
          </p>
          <Form.Label>
            Type <code>{deleting?.code}</code> to confirm:
          </Form.Label>
          <Form.Control value={deleteText} onChange={(e) => setDeleteText(e.target.value)} autoFocus />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleting(null)} disabled={deleteBusy}>
            Cancel
          </Button>
          <Button variant="danger" disabled={deleteText !== deleting?.code || deleteBusy} onClick={confirmDelete}>
            {deleteBusy ? "Deleting…" : "Delete forever"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
