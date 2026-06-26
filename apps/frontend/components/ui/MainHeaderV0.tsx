"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styled from "styled-components";

import { useGlobalAppStates } from "@bod/utils/contexts/GlobalAppVarProvider";

type NavItem = {
  label: string;
  href: string;
};

type DropdownKey = "products" | "services";

const PRODUCTS: NavItem[] = [
  { label: "Design Direction", href: "/design-direction" },
  { label: "Growth Systems", href: "/growth-systems" },
  { label: "Web Xperiences", href: "/web-experiences" },
];

const SERVICES: NavItem[] = [
  { label: "Design", href: "/services/design" },
  { label: "Web Development", href: "/services/web-development" },
  { label: "AI Integrations", href: "/services/ai-integrations" },
];

const DROPDOWNS: Record<DropdownKey, NavItem[]> = {
  products: PRODUCTS,
  services: SERVICES,
};

const DROPDOWN_LABELS: Record<DropdownKey, string> = {
  products: "Products",
  services: "Services",
};

export default function MainHeaderV0() {
  const pathname = usePathname();
  const { isSignedIn } = useGlobalAppStates();

  const headerRef = useRef<HTMLElement | null>(null);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdown, setDesktopDropdown] = useState<DropdownKey | null>(null);
  const [mobileDropdown, setMobileDropdown] = useState<DropdownKey | null>(null);

  const closeMenus = useCallback(() => {
    setIsMobileMenuOpen(false);
    setDesktopDropdown(null);
    setMobileDropdown(null);
  }, []);

  useEffect(() => {
    closeMenus();
  }, [pathname, closeMenus]);

  useEffect(() => {
  const handleWindowClick = (event: MouseEvent) => {
    const header = headerRef.current;

    if (!header || !(event.target instanceof Node)) return;

    const clickedInsideHeader = header.contains(event.target);

    if (!clickedInsideHeader) {
      closeMenus();
    }
  };

  window.addEventListener("click", handleWindowClick);

  return () => {
    window.removeEventListener("click", handleWindowClick);
  };
}, [closeMenus]);

  const toggleDesktopDropdown = (key: DropdownKey) => {
    setDesktopDropdown((current) => (current === key ? null : key));
  };

  const toggleMobileDropdown = (key: DropdownKey) => {
    setMobileDropdown((current) => (current === key ? null : key));
  };

  return (
    <HeaderWrapper ref={headerRef}>
      <div className="header-inner">
        <Link href="/" className="brand-link" aria-label="Bodilum home" onClick={closeMenus}>
          <span className="logo-full" aria-hidden="true">
            <LogoFull />
          </span>
          <span className="logo-mark" aria-hidden="true">
            <LogoMark />
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          <ul>
            <li>
              <Link href="/" onClick={closeMenus}>
                Home
              </Link>
            </li>

            <DesktopDropdown
              dropdownKey="products"
              openDropdown={desktopDropdown}
              onToggle={toggleDesktopDropdown}
              onLinkClick={closeMenus}
            />

            <DesktopDropdown
              dropdownKey="services"
              openDropdown={desktopDropdown}
              onToggle={toggleDesktopDropdown}
              onLinkClick={closeMenus}
            />

            <li>
              <Link href="/agency-partner" onClick={closeMenus}>
                Agency Partner
              </Link>
            </li>

            

            <li>
              <Link href="/contact" onClick={closeMenus}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        <div className="desktop-actions">
          {isSignedIn && (
            <Link href="/profile" onClick={closeMenus}>
              Profile
            </Link>
          )}
        </div>

        <button
          type="button"
          className="mobile-toggle"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMobileMenuOpen((open) => !open)}
        >
          <MenuIcon />
        </button>

        {isMobileMenuOpen && (
          <nav id="mobile-menu" className="mobile-menu menu-surface" aria-label="Mobile navigation">
            <ul className="menu-list">
              <li>
                <Link href="/" onClick={closeMenus}>
                  Home
                </Link>
              </li>

              <MobileDropdown
                dropdownKey="products"
                openDropdown={mobileDropdown}
                onToggle={toggleMobileDropdown}
                onLinkClick={closeMenus}
              />

              <MobileDropdown
                dropdownKey="services"
                openDropdown={mobileDropdown}
                onToggle={toggleMobileDropdown}
                onLinkClick={closeMenus}
              />

              <li>
                <Link href="/agency-partner" onClick={closeMenus}>
                  Agency Partner
                </Link>
              </li>              

              <li>
                <Link href="/contact" onClick={closeMenus}>
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </HeaderWrapper>
  );
}

