import Button from "@/components/Button";
import Container from "@/components/Container";
import Section from "@/components/Section";
import SideNav from "@/components/SideNav";

const dashboardLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/events", label: "Events" },
  { href: "/bookings", label: "Bookings" },
  { href: "/galleries", label: "Galleries" },
  { href: "/profile", label: "Profile" },
];

export default function DashboardPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
            <SideNav title="Studio" links={dashboardLinks} footer="Studio suite" />
            <div>
              <header className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
                    Overview
                  </p>
                  <h1 className="mt-2 text-4xl">Good morning, Julian</h1>
                </div>
                <Button variant="outline" href="/events/new">
                  Create event
                </Button>
              </header>
              <section className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <article className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl">Earnings overview</h2>
                    <span className="text-xs uppercase tracking-widest text-[#747878]">
                      Last 30 days
                    </span>
                  </div>
                  <div className="mt-6 flex items-center gap-6">
                    <span className="text-3xl">$12,450</span>
                    <span className="text-xs uppercase tracking-widest text-green-600">
                      +14.2%
                    </span>
                  </div>
                  <div className="mt-8 grid grid-cols-10 gap-2">
                    {Array.from({ length: 10 }).map((_, index) => (
                      <div
                        key={index}
                        className="h-24 rounded-sm bg-[#e8e8e6]"
                        style={{ height: `${40 + index * 4}%` }}
                      ></div>
                    ))}
                  </div>
                </article>
                <div className="grid gap-6">
                  {[
                    { label: "Pending bookings", value: "08" },
                    { label: "Gallery views", value: "2.4k" },
                    { label: "Active projects", value: "12" },
                  ].map((card) => (
                    <article
                      key={card.label}
                      className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6"
                    >
                      <p className="text-xs uppercase tracking-widest text-[#747878]">
                        {card.label}
                      </p>
                      <p className="mt-3 text-3xl">{card.value}</p>
                    </article>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
