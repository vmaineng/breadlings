"use client";

import { useTransition } from "react";
import { format, parseISO } from "date-fns";
import { cn } from "../../lib/utils";
import type { Feeding } from "@/app/types";
import { Card } from "@/app/ui";

interface FeedingLogProps {
  feedings: Feeding[];
}

export function FeedingLog({ feedings }: FeedingLogProps) {
  return (
    <Card>
      <h2 className="font-fraunces font-bold text-2xl text-crust mb-4">
        Feeding Log
      </h2>

      {feedings.length === 0 ? (
        <div>No feedings yet. Please feed your baby</div>
      ) : (
        <div>
          {feedings.slice(0, 20).map((feeding, i) => (
            <FeedingEntry key={feeding.id} feeding={feeding} index={i} />
          ))}
        </div>
      )}
    </Card>
  );
}

function FeedingEntry({ feeding, index }: { feeding: Feeding; index: number }) {
  const [isPending, startTransition] = useTransition();
  const activities = feeding.activities ?? [];
  const isActive =
    activities.includes("bubbling") ||
    activities.includes("doubled") ||
    activities.includes("peaked");
  const isFlat = activities.includes("flat");

  const dotVariant = isActive ? "active" : isFlat ? "flat" : "fed";
  const dotEmoji = isActive ? "🫧" : isFlat ? "😴" : "🍞";

  const tagVariants = {
    fed: "bg-yellow-100 text-amber-700",
    active: "bg-green-100 text-green-700",
    flat: "bg-orange-100 text-orange-700",
  };

  const details = [
    feeding.flour_grams && `${feeding.flour_grams}g flour`,
    feeding.water_grams && `${feeding.water_grams}g water`,
    feeding.discard_grams && `${feeding.discard_grams}g discard`,
    feeding.room_temp_f && `${feeding.room_temp_f}°F`,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="flex items-start gap-3 py-4 animate-fadeIn"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 border border-wheat-deep/30",
          dotVariant === "active" &&
            "bg-linear-to-br from-green-100 to-green-200",
          dotVariant === "flat" &&
            "bg-linear-to-br from-orange-100 to-orange-200",
          dotVariant === "fed" &&
            "bg-linear-to-br from-yellow-100 to-amber-100",
        )}
      >
        {dotEmoji}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap mb-0.5">
          <span className="text-xs font-extrabold text-text-light font-nunito">
            {format(parseISO(feeding.fed_at), "MMM d, h:mm a")}
          </span>
          <span
            className={cn(
              "text-xs font-extrabold rounded-lg px-2 py-0.5 font-nunito",
              tagVariants[dotVariant],
            )}
          >
            {dotVariant === "active"
              ? "Active!"
              : dotVariant === "flat"
                ? "Flat"
                : "Fed"}
          </span>
          {activities.length > 0 && (
            <span className="text-xs font-bold text-text-light italic font-nunito">
              {activities.map((a) => a.replace("_", " ")).join(", ")}
            </span>
          )}
        </div>
        {details && (
          <p className="text-xs text-text-light font-semibold font-nunito">
            {details}
          </p>
        )}
        {feeding.notes && (
          <p className="text-sm text-crust font-semibold font-nunito italic mt-0.5">
            &ldquo;{feeding.notes}&rdquo;
          </p>
        )}
      </div>
    </div>
  );
}
