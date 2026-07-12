import Container from "@/components/Container";
import Section from "@/components/Section";

export default function GalleriesPage() {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
              Collections
            </p>
            <h1 className="mt-2 text-4xl">Featured galleries</h1>
            <p className="mt-3 max-w-2xl text-sm text-[#444748]">
              Browse curated events synced from Google Drive, with editorial
              selections and download-ready sets.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              "Vogue Gala 2024",
              "Aurelius & Claire",
              "Fashion Week AW24",
              "Blue Note Sessions",
              "The Metropolitan Gala",
              "Maison Editorial",
            ].map((title) => (
              <article
                key={title}
                className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6"
              >
                <h2 className="text-lg">{title}</h2>
                <p className="mt-2 text-xs uppercase tracking-widest text-[#747878]">
                  120+ curated images
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
