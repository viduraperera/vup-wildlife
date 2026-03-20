"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "/gallery", label: "Gallery" },
  { href: "/stories", label: "Stories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="navbar-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "200px 1fr 200px",
          alignItems: "center",
          padding: "0 24px",
          height: "56px",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-background)",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Left — Brand */}
        {/* Left — Brand */}
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          {/* Icon — always visible */}
          <Image
            src="/page-icon.png"
            alt="VUP Wildlife"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />

          {/* Text — hidden on mobile */}
          <span
            className="brand-text"
            style={{
              fontFamily: '"Literata", Georgia, serif',
              fontWeight: 700,
              fontSize: "1.1rem",
              color: "var(--color-primary)",
            }}
          >
            VUP Wildlife
          </span>
        </Link>

        {/* Center — Desktop nav links (hidden on mobile) */}
        <ul
          className="desktop-nav"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "28px",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily: '"Nunito Sans", sans-serif',
                    fontSize: "0.9rem",
                    fontWeight: active ? 600 : 400,
                    color: active
                      ? "var(--color-primary)"
                      : "var(--color-muted)",
                    textDecoration: "none",
                    position: "relative",
                    paddingBottom: "2px",
                  }}
                >
                  {label}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: "-20px",
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "var(--color-primary)",
                        borderRadius: "1px",
                      }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — Search + mobile hamburger */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "8px",
          }}
        >
          {/* Search input */}
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              onBlur={() => setSearchOpen(false)}
              style={{
                width: "160px",
                height: "32px",
                fontSize: "0.85rem",
                padding: "0 12px",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                background: "#fff9f3",
                color: "var(--color-text)",
                outline: "none",
              }}
            />
          )}

          {/* Search button */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              display: "flex",
              alignItems: "center",
              color: "var(--color-muted)",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            <FiSearch size={18} />
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{
              background: "none",
              border: "none",
              padding: "6px",
              display: "none", // shown via CSS below
              alignItems: "center",
              color: "var(--color-muted)",
              cursor: "pointer",
              borderRadius: "6px",
            }}
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "fixed",
            top: "56px",
            left: 0,
            right: 0,
            background: "var(--color-background)",
            borderBottom: "1px solid var(--color-border)",
            zIndex: 99,
            padding: "12px 0",
          }}
        >
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  display: "block",
                  padding: "12px 24px",
                  fontFamily: '"Nunito Sans", sans-serif',
                  fontSize: "1rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--color-primary)" : "var(--color-text)",
                  textDecoration: "none",
                  borderLeft: active
                    ? "3px solid var(--color-primary)"
                    : "3px solid transparent",
                }}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 640px) {
            .desktop-nav { display: none !important; }
            .mobile-menu-btn { display: flex !important; }
            .navbar-grid { grid-template-columns: auto 1fr auto !important; }
            .brand-text { display: none; }
        }
            `}</style>
    </>
  );
}
