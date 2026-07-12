import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  align?: "left" | "center";
};

export default function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  align = "left",
}: PageHeaderProps) {
  const isCentered = align === "center";

  return (
    <header
      className={`mb-12 ${isCentered ? "text-center" : "text-left"}`}
    >
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
          {eyebrow}
        </p>
      ) : null}
      <div
        className={`mt-2 flex flex-col gap-4 ${
          isCentered ? "items-center" : "items-start"
        } md:flex-row md:items-end md:justify-between`}
      >
        <div>
          <h1 className="text-4xl">{title}</h1>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm text-[#444748]">
              {description}
            </p>
          ) : null}
        </div>
        {actions ? <div className="mt-4 md:mt-0">{actions}</div> : null}
      </div>
    </header>
  );
}
