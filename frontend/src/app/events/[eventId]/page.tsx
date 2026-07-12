import Button from "@/components/Button";
import Container from "@/components/Container";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import StatCard from "@/components/StatCard";

type EventPageProps = {
  params: { eventId: string };
};

export default function EventPage({ params }: EventPageProps) {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Event detail"
            title={`Event ${params.eventId}`}
            description="Configure details, access, and gallery settings for this event."
            actions={
              <Button
                variant="outline"
                href={`/events/${params.eventId}/gallery`}
              >
                View gallery
              </Button>
            }
          />
          <section className="grid gap-6 lg:grid-cols-3">
            <StatCard label="Guests" value="245" />
            <StatCard label="Downloads" value="1.4k" accent="positive" />
            <StatCard label="Drive sync" value="Active" accent="neutral" />
          </section>
          <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <InfoCard title="Event details" meta="Published">
                <p>October 14, 2024 · The Met, NYC</p>
                <p className="mt-2">Lead photographer: Sienna Aris</p>
              </InfoCard>
              <InfoCard title="Access control" meta="Unlisted">
                <p>Shareable link with watermark previews enabled.</p>
              </InfoCard>
              <InfoCard title="Client delivery" meta="Live">
                <p>Send curated selects and enable download packages.</p>
              </InfoCard>
            </div>
            <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
              <h2 className="text-lg">Drive sync status</h2>
              <p className="mt-2 text-sm text-[#444748]">
                Last sync: 12 minutes ago · 482 assets mirrored
              </p>
              <div className="mt-6 space-y-3 text-sm text-[#444748]">
                <div className="flex items-center justify-between">
                  <span>Folder</span>
                  <span className="text-[#715b3b]">Drive / Events / Met Gala</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Webhook</span>
                  <span>Enabled</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Approvals</span>
                  <span>42 pending</span>
                </div>
              </div>
              <Button className="mt-8 w-full" variant="outline">
                Trigger sync
              </Button>
            </aside>
          </section>
        </Container>
      </Section>
    </main>
  );
}
