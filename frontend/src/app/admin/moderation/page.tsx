import Button from "@/components/Button";
import InfoCard from "@/components/InfoCard";
import PageHeader from "@/components/PageHeader";

const queue = [
  {
    title: "Vogue Gala 2024",
    reason: "Flagged by client",
    action: "Review",
  },
  {
    title: "Maison Editorial",
    reason: "AI safety scan",
    action: "Approve",
  },
  {
    title: "Blue Note Sessions",
    reason: "Usage rights dispute",
    action: "Hold",
  },
];

export default function AdminModerationPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Governance"
        title="Content moderation"
        description="Review flagged galleries and enforce content policies."
      />
      <div className="grid gap-6 md:grid-cols-2">
        {queue.map((item) => (
          <InfoCard key={item.title} title={item.title} meta={item.reason}>
            <Button className="mt-4" variant="outline" size="sm">
              {item.action}
            </Button>
          </InfoCard>
        ))}
      </div>
    </div>
  );
}
