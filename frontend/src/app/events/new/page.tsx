import Button from "@/components/Button";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

export default function NewEventPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="New project"
            title="Create event"
            description="Add event details, choose visibility, and sync a Drive folder."
          />
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <form className="space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">
                  Event title
                </label>
                <input
                  className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                  placeholder="Metropolitan Gala 2024"
                />
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Date
                  </label>
                  <input
                    className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                    type="date"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-[#444748]">
                    Location
                  </label>
                  <input
                    className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                    placeholder="New York City"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">
                  Google Drive folder
                </label>
                <input
                  className="mt-2 w-full border-b border-[#c4c7c7] bg-transparent py-2 focus:outline-none"
                  placeholder="Paste Drive folder URL"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#444748]">
                  Visibility
                </label>
                <div className="mt-3 flex flex-wrap gap-3">
                  {["Private", "Unlisted", "Public"].map((option, index) => (
                    <button
                      key={option}
                      type="button"
                      className={`rounded-full px-5 py-2 text-xs uppercase tracking-widest ${
                        index === 1
                          ? "bg-black text-white"
                          : "bg-white text-[#444748]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              <Button type="submit" size="lg">
                Create event
              </Button>
            </form>
            <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
              <h2 className="text-lg">Publishing checklist</h2>
              <ul className="mt-4 space-y-3 text-sm text-[#444748]">
                <li>Confirm event details</li>
                <li>Sync Drive folder</li>
                <li>Invite collaborators</li>
                <li>Enable client delivery</li>
              </ul>
              <Button className="mt-8 w-full" variant="outline">
                Save draft
              </Button>
            </aside>
          </div>
        </Container>
      </Section>
    </main>
  );
}
