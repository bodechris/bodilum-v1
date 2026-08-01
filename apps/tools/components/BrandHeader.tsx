import Link from "next/link";

export function BrandHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-lockup" aria-label="Bodilum Tools home">
        <span className="brand-wordmark">BODILUM</span>
        <span className="brand-divider" aria-hidden="true" />
        <span className="brand-product">TOOLS</span>
      </Link>
      <a
        className="header-link"
        href="https://www.bodilum.com"
        target="_blank"
        rel="noreferrer"
      >
        Visit Bodilum
        <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
