"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { FiSearch, FiMenu, FiX } from "react-icons/fi";
import gsap from "gsap";

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

  const brandRef = useRef<HTMLAnchorElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // Step 1 — brand + actions drop in together
    tl.fromTo(
      [brandRef.current, actionsRef.current],
      { y: -24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.08,
      },
    )
      // Step 2 — nav links stagger in after brand settles
      .fromTo(
        linksRef.current?.querySelectorAll("li") ?? [],
        { y: -16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          stagger: 0.07,
        },
        "-=0.15", // slight overlap with previous step
      );
  }, []);

  return (
    <>
      <nav className="navbar">
        {/* Left — Brand */}
        <Link href="/" className="navbar-brand" ref={brandRef}>
          <Image
            src="/page-icon.png"
            alt="VUP Wildlife"
            width={40}
            height={40}
            style={{ objectFit: "contain" }}
            priority
          />
          <span className="brand-text">VUP Wildlife</span>
        </Link>

        {/* Center — Desktop nav links */}
        <ul className="desktop-nav" ref={linksRef}>
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`navbar-link ${active ? "active" : ""}`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right — Search + hamburger */}
        <div className="navbar-actions" ref={actionsRef}>
          {searchOpen && (
            <input
              autoFocus
              type="text"
              placeholder="Search..."
              onBlur={() => setSearchOpen(false)}
              className="navbar-search-input"
            />
          )}

          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            className="navbar-search-btn"
          >
            <FiSearch size={18} />
          </button>

          <button
            className="mobile-menu-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="mobile-menu">
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`mobile-menu-link ${active ? "active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
