import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
  padded?: boolean;
};

export default function Section({
  children,
  className = "",
  padded = true,
}: SectionProps) {
  return (
    <section className={`${padded ? "py-16" : ""} ${className}`.trim()}>
      {children}
    </section>
  );
}
