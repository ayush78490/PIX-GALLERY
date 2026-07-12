import Link from "next/link";
import Button from "@/components/Button";
import Container from "@/components/Container";
import Section from "@/components/Section";

const featuredArtists = [
  {
    name: "Elena Vance",
    discipline: "Editorial & High-Fashion",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDymlpdjDBjrhXzIh0MzUhhDNa-y_PhNKpb9-2SijTB98ewyulGCQ8SFGUSfuhqRQAc1bkxirsexxnrgzm9-PkQXF2-lD7on51XhIcbJMJc2x-_P-4y4X_Ref2BBtdUAeuBmvpXFoHHQ0oPIO-t5aEgEShx-PngNeUnkhcL9pHqfQzjACIZ1-b2vZ-ifkjEYW-e_7F8mzUqFNVDP-923FlknwfKVE3z7topk5YN5C9SapElz0vzERTRPbMM48Umfi8mkesmV_FLReU",
  },
  {
    name: "Marcus Thorne",
    discipline: "Architectural & Interior",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZjOj8e4bci9dlLUqUmntJj--TJi4jo5luRppinIroLH0cnuBVQXsa_pzlWdL4VSY_RUj7HJ4DAAEJm4XCAUel820W4v5FCiMIGmBGy5hqqEU707WrvTfWuSoO9CxrmGSTrNcQmL1ioTTfVYXX1Ix3-2I4Qenqlr5Qbob-eSwU5d2yLBp4ZtCP5CzlKq3SAQZQZWB1jYrWvFVFjRMiD1ApQiz3cf60Pl7z6N5DonkCVT-TgkGyGvUCWNNHm6XjV2o2mFlpLojPuzQ",
  },
  {
    name: "Sienna Aris",
    discipline: "Luxury Events & Galas",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuACkmk-n-A3-Os3yCpqx8IZTTt-0J8YhygVteGS64CFKYC70BPu8H5-wXDBPdArXCiS5jD5zN2Jr1itWZLx8M3-YWoq5Ntku6ER9v7dXxunQpeYF1GIRKG2DP4kgrAWbxVlCuJrqS2shUXNSFS-EVt26yQdlBMNYKXprmJkKASlflt1KriCUxhFb81jWUg6Qe_sPJkmXfo90pPMCkHfgtuYN-SrP1OFQLGTiDYl1bXyFiRPDz1GFhI9gjdm-bob56fdZaM2rThm3j8",
  },
];

const featuredCollections = [
  {
    title: "The Metropolitan Gala",
    author: "Sienna Aris",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDNPKFrXjpU1nCZoo7Icf9DVzVSor6DpDET1tiWSFYvqWPUT4VaUc77z8HQtkLyt4PKhHq2Bv5SASKFW0Y26fDmCayU6zpHyA_30cvH-ULbIk83RgswV7AfpDMaTKCc0N87XpU5-uXuYnMc9BnXwSEj99YY3tk7lkcljJ8kZmdgaYTiPO6ZMYuLlFyqfTgcNhRWraRf5-TVA0RUVCtK_3YRAwrrtrQCshui0tIAxjnfF8xPbMlT6eP5G4bsYBwWw_g5DnQxVuZF5nQ",
  },
  {
    title: "Aurelius & Claire",
    author: "Marcus Thorne",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDiD5CfyDmfAq9N4Pd5exRuOZVMDherhCx9f1vZaeWH6TsLOU25X9dWmOrW1tlgrBIzAuQMDoZtyFjITFUIsB5yyqDSMXjENYBGNOIowLq2NYUVtA3Vltvp-wOFuZ1QpYM8YjGAGHpLWkaOxf5ht4loKnoLzVK1u56IttUxqRwU4dpOwZwcimCddP8lbIwd2jyXpA8VxviYs4aJFup21gxYP2zbMQUHXQ1EmS_YVnly_R60aRns5NosoNWBl5p9cF622PmmEgFKJNQ",
  },
  {
    title: "Fashion Week AW24",
    author: "Elena Vance",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDr7gzlS7d4b2qi9GzjB73uvQ2vT-2HEVwufbmW4NJ0EGpZncRaJt2Rzyzft5vbLZ5k87zS7IqMMm_6TJKotZ4LRrK6VrZ7qTG3CzqB2wTOTBqtIBefh9J02z1AG_pN0c4r-e4VNP_ON5TQJpDSG61EhrR96K3N0Pcls9DK8Lqd3oEkytKf6VYQpBx3V48NRKlrOLdP1_bI2POguxwvwgRdXsbXxkTtNZRSAwYZyx8z5yn4z4s_L5dt-_sc7i9fMZjOTaQ_QsY5MIo",
  },
];

