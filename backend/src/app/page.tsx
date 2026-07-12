import ProfileCard from "@/components/ProfileCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const profile = await prisma.profile.findFirst({
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
          organization: { select: { website: true, address: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!profile) {
    return (
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-20">
        <h1 className="text-3xl font-semibold text-slate-900">No photographer profile found</h1>
        <p className="mt-3 text-sm text-slate-600">Create one to preview the dynamic profile card.</p>
      </main>
    );
  }

  return (
    <main>
      <ProfileCard
        data={{
          image: profile.user?.image,
          phone: profile.contactPhone,
          email: profile.contactEmail ?? profile.user?.email,
          website: profile.user?.organization?.website,
          address: profile.user?.organization?.address,
          username: profile.displayName ?? profile.user?.name,
        }}
      />
    </main>
  );
}
