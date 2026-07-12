type StatCardProps = {
  label: string;
  value: string;
  accent?: "neutral" | "positive" | "warning";
};

const accentStyles: Record<NonNullable<StatCardProps["accent"]>, string> = {
  neutral: "text-[#1a1c1b]",
  positive: "text-green-700",
  warning: "text-[#b74d2b]",
};

export default function StatCard({
  label,
  value,
  accent = "neutral",
}: StatCardProps) {
  return (
    <article className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
      <p className="text-xs uppercase tracking-widest text-[#747878]">
        {label}
      </p>
      <p className={`mt-3 text-3xl ${accentStyles[accent]}`}>{value}</p>
    </article>
  );
}
