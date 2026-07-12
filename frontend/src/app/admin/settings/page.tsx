import Button from "@/components/Button";
import PageHeader from "@/components/PageHeader";

const toggles = [
  "Require verification for new photographers",
  "Enable Drive webhook monitoring",
  "Client download approvals",
  "Auto watermark previews",
];

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="System"
        title="System settings"
        description="Configure platform settings, notifications, and integrations."
      />
      <div className="space-y-4">
        {toggles.map((label) => (
          <div
            key={label}
            className="flex items-center justify-between rounded-2xl border border-[#c4c7c7]/60 bg-white px-6 py-5"
          >
            <span className="text-sm text-[#444748]">{label}</span>
            <Button variant="outline" size="sm">
              Toggle
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
