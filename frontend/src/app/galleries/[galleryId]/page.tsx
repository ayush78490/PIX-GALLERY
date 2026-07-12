import Button from "@/components/Button";
import Container from "@/components/Container";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";

type GalleryPageProps = {
  params: { galleryId: string };
};

export default function GalleryPage({ params }: GalleryPageProps) {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PageHeader
            eyebrow="Gallery"
            title={`Gallery ${params.galleryId}`}
            description="View curated selections and download approved photos."
            actions={
              <Button variant="outline" href="#">
                Download set
              </Button>
            }
          />
          <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="columns-1 gap-6 md:columns-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <article
                  key={index}
                  className="mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8e8e6]"
                >
                  <img
                    className="h-full w-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUo6P5tgcZquq8_Loci7PZXkmwabsx19McvokEi2PEp4oMBCdgJR-LPng-nRoN2zSGfRF5DiWmrtLfQqKWFiO1qTy2SumGVg92_PF8TvU3vAgvAmjuL9GrBz91Wxs41VkG6emOjKcfKQ_zKzR2GDyLNuRYcsqejKSoL2g1gIcyd_YXcz0ecP8-mjrW3CXJFf2NDdq7HbBZgfpJnoPnbB5Gse98pgvcM1I7bxZlWiVsfteLxsWvSyVLZiwNQNfE_P-2WfKnjuabfuI"
                    alt={`Gallery frame ${index + 1}`}
                  />
                </article>
              ))}
            </div>
            <aside className="rounded-3xl border border-[#c4c7c7]/60 bg-white p-6">
              <h2 className="text-lg">Collection details</h2>
              <div className="mt-4 space-y-3 text-sm text-[#444748]">
                <p>Photographer: Sienna Aris</p>
                <p>Event: Metropolitan Gala</p>
                <p>Assets: 482</p>
                <p>Delivery: Approved selects</p>
              </div>
              <Button className="mt-8 w-full" size="md">
                Request edits
              </Button>
            </aside>
          </section>
        </Container>
      </Section>
    </main>
  );
}
