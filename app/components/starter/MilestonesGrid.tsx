import { Card } from "@/app/ui";
import { MILESTONE_DEFS } from "../../lib/starter-logic";
import { cn } from "../../lib/utils";
import type { MilestoneId } from "../../types";

interface MilestonesGridProps {
  unlockedIds: MilestoneId[];
}

export function MilestonesGrid({ unlockedIds }: MilestonesGridProps) {
  return (
    <Card>
      <h2 className="font-fraunces font-bold text-2xl text-crust mb-4 flex items-center gap-2">
        🏅 Milestones
      </h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {MILESTONE_DEFS.map((m) => {
          const unlocked = unlockedIds.includes(m.id);
          return (
            <div
              key={m.id}
              title={m.desc}
              className={cn(
                "relative rounded-2xl p-3 text-center border transition-transform duration-200 hover:-translate-y-0.5",
                unlocked
                  ? "bg-gradient-to-b from-[#fffacd] to-[#fff0f7] border-wheat-deep/30 shadow-sm"
                  : "bg-dough/30 border-wheat/30 opacity-40 grayscale-[60%]",
              )}
            >
              {unlocked && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-bread-green text-white rounded-full text-xs flex items-center justify-center font-bold shadow">
                  ✓
                </span>
              )}
              <span className="block text-2xl mb-1">{m.icon}</span>
              <p className="text-xs font-extrabold text-crust font-nunito leading-tight">
                {m.name}
              </p>
              <p className="text-[10px] text-text-light font-semibold font-nunito mt-0.5 leading-tight">
                {m.desc}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
