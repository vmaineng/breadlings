"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabaseClient } from "../../lib/supabase";
import { getNewlyUnlockedMilestones } from "@/app/lib/starter-logic";
import type {
  FeedingFormValues,
  MilestoneId,
  StarterActivity,
} from "@/app/types";

export async function createFeeding(
  starterId: string,
  values: FeedingFormValues,
) {
  const supabase = await createServerSupabaseClient();
  const user = (await supabase.auth.getUser()).data.user;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const { data: feeding, error } = await supabase
    .from("feedings")
    .insert({
      starter_id: starterId,
      user_id: user.id,
      flour_grams: values.flourGrams ? parseFloat(values.flourGrams) : null,
      water_grams: values.waterGrams ? parseFloat(values.waterGrams) : null,
      discard_grams: values.discardGrams
        ? parseFloat(values.discardGrams)
        : null,
      room_temp_f: values.roomTempF ? parseFloat(values.roomTempF) : null,
      activities: values.activities,
      notes: values.notes || null,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating feeding:", error);
    throw new Error("Failed to create feeding");
  }

  const { data: allFeedings } = await supabase
    .from("feedings")
    .select("*")
    .eq("starter_id", starterId)
    .order("fed_at", { ascending: false });

  const { data: existingMilestones } = await supabase
    .from("milestones")
    .select("*")
    .eq("starter_id", starterId);

  const alreadyUnlocked = (existingMilestones ?? []).map(
    (m) => m.milestone_id as MilestoneId,
  );

  const newlyUnlocked = getNewlyUnlockedMilestones(
    allFeedings ?? [],
    alreadyUnlocked,
  );

  if (newlyUnlocked.length > 0) {
    await supabase.from("milestones").insert(
      newlyUnlocked.map((milestoneId) => ({
        starter_id: starterId,
        user_id: user.id,
        milestone_id: milestoneId,
      })),
    );
  }
  revalidatePath("/dashboard");
  return { data: { feeding, newMilestones: newlyUnlocked }, error: null };
}
