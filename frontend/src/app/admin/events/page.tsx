import PageHeader from "@/components/PageHeader";

const oversight = [
  {
    title: "Metropolitan Gala",
    status: "Public",
    owner: "Sienna Aris",
    lastSync: "12m ago",
  },
  {
    title: "Maison Editorial",
    status: "Review",
    owner: "Julian East",
    lastSync: "1h ago",
  },
  {
    title: "Blue Note Sessions",
    status: "Private",
    owner: "Lila Vance",
    lastSync: "3h ago",
  },
];

export default function AdminEventsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Operations"
        title="Event oversight"
        description="Monitor event activity, gallery sharing, and access status."
      />
      <div className="space-y-4">
        {oversight.map((event) => (
          <article
            key={event.title}
            className="rounded-2xl border border-[#c4c7c7]/60 bg-white p-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-lg">{event.title}</h2>
                <p className="mt-2 text-sm text-[#444748]">
                  Owner: {event.owner}
                </p>
              </div>
              <div className="text-right text-xs uppercase tracking-widest text-[#747878]">
                <p>{event.status}</p>
                <p className="mt-2">Sync {event.lastSync}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
