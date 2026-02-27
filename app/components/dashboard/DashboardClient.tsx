import { FeedingForm } from "../feeding/FeedingForm";
import { StarterCard } from "../starter/StarterCard";
import { Button } from "../../ui";

interface DashboardClientProps {
  starter: Starter;
  feedings: Feeding[];
  unlockedIds: MilestoneId[];
  userName: string;
}

export function DashboardClient() {
  return (
    <div
      className="min-h-screen bg-cream "
      style={{
        backgroundImage: `radial-gradient(ellipse at 0% 0%, rgba(232,201,138,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 100% 100%, rgba(196,122,58,0.2) 0%, transparent 50%)`,
      }}
    >
      <header className="sticky top-0 z-10 bg-cream/80 backdrop-blur-sm border-b border-wheat/40">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="font-fraunces font-black text-2xl text-crust">
            Bread<span className="text-wheat-deep italic">lings</span> 🍞
          </h1>

          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-text-light font-nunito hidden sm:block">
              username
            </span>
            <form>
              <Button type="submit" variant="ghost" size="sm">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>
      <StarterCard />
      <FeedingForm starterId="starter123" />
    </div>
  );
}
