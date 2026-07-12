import Container from "@/components/Container";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export default function OnboardingPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Studio setup"
            title="Onboarding"
            description="Verify your profile, connect Google Drive, and publish your first event."
          />
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              {[
                {
                  title: "Profile verification",
                  meta: "Step 01",
                  body: "Submit your portfolio, identity, and service offerings for approval.",
                },
                {
                  title: "Connect Google Drive",
                  meta: "Step 02",
                  body: "Authorize access so Pixgallery can sync your curated folders.",
                },
                {
                  title: "Publish first event",
                  meta: "Step 03",
                  body: "Create an event, select visibility, and share a private preview.",
                },
              ].map((step) => (
                <InfoCard key={step.title} title={step.title} meta={step.meta}>
                  {step.body}
                </InfoCard>
              ))}
            </div>
            <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
              <h2 className="text-lg">Next actions</h2>
              <p className="mt-2 text-sm text-[#444748]">
                Complete each step to unlock publishing and client delivery.
              </p>
              <div className="mt-6 space-y-4">
                {["Upload portfolio", "Connect Drive", "Create event"].map(
                  (task) => (
                    <div
                      key={task}
                      className="flex items-center justify-between rounded-xl border border-[#c4c7c7]/60 px-4 py-3"
                    >
                      <span className="text-sm">{task}</span>
                      <button className="text-xs uppercase tracking-widest text-[#715b3b]">
                        Start
                      </button>
                    </div>
                  )
                )}
              </div>
            </aside>
          </section>
        </Container>
      </Section>
    </main>
  );
}
