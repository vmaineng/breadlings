"use client";

import { useState } from "react";
import { FeedingForm } from "../feeding/FeedingForm";
import { FeedingLog } from "../feeding/FeedingLog";
import { StarterCard } from "../starter/StarterCard";
import { MilestonesGrid } from "../starter/MilestonesGrid";
import { Button } from "../../ui";
import { MilestoneId } from "@/app/types";
import { MILESTONE_DEFS } from "@/app/lib/starter-logic";

interface DashboardClientProps {
  starter: Starter;
  feedings: Feeding[];
  unlockedIds: MilestoneId[];
  userName: string;
}

export function DashboardClient({
  starter,
  feedings,
  unlockedIds,
  userName,
}: DashboardClientProps) {
  const [newMilestoneToast, setNewMilestoneToast] =
    useState<MilestoneId | null>(null);

  function handleFeedSuccess(newMilestones: MilestoneId[]) {
    if (newMilestones.length > 0) {
      setNewMilestoneToast(newMilestones[0]);
      setTimeout(() => setNewMilestoneToast(null), 5000);
    }
  }

  const toastMilestone = newMilestoneToast
    ? MILESTONE_DEFS.find((m) => m.id === newMilestoneToast)
    : null;

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

      <main>
        <StarterCard starter={starter} feedings={feedings} />
        <FeedingForm starterId={starter.id} onSuccess={handleFeedSuccess} />
        <FeedingLog feedings={feedings} />
        <MilestonesGrid unlockedIds={unlockedIds} />
      </main>

      {toastMilestone && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fadeIn">
          <div className="bg-crust text-cream rounded-full px-5 py-3 shadow-xl flex items-center gap-2 font-nunito font-extrabold text-sm whitespace-nowrap">
            <span className="text-lg">{toastMilestone.icon}</span>
            <span>Milestone unlocked: {toastMilestone.name}!</span>
          </div>
        </div>
      )}
    </div>
  );
}
