"use client";

import { useState, useTransition } from "react";
import { Button, Input, Textarea, Card } from "../ui";
import { cn } from "@/lib/utils";
import type { StarterActivity, FeedingFormValues, MilestoneId } from "../types";

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
