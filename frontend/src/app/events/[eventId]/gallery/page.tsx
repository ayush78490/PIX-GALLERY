import Container from "@/components/Container";
import Section from "@/components/Section";

type EventGalleryPageProps = {
  params: { eventId: string };
};

export default function EventGalleryPage({ params }: EventGalleryPageProps) {
  return (
    <main className="flex-1">
      <Section>
        <Container>
          <header className="mb-10">
            <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
              Featured editorial coverage
            </p>
            <h1 className="mt-2 text-4xl">Event {params.eventId}</h1>
            <div className="mt-6 flex flex-wrap gap-6 text-sm text-[#444748]">
              <span>14 October 2024</span>
              <span>The Met, NYC</span>
              <span>482 curated images</span>
            </div>
          </header>

          <section className="sticky top-20 z-10 mb-10 rounded-2xl border border-[#c4c7c7]/50 bg-[#f9f9f7]/90 p-4 backdrop-blur">
            <div className="flex flex-wrap items-center gap-3">
              {[
                "All Photos",
                "Red Carpet",
                "Atmosphere",
                "Performance",
                "VIP Dinners",
              ].map((label, index) => (
                <button
                  key={label}
                  className={`rounded-full px-4 py-2 text-xs uppercase tracking-widest ${
                    index === 0
                      ? "bg-black text-white"
                      : "bg-white text-[#444748]"
                  }`}
                >
                  {label}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2 text-xs text-[#747878]">
                <span>Sort</span>
                <span className="uppercase tracking-widest">Recent</span>
              </div>
            </div>
          </section>

          <section className="columns-1 gap-6 md:columns-2 lg:columns-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <article
                key={item}
                className="mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8e8e6]"
              >
                <img
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUo6P5tgcZquq8_Loci7PZXkmwabsx19McvokEi2PEp4oMBCdgJR-LPng-nRoN2zSGfRF5DiWmrtLfQqKWFiO1qTy2SumGVg92_PF8TvU3vAgvAmjuL9GrBz91Wxs41VkG6emOjKcfKQ_zKzR2GDyLNuRYcsqejKSoL2g1gIcyd_YXcz0ecP8-mjrW3CXJFf2NDdq7HbBZgfpJnoPnbB5Gse98pgvcM1I7bxZlWiVsfteLxsWvSyVLZiwNQNfE_P-2WfKnjuabfuI"
                  alt={`Gallery item ${item}`}
                />
              </article>
            ))}
          </section>
        </Container>
      </Section>
    </main>
  );
}
