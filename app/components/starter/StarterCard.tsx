"use client";

import { useMemo } from "react";
import { Card } from "../../ui";
import {
  getStageForFeedings,
  getStarterHealth,
  getFeedStreak,
} from "../../lib/starter-logic";
import { formatHoursAgo } from "../../lib/utils";
import { cn } from "../../lib/utils";
import type { Feeding, Starter } from "../../types";

interface StarterCardProps {
  starter?: Starter;
  feedings?: Feeding[];
}

export function StarterCard({ starter, feedings = [] }: StarterCardProps) {
  const stage = useMemo(
    () => getStageForFeedings(feedings.length),
    [feedings.length],
  );
  const health = useMemo(() => getStarterHealth(feedings), [feedings]);
  const streak = useMemo(() => getFeedStreak(feedings), [feedings]);

  const healthBarColor = {
    green: "from-bread-green to-green-400",
    yellow: "from-wheat to-wheat-deep",
    red: "from-bread-red to-red-400",
  }[health.color];

  if (!starter) {
    return (
      <Card accent className="animate-fade-in">
        <div className="flex items-center justify-center py-10 text-text-light font-nunito font-semibold">
          <span className="mr-2 text-2xl">🫙</span> Loading your starter...
        </div>
      </Card>
    );
  }

  return (
    <Card accent className="animate-fadeIn">
      <div className="flex items-center gap-6 flex-wrap sm:flex-nowrap">
        {/* Bread creature */}
        <div className="shrink-0 text-center">
          <svg
            viewBox="0 0 130 130"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[120px] h-[120px] animate-breadBob drop-shadow-md"
            dangerouslySetInnerHTML={{ __html: stage.svg }}
          />
          <p className="font-fraunces font-bold text-crust text-lg mt-1">
            {stage.name}
          </p>
          <span className="inline-block text-xs font-extrabold font-nunito text-text-light bg-linear-to-r from-[#fef3d8] to-[#fde8b4] border border-wheat-deep/30 rounded-full px-3 py-0.5 mt-1">
            {stage.stage}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h2 className="font-fraunces font-bold text-2xl text-crust mb-3">
            {starter.name}
            <span className="text-wheat-deep">{stage.emoji}</span>
          </h2>

          {/* Health bar */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-extrabold text-text-light font-nunito mb-1.5">
              <span>Starter Health</span>
              <span
                className={cn(
                  "font-bold",
                  health.color === "green" && "text-bread-green",
                  health.color === "yellow" && "text-wheat-deep",
                  health.color === "red" && "text-bread-red",
                )}
              >
                {health.label} · {health.pct}%
              </span>
            </div>
            <div className="h-3.5 bg-dough rounded-full overflow-hidden border border-wheat-deep/20">
              <div
                className={cn(
                  "h-full rounded-full bg-linear-to-r transition-all duration-700",
                  healthBarColor,
                )}
                style={{ width: `${health.pct}%` }}
              />
            </div>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap gap-2">
            <StatPill emoji="🍽️" value={`${feedings.length} feedings`} />
            <StatPill
              emoji="⏰"
              value={
                health.hoursSinceLastFeed !== null
                  ? `Fed ${formatHoursAgo(health.hoursSinceLastFeed)}`
                  : "Never fed"
              }
            />
            <StatPill emoji="🔥" value={`${streak} day streak`} />
            <StatPill
              emoji="📊"
              value={`${feedings.length} / ${getNextLevelFeeds(feedings.length)} feeds to lvl up`}
            />
          </div>
        </div>
      </div>

      {/* Overdue warning */}
      {health.color !== "green" && <OverdueBanner health={health} />}
    </Card>
  );
}

function StatPill({ emoji, value }: { emoji: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-linear-to-r from-[#fef8ed] to-[#fdf0d5] border border-wheat-deep/25 rounded-xl px-3 py-1.5 text-xs font-bold text-crust font-nunito">
      <span>{emoji}</span>
      <span>{value}</span>
    </div>
  );
}

function OverdueBanner({
  health,
}: {
  health: ReturnType<typeof getStarterHealth>;
}) {
  const isRed = health.color === "red";
  return (
    <div
      className={cn(
        "mt-4 flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold font-nunito",
        isRed
          ? "bg-linear-to-r from-red-50 to-rose-100 text-red-800 border border-red-200"
          : "bg-linear-to-r from-yellow-50 to-amber-100 text-amber-800 border border-amber-200",
      )}
    >
      <span className="text-lg">{isRed ? "🚨" : "⚠️"}</span>
      <span>
        {isRed
          ? `URGENT: Your starter is ${health.label.toLowerCase()}! Feed it now!`
          : `Your starter is getting ${health.label.toLowerCase()} — time for a feeding!`}
      </span>
    </div>
  );
}

function getNextLevelFeeds(current: number): number {
  const thresholds = [5, 10, 20];
  return thresholds.find((t) => t > current) ?? 20;
}
