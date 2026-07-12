import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

const notifications = [
  {
    title: "New booking request",
    time: "2h ago",
    detail: "Aurelius & Claire requested an editorial session.",
  },
  {
    title: "Drive sync complete",
    time: "6h ago",
    detail: "Metropolitan Gala gallery synced 482 assets.",
  },
  {
    title: "Gallery approved",
    time: "Yesterday",
    detail: "Fashion Week AW24 gallery cleared for public release.",
  },
];

export default function NotificationsPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Updates"
            title="Notifications"
            description="Booking alerts, event updates, and system notices."
          />
          <div className="space-y-4">
            {notifications.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg">{item.title}</h2>
                  <span className="text-xs uppercase tracking-widest text-[#747878]">
                    {item.time}
                  </span>
                </div>
                <p className="mt-2 text-sm text-[#444748]">{item.detail}</p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
