"use client";

import { useState, useTransition } from "react";
import { Button, Input, Textarea, Card } from "../ui";
import { MILESTONE_DEFS } from "../lib/starter-logic";
import { cn } from "../lib/utils";
import type {
  StarterActivity,
  FeedingFormValues,
  MilestoneId,
  Starter,
} from "../types";

const ACTIVITY_OPTIONS: {
  value: StarterActivity;
  label: string;
  emoji: string;
}[] = [
  { value: "bubbling", label: "Bubbling", emoji: "🫧" },
  { value: "doubled", label: "Doubled", emoji: "📈" },
  { value: "peaked", label: "Peaked", emoji: "🏔️" },
  { value: "flat", label: "Flat / Sleepy", emoji: "😴" },
  { value: "hooch", label: "Hooch Layer", emoji: "🍺" },
  { value: "smells_great", label: "Smells Amazing", emoji: "😍" },
  { value: "smells_off", label: "Smells Off", emoji: "😬" },
];

interface FeedingFormProps {
  starterId: string;
  onSuccess?: (newMilestones: MilestoneId[]) => void;
}

export function FeedingForm({ starterId, onSuccess }: FeedingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<StarterActivity[]>([]);
  const [values, setValues] = useState<Omit<FeedingFormValues, "activities">>({
    flourGrams: "",
    waterGrams: "",
    discardGrams: "",
    roomTempF: "",
    notes: "",
  });

  function toggleActivity(val: StarterActivity) {
    setActivities((prev) =>
      prev.includes(val) ? prev.filter((a) => a !== val) : [...prev, val],
    );
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.flourGrams && !values.waterGrams) {
      setError("Add at least flour or water amounts");
      return;
    }
    setError(null);

    startTransition(async () => {
      const result = await createFeeding(starterId, { ...values, activities });
      if (result.error) {
        setError(result.error);
      } else {
        setValues({
          flourGrams: "",
          waterGrams: "",
          discardGrams: "",
          roomTempF: "",
          notes: "",
        });
        setActivities([]);
        onSuccess?.(result.data?.newMilestones ?? []);
      }
    });
  }

  return (
    <Card accent>
      <h2 className="font-fraunces font-bold text-2xl text-crust mb-5 flex items-center gap-2">
        🫗 Feed your Starter
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Input
            label="Flour (g)"
            id="flourGrams"
            name="flourGrams"
            type="number"
            min="0"
            placeholder="50"
            value={values.flourGrams}
            onChange={handleChange}
          />
          <Input
            label="Water (g)"
            id="waterGrams"
            name="waterGrams"
            type="number"
            min="0"
            placeholder="50"
            value={values.waterGrams}
            onChange={handleChange}
          />
          <Input
            label="Discard (g)"
            id="discardGrams"
            name="discardGrams"
            type="number"
            min="0"
            placeholder="50"
            value={values.discardGrams}
            onChange={handleChange}
          />
          <Input
            label="Room Temp (°F)"
            id="roomTempF"
            name="roomTempF"
            type="number"
            min="50"
            max="110"
            placeholder="75"
            value={values.roomTempF}
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="text-xs font-extrabold text-text-light uppercase tracking-wide font-nunito mb-2">
            Starter activity observed
          </p>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map((act) => (
              <button
                key="act.value"
                type="button"
                onClick={() => toggleActivity(act.value)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold font-nunito",
                  "border transition-all duration-150",
                  activities.includes(act.value)
                    ? "bg-linear-to-r from-wheat to-dough-dark border-wheat-deep shadow-sm text-crust"
                    : "bg-[#fef8ed] border-wheat-deep/25 text-crust hover:bg-dough hover:border-wheat-deep/50",
                )}
              >
                <span>{act.emoji}</span>
                <span>{act.label}</span>
              </button>
            ))}
          </div>
        </div>

        <Textarea
          className="py-2 px-4 border border-b-crust text-crust"
          label="NOTES (OPTIONAL)"
          placeholder="How's your starter going? Any changes?"
          name="notes"
          value={values.notes}
          onChange={handleChange}
        />

        {error && (
          <p className="text-sm font-bold text-bread-red font-nunito bg-red-50 rounded-xl px-4 py-2 border border-red-200">
            {error}
          </p>
        )}

        <Button type="submit" variant="primary" size="lg" loading={isPending}>
          🍞 Feed Starter!
        </Button>
      </form>
    </Card>
  );
}
