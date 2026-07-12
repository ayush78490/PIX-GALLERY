import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

const events = [
  { title: "The Metropolitan Gala", date: "14 Oct 2024", status: "Published" },
  { title: "Maison Editorial", date: "02 Nov 2024", status: "Draft" },
  { title: "Aurelius & Claire", date: "18 Nov 2024", status: "Review" },
  { title: "Blue Note Sessions", date: "05 Dec 2024", status: "Published" },
];

export default function EventsPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Projects"
            title="Events"
            description="Create, manage, and share editorial event galleries."
            actions={<Button variant="outline" href="/events/new">New event</Button>}
          />
          <div className="grid gap-6 md:grid-cols-2">
            {events.map((event) => (
              <InfoCard key={event.title} title={event.title} meta={event.status}>
                <div className="flex items-center justify-between">
                  <span>{event.date}</span>
                  <Link
                    className="text-xs uppercase tracking-widest text-[#715b3b]"
                    href={`/events/${encodeURIComponent(event.title)}`}
                  >
                    View
                  </Link>
                </div>
              </InfoCard>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
