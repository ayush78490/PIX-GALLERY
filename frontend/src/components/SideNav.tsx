import Link from "next/link";
import type { ReactNode } from "react";

type SideNavLink = {
  href: string;
  label: string;
};

type SideNavProps = {
  title?: string;
  links: SideNavLink[];
  footer?: ReactNode;
};

export default function SideNav({ title, links, footer }: SideNavProps) {
  return (
    <aside className="sticky top-24 rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
      {title ? <h2 className="text-lg">{title}</h2> : null}
      <nav className="mt-4 space-y-2 text-sm text-[#444748]">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block rounded-full px-4 py-2 hover:bg-[#f0f0ee]"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      {footer ? <div className="mt-6 border-t border-[#c4c7c7]/60 pt-4 text-xs text-[#747878]">{footer}</div> : null}
    </aside>
  );
}