export default function Home() {
  return (
    <main className="flex-1">
      <Section padded={false} className="relative h-[720px] overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover grayscale"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_R8u2p-wkR_PsJyFSHmn1Pl-8lKn2nWFDeRkCV-XwGlMwuRHWr7LN5k9T4h_rXXovLl8q7RSQpO2_iPUalkeuGWMgSIAaop0SRezvvee28mj1gNYNR9iUg96QX2BKFkgg4KTCj7YW-gB--s8rv2SteDMnpyxFGHhOmr9sgO-7OROinAUQ4VgFyHlN6F9oZJ-vqp5oxN9D4r0koEWg_FbPfEdGyP28BFiEMAJ1EqTnGwel-8SL4R3DN3PkOIV7nWIaq8bAj6DKTRk"
          alt="Editorial background"
        />
        <div className="absolute inset-0 bg-black/45"></div>
        <Container className="relative z-10 flex h-full flex-col justify-center gap-8">
          <h1 className="max-w-3xl text-5xl leading-tight text-white md:text-6xl">
            Master the frame with intentionality.
          </h1>
          <p className="max-w-2xl text-lg text-white/75">
            Pixgallery connects discerning clients with world-class photographers
            and delivers curated collections from Google Drive with editorial
            polish.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button href="/galleries" variant="inverse" size="lg">
              Explore collections
            </Button>
            <Button href="/auth/register" variant="outlineLight" size="lg">
              Join as photographer
            </Button>
          </div>
          <div className="mt-10 w-full max-w-2xl rounded-2xl bg-white/95 p-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <span className="px-4 text-sm text-[#747878]">Search</span>
              <input
                className="w-full flex-1 border-none bg-transparent py-3 text-sm focus:outline-none"
                placeholder="Discover artists, styles, or curated series"
              />
              <Button className="w-full sm:w-auto" size="sm">
                Search
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
                Curation
              </p>
              <h2 className="text-3xl">Featured photographers</h2>
            </div>
            <Link className="text-sm text-[#1a1c1b]" href="/photographers">
              View all talent
            </Link>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {featuredArtists.map((artist) => (
              <Link key={artist.name} href={`/photographers/${artist.name.toLowerCase().replace(/\s+/g, "-")}`}>
                <article className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                  <img
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    src={artist.image}
                    alt={artist.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h3 className="text-3xl leading-tight text-white">
                      {artist.name}
                    </h3>
                    <p className="mt-2 text-xs uppercase tracking-[0.2em] text-white/70">
                      {artist.discipline}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <Section padded={false} className="bg-[#f0f0ee]">
        <Container className="py-20">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
              Recent works
            </p>
            <h2 className="mt-2 text-3xl">Event galleries</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {featuredCollections.map((collection) => (
              <article
                key={collection.title}
                className="group relative overflow-hidden rounded-2xl bg-[#e8e8e6]"
              >
                <img
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  src={collection.image}
                  alt={collection.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100"></div>
                <div className="absolute bottom-0 left-0 w-full p-6 text-white opacity-0 transition group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-[0.2em]">
                    {collection.title}
                  </p>
                  <p className="text-sm text-white/70">By {collection.author}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Button href="/galleries" variant="outline" size="lg">
              Browse all collections
            </Button>
          </div>
        </Container>
      </Section>

      <Section padded={false} className="bg-black text-white">
        <Container className="py-20">
          <div className="flex flex-col items-center gap-8 text-center">
            <h2 className="text-4xl">
              Preserve your legacy with pixGallery&apos;s most intentional visionaries.
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/bookings" variant="inverse" size="lg">
                Start your series
              </Button>
              <Button href="/auth/register" variant="outlineLight" size="lg">
                Join as artist
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