type DropdownProps = {
  dropdownKey: DropdownKey;
  openDropdown: DropdownKey | null;
  onToggle: (key: DropdownKey) => void;
  onLinkClick: () => void;
};

function DesktopDropdown({ dropdownKey, openDropdown, onToggle, onLinkClick }: DropdownProps) {
  const isOpen = openDropdown === dropdownKey;
  const label = DROPDOWN_LABELS[dropdownKey];
  const menuId = `desktop-${dropdownKey}-menu`;

  return (
    <li className="has-dropdown">
      <button
        type="button"
        className="nav-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => onToggle(dropdownKey)}
      >
        <span>{label}</span>
        <ChevronIcon />
      </button>

      {isOpen && (
        <DropdownMenu
          id={menuId}
          className="desktop-dropdown"
          items={DROPDOWNS[dropdownKey]}
          onLinkClick={onLinkClick}
        />
      )}
    </li>
  );
}

function MobileDropdown({ dropdownKey, openDropdown, onToggle, onLinkClick }: DropdownProps) {
  const isOpen = openDropdown === dropdownKey;
  const label = DROPDOWN_LABELS[dropdownKey];
  const menuId = `mobile-${dropdownKey}-menu`;

  return (
    <li>
      <button
        type="button"
        className="nav-button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => onToggle(dropdownKey)}
      >
        <span>{label}</span>
        <ChevronIcon />
      </button>

      {isOpen && (
        <DropdownMenu
          id={menuId}
          className="mobile-submenu"
          items={DROPDOWNS[dropdownKey]}
          onLinkClick={onLinkClick}
        />
      )}
    </li>
  );
}

type DropdownMenuProps = {
  id: string;
  items: NavItem[];
  className?: string;
  onLinkClick: () => void;
};

