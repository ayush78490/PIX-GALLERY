import type { ReactNode } from "react";

type InfoCardProps = {
  title: string;
  meta?: string;
  children?: ReactNode;
};

export default function InfoCard({ title, meta, children }: InfoCardProps) {
  return (
    <article className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg">{title}</h3>
        {meta ? (
          <span className="text-xs uppercase tracking-widest text-[#747878]">
            {meta}
          </span>
        ) : null}
      </div>
      {children ? <div className="mt-4 text-sm text-[#444748]">{children}</div> : null}
    </article>
  );
}
