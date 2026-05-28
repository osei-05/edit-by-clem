"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#27272a]" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-['Archivo',sans-serif] text-xl font-bold tracking-widest uppercase text-[#fafafa] hover:text-[#C9A84C] transition-colors duration-300"
        >
          Edit_ByClem
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`nav-link text-sm tracking-wider uppercase transition-colors duration-200 ${
                  pathname === href
                    ? "text-[#C9A84C] active"
                    : "text-[#a1a1aa] hover:text-[#fafafa]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Book CTA */}
        <Link
          href="/contact"
          className="hidden md:inline-flex items-center gap-2 border border-[#C9A84C] text-[#C9A84C] px-5 py-2 text-xs tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0a0a0a] transition-all duration-300 cursor-pointer"
        >
          Book a Session
        </Link>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#fafafa] p-2 cursor-pointer"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-[#0a0a0a]/98 border-b border-[#27272a] overflow-hidden transition-all duration-300 ${
          open ? "max-h-64 py-4" : "max-h-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-6">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className={`block py-3 text-sm tracking-wider uppercase border-b border-[#1a1a1a] ${
                  pathname === href ? "text-[#C9A84C]" : "text-[#a1a1aa]"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li className="pt-3">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-block border border-[#C9A84C] text-[#C9A84C] px-5 py-2 text-xs tracking-widest uppercase"
            >
              Book a Session
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