function DropdownMenu({ id, items, className, onLinkClick }: DropdownMenuProps) {
  return (
    <div id={id} className={`menu-surface ${className ?? ""}`}>
      <ul className="menu-list">
        {items.map((item) => (
          <li key={item.href}>
            <Link href={item.href} onClick={onLinkClick}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 279.97 173.75" aria-hidden="true">
      <rect width="279.97" height="71.26" />
      <rect y="102.49" width="279.97" height="71.26" />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg className="chevron" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
      />
    </svg>
  );
}

function LogoMark() {
  return (
    <svg viewBox="0 0 55 55" fill="none" aria-hidden="true">
      <path
        fill="#222"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5 0C42.688 0 55 12.312 55 27.5S42.688 55 27.5 55 0 42.688 0 27.5 12.312 0 27.5 0Zm.985 9.153c10.126.48 17.946 9.077 17.467 19.203-.48 10.126-9.077 17.946-19.203 17.466-8.503-.402-15.38-6.53-17.081-14.48-.674-2.76-.989-6.131-.818-9.75.433-9.137 3.799-16.4 7.517-16.225 1.853.088 3.444 2.006 4.52 5.04a18.292 18.292 0 0 1 7.598-1.254Zm-.561 11.863a6.48 6.48 0 1 1-.613 12.944 6.48 6.48 0 0 1 .613-12.944Z"
      />
    </svg>
  );
}

function LogoFull() {
  return (
    <svg viewBox="0 0 1302.35 226.78" fill="none" aria-hidden="true">
      <path d="M115.13,86.65c14.74.7,26.12,13.21,25.42,27.95-.7,14.74-13.21,26.12-27.95,25.42-14.74-.7-26.12-13.21-25.42-27.95.7-14.74,13.21-26.12,27.95-25.42M117.45,37.74c41.75,1.98,73.99,37.42,72.02,79.18-1.98,41.75-37.42,73.99-79.18,72.02-35.06-1.66-63.41-26.92-70.43-59.7-2.77-11.39-4.07-25.29-3.37-40.21,1.78-37.67,15.66-67.62,31-66.9,7.64.36,14.2,8.27,18.64,20.77,9.67-3.81,20.27-5.69,31.33-5.16M113.39,0c62.62,0,113.39,50.77,113.39,113.39s-50.77,113.39-113.39,113.39S0,176.01,0,113.39,50.77,0,113.39,0" />
      <g stroke="#222" strokeWidth={10}>
        <path d="M1278.98,79c-21.58-15.74-49.88-13.45-69.46,5.01-17.29-16.46-41.53-19.94-62.19-9.38-19.12,9.78-30.36,29.08-30.57,50.66l.17,66.33c.02,8.14,7.87,14.03,14.96,13.87,6.37-.14,14.35-5.58,14.41-13.45l.59-70.12c.12-14.02,12.75-24.9,26.41-23.74,11.94,1.01,21.26,11.31,21.34,23.51l.47,70.78c.05,7.75,8.39,13.19,14.63,13.11,6.65-.08,14.37-5.67,14.44-13.55l.63-71.88c.11-12.05,10.38-21.26,21.51-21.97,13.39-.85,25.78,9.76,25.92,23.54l.71,71.14c.08,7.62,8.61,12.8,14.76,12.7,6.48-.11,14.34-5.77,14.37-13.56l.27-67.89c-.76-18.21-8.82-34.5-23.37-45.11Z" />
        <path d="M749.77,20.48c-7.1-.29-15.06,5.34-15.14,13.6l-.4,43.66c-25.32-18.48-57.5-19.44-82.98-2.22-19.59,13.24-32.15,34.24-32.21,59.09-.06,27.84,16.24,51.53,38.46,63.15,24.63,12.88,53.98,10.92,75.81-5.22,18.38-13.58,30.53-34.31,30.57-57.33l.17-100.12c.01-8.44-6.75-14.32-14.28-14.63ZM691.17,176.83c-23.24,0-42.08-18.84-42.08-42.08s18.84-42.08,42.08-42.08,42.08,18.84,42.08,42.08-18.84,42.08-42.08,42.08Z" />
        <path d="M415.6,79.33c-25-20.21-60.48-22.05-88.24-1.51l-.24-43.76c-.04-8.26-7.93-13.89-15.02-13.66-7.59.25-14.53,6.22-14.52,14.7l.08,98.86c.02,22.81,10.88,43.24,28.8,57.17,21.35,16.59,49.95,19.97,75.43,7.83,21.6-10.29,38.37-32.65,40.35-59.46,1.8-24.34-9.49-46.29-26.65-60.17ZM370.31,176.88c-23.28,0-42.14-18.87-42.14-42.14s18.87-42.14,42.14-42.14,42.14,18.87,42.14,42.14-18.87,42.14-42.14,42.14Z" />
        <path d="M530.3,63.32c-39.48,0-71.48,32-71.48,71.48s32,71.48,71.48,71.48,71.48-32,71.48-71.48-32-71.48-71.48-71.48ZM530.22,176.79c-23.21,0-42.03-18.82-42.03-42.03s18.82-42.03,42.03-42.03,42.03,18.82,42.03,42.03-18.82,42.03-42.03,42.03Z" />
        <path d="M1069.04,68.42c-8.04.19-14.28,6.37-14.48,15.5-.39,18.57.74,35.91-.58,53.59-1.74,23.37-22.32,40.01-44.51,39.26-21.72-.73-41.12-18.66-41.25-41.47l-.29-52.02c-.05-8.81-7.25-15.29-15.3-14.82-7.48.44-14.13,6.51-14.09,14.91l.28,54.32c.2,39.16,34.99,68.9,73.04,68.49,37.92-.41,69.75-29.66,71.97-68.78,1.03-18.08.24-35.82.31-54.12.04-8.8-7.55-15.05-15.11-14.87Z" />
        <path d="M886.06,20.49c-8.38.69-13.83,7.03-13.83,15.93l.05,154.36c0,8.73,7.64,14.59,14.89,14.57,7.54-.02,14.78-5.7,14.78-15.16V34.68c.01-8.97-8.59-14.8-15.89-14.19Z" />
        <path d="M818.07,77.44c-7.97.59-13.99,6.65-13.98,15.3l.09,98.08c0,8.43,7.34,14.38,14.85,14.52,6.65.12,14.89-5.35,14.89-14.22v-99.22c.01-9.13-8.16-15.03-15.85-14.46Z" />
        <path d="M819.12,26.42c-8.43,0-15.27,6.83-15.27,15.27s6.83,15.27,15.27,15.27,15.27-6.83,15.27-15.27-6.83-15.27-15.27-15.27Z" />
      </g>
    </svg>
  );
}

const HeaderWrapper = styled.header`
  --header-max-width: 95%;
  --surface-bg: rgba(255, 255, 255, 0.92);
  --surface-border-radius: 1rem;
  --shadow-soft: 0 20px 30px rgba(0, 0, 0, 0.05);
  --shadow-menu: 0 24px 60px rgba(0, 0, 0, 0.16);
  --transition-smooth: 700ms cubic-bezier(0.16, 1, 0.3, 1);

  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  pointer-events: none;

  a,
  button {
    pointer-events: auto;
  }

  a {
    color: #111;
    text-decoration: none;
    transition: color 160ms ease, transform 160ms ease;

    &:hover {
      color: #555;
    }
  }

  button {
    appearance: none;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;
  }

  .header-inner {
    position: relative;
    width: var(--header-max-width);
    height: 100%;
  }

  .brand-link {
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 20;
    display: block;
    width: 60px;
    transform-style: preserve-3d;

    &::before {
      content: "";
      position: absolute;
      top: -150px;
      left: 0;
      width: 60px;
      height: 100px;
      background: transparent;
      box-shadow: 0 120px 60px 2px rgba(255, 255, 255, 1);
      transform: translateZ(-1px);
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      fill: #222;
      fill-rule: evenodd;
    }
  }

  .logo-full {
    display: none;
  }

  .logo-mark {
    display: block;
  }

  .desktop-nav,
  .desktop-actions {
    display: none;
  }

  .mobile-toggle {
    position: absolute;
    top: 30px;
    right: 0;
    z-index: 20;
    width: 50px;
    height: 32px;
    transform-style: preserve-3d;

    &::before {
      content: "";
      position: absolute;
      top: -100px;
      right: 0;
      width: 50px;
      height: 50px;
      background: transparent;
      box-shadow: 0 80px 30px 2px rgba(255, 255, 255, 1);
      transform: translateZ(-1px);
    }

    svg {
      display: block;
      width: 100%;
      height: auto;
      padding: 8px;
      fill: #111;
    }
  }

  .mobile-menu {
    position: absolute;
    top: 76px;
    right: 0;
    z-index: 30;
    width: min(20rem, calc(100vw - 2rem));
    padding: 1rem 1.1rem 1.2rem;
  }

  .menu-surface {
    background: var(--surface-bg);
    border-radius: 1.25rem;
    box-shadow: var(--shadow-menu);
    backdrop-filter: blur(25px);
  }

  .menu-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      border-bottom: 1px solid #f4f4f4;
      padding-bottom: 0.65rem;

      &:last-child {
        border-bottom: 0;
        padding-bottom: 0;
      }
    }

    a {
      display: block;
      font-weight: 650;

      &:hover {
        transform: translateX(2px);
      }
    }
  }

  .nav-button {
    display: inline-flex;
    align-items: center;
    gap: 0.2rem;
    font-weight: 700;

    &:focus-visible {
      border-radius: 0.25rem;
      outline: 2px solid #222;
      outline-offset: 0.35rem;
    }
  }

  .chevron {
    width: 24px;
    height: 24px;
    fill: currentColor;
  }

  .mobile-submenu {
    margin-top: 0.75rem;
    margin-left: 1rem;
    padding: 0.75rem 0 0 1rem;
    border-top: 1px solid #f4f4f4;
    background: transparent;
    box-shadow: none;    

    .menu-list {
      gap: 0.6rem;
    }

    li {
      border-bottom: 0;
      padding-bottom: 0;
    }

    a {
      color: #888;
      font-weight: 700;

      &:hover {
        color: #333;
      }
    }
  }

  @media (min-width: 768px) {
    height: 100px;

    .brand-link {
      top: 20px;
      width: min(200px, 30vw);

      &::before {
        top: -120px;
        width: 230px;
      }
    }

    .logo-mark {
      display: none;
    }

    .logo-full {
      display: block;
    }

    .mobile-toggle,
    .mobile-menu {
      display: none;
    }

    .desktop-nav {
      position: absolute;
      top: 20px;
      left: 50%;
      z-index: 10;
      display: flex;
      justify-content: center;
      transform: translateX(-50%);

      > ul {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin: 0;
        padding: 1rem 2rem;
        list-style: none;
        border-radius: var(--surface-border-radius);
        background: rgba(255, 255, 255, 0.6);
        box-shadow: var(--shadow-soft);
        backdrop-filter: blur(20px);
        transition: all var(--transition-smooth);
      }

      li {
        position: relative;
        line-height: 1;
      }

      a,
      .nav-button {
        font-weight: 700;
        line-height: 1;
        white-space: nowrap;
      }
    }

    .desktop-dropdown {
      position: absolute;
      top: calc(100% + 1rem);
      left: 50%;
      z-index: 30;
      min-width: 18rem;
      padding: 1rem 1.1rem 1.2rem;
      transform: translateX(-50%);

      backdrop-filter: blur(30px);
      -webkit-backdrop-filter: blur(30px); 

      .menu-list {
        gap: 0.75rem;
      }
    }

    .desktop-actions {
      position: absolute;
      top: 20px;
      right: 0;
      z-index: 20;
      display: flex;
      align-items: center;

      a {
        font-weight: 700;
      }
    }
  }
`;
