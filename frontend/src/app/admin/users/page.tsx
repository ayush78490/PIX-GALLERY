import PageHeader from "@/components/PageHeader";

const users = [
  { name: "Sienna Aris", role: "Photographer", status: "Verified" },
  { name: "Julian East", role: "Photographer", status: "Pending" },
  { name: "Maison Atelier", role: "Organization", status: "Verified" },
  { name: "Lila Vance", role: "Photographer", status: "Review" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Roster"
        title="User management"
        description="Review profiles, verification requests, and access roles."
      />
      <div className="space-y-4">
        {users.map((user) => (
          <article
            key={user.name}
            className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg">{user.name}</h2>
                <p className="mt-2 text-sm text-[#444748]">{user.role}</p>
              </div>
              <span className="text-xs uppercase tracking-widest text-[#747878]">
                {user.status}
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
