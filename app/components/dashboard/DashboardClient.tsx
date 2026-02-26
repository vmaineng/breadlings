import { FeedingForm } from "../FeedingForm";

export function DashboardClient() {
  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>
      <FeedingForm starterId="starter123" />
    </div>
  );
}
