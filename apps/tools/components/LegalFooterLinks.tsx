import Link from "next/link";
export function LegalFooterLinks() {
  return <nav className="legal-footer-links" aria-label="Legal"><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link><Link href="/acceptable-use">Acceptable use</Link></nav>;
}
