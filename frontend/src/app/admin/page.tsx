import Button from "@/components/Button";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

const adminLinks = [
  { href: "/admin/users", label: "User management" },
  { href: "/admin/events", label: "Event oversight" },
  { href: "/admin/moderation", label: "Content moderation" },
  { href: "/admin/analytics", label: "Reports and analytics" },
  { href: "/admin/settings", label: "System settings" },
];

export default function AdminPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Operations"
        title="Admin panel"
        description="Manage verification, content, and operational insights."
        actions={<Button variant="outline" href="/admin/users">Review users</Button>}
      />
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="Pending verifications" value="12" />
        <StatCard label="Flagged galleries" value="04" accent="warning" />
        <StatCard label="Active events" value="128" />
      </section>
      <section className="grid gap-4 sm:grid-cols-2">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-2xl border border-[#c4c7c7]/60 bg-white px-5 py-4 text-sm"
          >
            {link.label}
          </Link>
        ))}
      </section>
    </div>
  );
}
