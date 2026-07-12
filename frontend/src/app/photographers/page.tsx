import Container from "@/components/Container";
import Section from "@/components/Section";
import PhotographerProfileCard from "@/components/PhotographerProfileCard";
import { backendUrl } from "@/lib/auth-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ApiProfile = {
  displayName?: string | null;
  bio?: string | null;
  servicesOffered?: string | null;
  user?: {
    name?: string | null;
    image?: string | null;
  } | null;
};

type PhotographerCard = {
  name: string;
  image: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  address?: string | null;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1200&q=80";

async function getPhotographers(): Promise<PhotographerCard[]> {
  try {
    const response = await fetch(`${backendUrl}/api/profiles`, { cache: "no-store" });
    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as { ok?: boolean; data?: ApiProfile[] };
    const rows = Array.isArray(payload.data) ? payload.data : [];

    return rows.map((profile, index) => {
      const name = profile.displayName?.trim() || profile.user?.name?.trim() || `Photographer ${index + 1}`;
      const image = profile.user?.image || FALLBACK_IMAGE;

      return {
        name,
        image,
        email: (profile as { contactEmail?: string | null }).contactEmail ?? null,
        phone: (profile as { contactPhone?: string | null }).contactPhone ?? null,
        website:
          (
            profile as {
              user?: { organization?: { website?: string | null } | null } | null;
            }
          ).user?.organization?.website ?? null,
        address:
          (
            profile as {
              user?: { organization?: { address?: string | null } | null } | null;
            }
          ).user?.organization?.address ?? null,
      };
    });
  } catch {
    return [];
  }
}

export default async function PhotographersPage() {
  const photographers = await getPhotographers();

  return (
    <main className="flex-1">
      <Section>
        <Container>
          <header className="mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#715b3b]">
              Artist roster
            </p>
            <h1 className="mt-2 text-4xl">Photographers</h1>
            <p className="mt-3 text-sm text-[#444748]">
              Explore editorial portfolios and book your next session.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {photographers.length === 0 ? (
              <p className="text-sm text-[#444748]">No photographers found in database.</p>
            ) : null}
            {photographers.map((photographer) => (
              <PhotographerProfileCard
                key={`${photographer.name}-${photographer.email ?? "no-email"}`}
                href={`/photographers/${encodeURIComponent(photographer.name)}`}
                data={{
                  image: photographer.image,
                  phone: photographer.phone,
                  email: photographer.email,
                  website: photographer.website,
                  address: photographer.address,
                  username: photographer.name,
                }}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
