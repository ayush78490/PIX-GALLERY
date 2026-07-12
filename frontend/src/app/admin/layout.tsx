import type { ReactNode } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import SideNav from "@/components/SideNav";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/users", label: "User management" },
  { href: "/admin/events", label: "Event oversight" },
  { href: "/admin/moderation", label: "Content moderation" },
  { href: "/admin/analytics", label: "Reports and analytics" },
  { href: "/admin/settings", label: "System settings" },
];

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <Section padded={false} className="min-h-[calc(100vh-72px)]">
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <SideNav title="Admin" links={adminLinks} footer="Pixgallery Ops" />
          <div>{children}</div>
        </div>
      </Container>
    </Section>
  );
}
