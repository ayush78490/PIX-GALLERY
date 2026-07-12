import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Insights"
        title="Reports and analytics"
        description="Track engagement, downloads, and booking performance."
        actions={<Button variant="outline">Export report</Button>}
      />
      <section className="grid gap-6 md:grid-cols-3">
        <StatCard label="Monthly views" value="128k" />
        <StatCard label="Downloads" value="18.2k" />
        <StatCard label="Bookings" value="324" accent="positive" />
      </section>
      <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl">Engagement trend</h2>
            <span className="text-xs uppercase tracking-widest text-[#747878]">
              Last 90 days
            </span>
          </div>
          <div className="mt-8 grid grid-cols-12 gap-2">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                key={index}
                className="rounded-sm bg-[#e8e8e6]"
                style={{ height: `${30 + index * 4}%` }}
              ></div>
            ))}
          </div>
        </article>
        <article className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-8">
          <h2 className="text-xl">Top categories</h2>
          <ul className="mt-6 space-y-3 text-sm text-[#444748]">
            <li>Luxury events · 42%</li>
            <li>Editorial portraits · 31%</li>
            <li>Commercial campaigns · 19%</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
