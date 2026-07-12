import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "outline" | "inverse" | "outlineLight";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-black text-white hover:bg-black/90",
  outline: "border border-black text-black hover:bg-black hover:text-white",
  inverse: "bg-white text-black hover:bg-white/90",
  outlineLight: "border border-white/60 text-white hover:bg-white hover:text-black",
};

const sizeClasses: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "px-5 py-2",
  md: "px-6 py-3",
  lg: "px-8 py-3",
};

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
}: ButtonProps) {
  const styles = [
    "inline-flex items-center justify-center rounded-full text-xs font-semibold uppercase tracking-widest transition",
    variantClasses[variant],
    sizeClasses[size],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link className={styles} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={styles} type={type}>
      {children}
    </button>
  );
}
