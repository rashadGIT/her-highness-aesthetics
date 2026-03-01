"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navBg = isHome && !scrolled && !open
    ? "bg-transparent"
    : "bg-primary shadow-lg";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex flex-col leading-none group"
            >
              <span className="font-serif text-lg md:text-xl font-semibold text-white tracking-wide">
                Her Highness
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-accent">
                Aesthetics
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-sans text-sm font-medium transition-colors duration-200 hover:text-accent ${
                    pathname === link.href ? "text-accent" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book"
                className="ml-4 px-5 py-2.5 bg-accent text-white font-sans font-semibold text-sm rounded-btn transition-all duration-200 hover:bg-accent/90 hover:shadow-glow-gold"
              >
                Book Now
              </Link>
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  open ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                  open ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-primary" />
        <div className="relative h-full flex flex-col pt-20 pb-8 px-8">
          <nav className="flex flex-col gap-1 mt-8">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                style={{ animationDelay: `${i * 60}ms` }}
                className={`font-serif text-3xl font-light text-white py-3 border-b border-white/10 transition-colors duration-200 hover:text-accent ${
                  open ? "animate-fade-up" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto">
            <Link
              href="/book"
              className="block w-full text-center py-4 bg-accent text-white font-sans font-semibold text-base rounded-btn"
            >
              Book Now
            </Link>
            <div className="mt-6 flex items-center gap-4 justify-center">
              <a
                href="https://www.instagram.com/herhighness__aesthetics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors text-sm font-sans"
              >
                Instagram
              </a>
              <span className="text-white/30">·</span>
              <a
                href="https://www.tiktok.com/@herhighness.aesth"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent transition-colors text-sm font-sans"
              >
                TikTok
              </a>
              <span className="text-white/30">·</span>
              <a
                href="tel:+13469014161"
                className="text-white/60 hover:text-accent transition-colors text-sm font-sans"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
