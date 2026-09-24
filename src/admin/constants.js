/** Participant tiers as they exist in Kadra (ANILAR src/features/films/tiers.ts). Used for the
 * max-tier dropdown; "no cap" is represented as null. 5 is the free tier — a max_tier of 5
 * would make a code decorative, so the dropdown starts at 10. */
export const TIERS = [10, 25, 50, 100, 200, 300, 400, 500, 1000, 1500, 2000];

/** "com.mehmetalperen.anilar.participants100" -> 100 (display helper for album rows). */
export function tierFromProductId(productId) {
  const m = /participants(\d+)$/.exec(productId || "");
  return m ? Number(m[1]) : null;
}

/** KDR-XXXX-XXXX from an alphabet without lookalikes (no 0/O/1/I/L). ~32^8 ≈ 10^12 codes —
 * the entropy is what makes the anon-callable validate_partner_code oracle non-brute-forceable
 * (spec 33 §5). */
export function generateCode() {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  const pick = () => alphabet[Math.floor(Math.random() * alphabet.length)];
  const block = () => pick() + pick() + pick() + pick();
  return `KDR-${block()}-${block()}`;
}

export function formatDate(iso) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
