"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Container from "@/components/Container";
import { getSession, signOut, type AuthSession } from "@/lib/auth-client";

const navLinks = [
  { href: "/galleries", label: "Galleries" },
  { href: "/photographers", label: "Photographers" },
  { href: "/events", label: "Events" },
];

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  async function refreshSession() {
    try {
      const currentSession = await getSession();
      setSession(currentSession);
    } catch {
      setSession(null);
    }
  }

  useEffect(() => {
    void refreshSession();

    const handleAuthChange = () => {
      void refreshSession();
    };

    window.addEventListener("pixgallery-auth-changed", handleAuthChange);
    window.addEventListener("storage", handleAuthChange);

    return () => {
      window.removeEventListener("pixgallery-auth-changed", handleAuthChange);
      window.removeEventListener("storage", handleAuthChange);
    };
  }, []);

  const links = useMemo(() => {
    if (session?.user) {
      return [...navLinks, { href: "/profile", label: "Profile" }];
    }

    return [...navLinks, { href: "/auth/login", label: "Sign in" }];
  }, [session]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
    } finally {
      setSigningOut(false);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#c4c7c7]/60 bg-[#f9f9f7]/90 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="font-[var(--font-display)] text-xl tracking-tight"
          >
            pixGallery
          </Link>
          <nav className="hidden items-center gap-3 text-sm text-[#444748] md:flex">
            {links.map((link) => (
              <Link key={link.href} className="rounded-full px-3 py-2 transition hover:bg-[#f0f0ee] hover:text-black" href={link.href}>
                {link.label}
              </Link>
            ))}
            {session?.user ? (
              <button
                className="rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                type="button"
                onClick={() => void handleSignOut()}
                disabled={signingOut}
              >
                {signingOut ? "Signing out..." : "Log out"}
              </button>
            ) : null}
          </nav>
          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#c4c7c7] text-xs uppercase tracking-widest text-[#444748] md:hidden"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
        {isOpen ? (
          <nav className="mt-4 space-y-2 border-t border-[#c4c7c7]/60 pt-4 text-sm text-[#444748] md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                className="block rounded-full px-3 py-2 hover:bg-[#f0f0ee]"
                href={link.href}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {session?.user ? (
              <button
                className="block w-full rounded-full border border-black px-3 py-2 text-left text-xs font-semibold uppercase tracking-widest text-black transition hover:bg-black hover:text-white disabled:opacity-60"
                type="button"
                onClick={() => void handleSignOut()}
                disabled={signingOut}
              >
                {signingOut ? "Signing out..." : "Log out"}
              </button>
            ) : null}
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
