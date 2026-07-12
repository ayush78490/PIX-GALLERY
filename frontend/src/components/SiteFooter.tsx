import Link from "next/link";
import Container from "@/components/Container";

const footerLinks = [
  { href: "/galleries", label: "Galleries" },
  { href: "/photographers", label: "Photographers" },
  { href: "/events", label: "Events" },
  { href: "/bookings", label: "Bookings" },
  { href: "/notifications", label: "Notifications" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#c4c7c7]/60 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-[var(--font-display)]">pixGallery</p>
            <p className="mt-2 text-sm text-[#444748]">
              Editorial galleries, client delivery, and bookings powered by
              Google Drive.
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-[#444748]">
            {footerLinks.map((link) => (
              <Link key={link.href} className="hover:text-black" href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[#c4c7c7]/60 pt-6 text-xs uppercase tracking-widest text-[#747878]">
          <span>Pixgallery Studio Suite</span>
          <span>May 2026</span>
        </div>
      </Container>
    </footer>
  );
}
