import Button from "@/components/Button";
import Container from "@/components/Container";
import Section from "@/components/Section";
import PhotographerOwnerPanel from "@/components/PhotographerOwnerPanel";

type PhotographerProfileProps = {
  params: Promise<{ photographerId: string }>;
};

export default async function PhotographerProfile({
  params,
}: PhotographerProfileProps) {
  const { photographerId } = await params;

  return (
    <main className="flex-1">
      <Section>
        <Container>
          <PhotographerOwnerPanel photographerId={photographerId} />
          <section className="mb-20 grid gap-12 md:grid-cols-[1fr_2fr]">
            <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[#e8e8e6]"></div>
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
                Editorial & Fine Art
              </p>
              <h1 className="text-4xl">{photographerId}</h1>
              <p className="max-w-2xl text-sm text-[#444748]">
                Based in London and working globally, our photographers specialize in
                cinematic editorial storytelling, focusing on light, composition, and
                intentional delivery.
              </p>
              <Button size="lg">Book photographer</Button>
            </div>
          </section>

          <section className="mb-20">
            <div className="mb-8 flex items-center justify-between border-b border-[#c4c7c7]/60 pb-4">
              <h2 className="text-2xl">Services & pricing</h2>
              <span className="text-xs uppercase tracking-widest text-[#747878]">
                Selected packages
              </span>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {["Editorial commission", "Event narrative"].map((title) => (
                <article
                  key={title}
                  className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6"
                >
                  <h3 className="text-xl">{title}</h3>
                  <p className="mt-2 text-sm text-[#444748]">
                    Full-day storytelling with curated delivery.
                  </p>
                  <p className="mt-6 text-lg text-[#715b3b]">$2,400+</p>
                </article>
              ))}
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-center justify-between border-b border-[#c4c7c7]/60 pb-4">
              <h2 className="text-2xl">Portfolio</h2>
              <div className="hidden gap-4 md:flex">
                {"All,Fashion,Portraits,Events".split(",").map((label) => (
                  <button
                    key={label}
                    className="text-xs uppercase tracking-widest text-[#747878]"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <article
                  key={item}
                  className="mb-6 break-inside-avoid overflow-hidden rounded-2xl bg-[#e8e8e6]"
                >
                  <div className="h-72"></div>
                </article>
              ))}
            </div>
          </section>
        </Container>
      </Section>
    </main>
  );
}
