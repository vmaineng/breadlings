import { differenceInHours, differenceInCalendarDays, parseISO, startOfDay } from 'date-fns'
import type {
  Feeding, MilestoneDef, MilestoneId, StarterHealth, StarterStage,
} from '../types'


export const STARTER_STAGES: StarterStage[] = [
  {
    level: 1, feedsRequired: 0,
    name: 'Bubbles', stage: 'Stage 1 · Wee Blob',
    title: 'Your Starter 🫙', emoji: '🫙',
    desc: 'Just beginning! Feed me every day to grow!',
    svg: `<ellipse cx="65" cy="80" rx="48" ry="38" fill="#C49A3C" opacity="0.3"/>
<ellipse cx="65" cy="75" rx="44" ry="36" fill="#E8C98A"/>
<ellipse cx="65" cy="68" rx="40" ry="33" fill="#F5E6C8"/>
<circle cx="52" cy="60" r="8" fill="white" opacity="0.9"/>
<circle cx="78" cy="60" r="8" fill="white" opacity="0.9"/>
<circle cx="54" cy="61" r="4.5" fill="#5C3800"/>
<circle cx="80" cy="61" r="4.5" fill="#5C3800"/>
<circle cx="56" cy="59" r="2" fill="white"/>
<circle cx="82" cy="59" r="2" fill="white"/>
<path d="M56 74 Q65 80 74 74" stroke="#C49A3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="48" cy="52" r="3" fill="#E8C98A" opacity="0.8"/>
<circle cx="78" cy="50" r="2.5" fill="#E8C98A" opacity="0.8"/>`,
  },
  {
    level: 2, feedsRequired: 5,
    name: 'Doughy', stage: 'Stage 2 · Bubbly Bab',
    title: 'A Lively Starter 🫧', emoji: '🫧',
    desc: 'Getting active! Look at those bubbles!',
    svg: `<ellipse cx="65" cy="82" rx="52" ry="36" fill="#C49A3C" opacity="0.3"/>
<ellipse cx="65" cy="74" rx="48" ry="38" fill="#E8C98A"/>
<ellipse cx="65" cy="66" rx="44" ry="35" fill="#F5E6C8"/>
<circle cx="38" cy="75" r="8" fill="#F5E6C8" stroke="#E8C98A" stroke-width="2"/>
<circle cx="92" cy="72" r="7" fill="#F5E6C8" stroke="#E8C98A" stroke-width="2"/>
<circle cx="52" cy="56" r="9" fill="white" opacity="0.9"/>
<circle cx="78" cy="56" r="9" fill="white" opacity="0.9"/>
<circle cx="54" cy="57" r="5" fill="#5C3800"/>
<circle cx="80" cy="57" r="5" fill="#5C3800"/>
<circle cx="56" cy="55" r="2" fill="white"/>
<circle cx="82" cy="55" r="2" fill="white"/>
<path d="M54 73 Q65 81 76 73" stroke="#C49A3C" stroke-width="2.5" fill="none" stroke-linecap="round"/>
<circle cx="65" cy="35" r="5" fill="#E8C98A" opacity="0.6"/>`,
  },
  {
    level: 3, feedsRequired: 10,
    name: 'Floury', stage: 'Stage 3 · Lofty Loaf',
    title: 'A Thriving Starter! 🌾', emoji: '🌾',
    desc: 'Doubled in size and smelling amazing!',
    svg: `<ellipse cx="65" cy="85" rx="55" ry="32" fill="#C49A3C" opacity="0.35"/>
<ellipse cx="65" cy="72" rx="52" ry="42" fill="#C49A3C"/>
<ellipse cx="65" cy="62" rx="48" ry="38" fill="#E8C98A"/>
<ellipse cx="65" cy="55" rx="44" ry="34" fill="#F5E6C8"/>
<path d="M30 55 Q65 30 100 55" stroke="#E8C98A" stroke-width="4" fill="none" stroke-linecap="round"/>
<circle cx="51" cy="50" r="10" fill="white" opacity="0.9"/>
<circle cx="79" cy="50" r="10" fill="white" opacity="0.9"/>
<circle cx="53" cy="51" r="5.5" fill="#5C3800"/>
<circle cx="81" cy="51" r="5.5" fill="#5C3800"/>
<circle cx="55" cy="49" r="2.5" fill="white"/>
<circle cx="83" cy="49" r="2.5" fill="white"/>
<path d="M53 68 Q65 77 77 68" stroke="#C49A3C" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
  {
    level: 4, feedsRequired: 20,
    name: 'Crustopher', stage: 'Stage 4 · Grand Loaf',
    title: 'A Legendary Starter 👑', emoji: '👑',
    desc: 'The ultimate sourdough companion. Practically baking itself!',
    svg: `<ellipse cx="65" cy="88" rx="58" ry="28" fill="#8B4513" opacity="0.4"/>
<ellipse cx="65" cy="76" rx="56" ry="40" fill="#8B4513"/>
<ellipse cx="65" cy="64" rx="52" ry="40" fill="#C49A3C"/>
<ellipse cx="65" cy="54" rx="48" ry="36" fill="#E8C98A"/>
<ellipse cx="65" cy="46" rx="43" ry="30" fill="#F5E6C8"/>
<path d="M28 46 Q65 18 102 46" stroke="#E8C98A" stroke-width="5" fill="none" stroke-linecap="round"/>
<polygon points="55,18 65,5 75,18 65,14" fill="#FFD700"/>
<circle cx="65" cy="5" r="5" fill="#FFD700"/>
<circle cx="52" cy="18" r="4" fill="#FFD700"/>
<circle cx="78" cy="18" r="4" fill="#FFD700"/>
<circle cx="50" cy="45" r="11" fill="white" opacity="0.95"/>
<circle cx="80" cy="45" r="11" fill="white" opacity="0.95"/>
<circle cx="52" cy="46" r="6" fill="#3D1A00"/>
<circle cx="82" cy="46" r="6" fill="#3D1A00"/>
<circle cx="54" cy="44" r="2.5" fill="white"/>
<circle cx="84" cy="44" r="2.5" fill="white"/>
<path d="M52 62 Q65 73 78 62" stroke="#8B4513" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  },
]

export function getStageForFeedings(feedingCount: number): StarterStage {
  const stage = [...STARTER_STAGES]
    .reverse()
    .find(s => feedingCount >= s.feedsRequired)
  return stage ?? STARTER_STAGES[0]
}

// ─── Starter Health ──────────────────────────────────────────────────────────

export function getStarterHealth(feedings: Feeding[]): StarterHealth {
  if (!feedings.length) {
    return { pct: 50, label: 'Unfed', color: 'yellow', hoursSinceLastFeed: null }
  }

  const lastFed = parseISO(feedings[0].fed_at) // feedings ordered desc
  const hrs = differenceInHours(new Date(), lastFed)

  if (hrs < 12) return { pct: 100, label: 'Thriving',  color: 'green',  hoursSinceLastFeed: hrs }
  if (hrs < 24) return { pct: 85,  label: 'Happy',     color: 'green',  hoursSinceLastFeed: hrs }
  if (hrs < 36) return { pct: 65,  label: 'Peckish',   color: 'yellow', hoursSinceLastFeed: hrs }
  if (hrs < 48) return { pct: 40,  label: 'Hungry',    color: 'yellow', hoursSinceLastFeed: hrs }
  if (hrs < 72) return { pct: 20,  label: 'Starving',  color: 'red',    hoursSinceLastFeed: hrs }
  return               { pct: 5,   label: 'Critical!', color: 'red',    hoursSinceLastFeed: hrs }
}

// ─── Feed Streak ─────────────────────────────────────────────────────────────

export function getFeedStreak(feedings: Feeding[]): number {
  if (!feedings.length) return 0

  // Get unique calendar days (feedings already ordered desc)
  const days = [...new Set(
    feedings.map(f => startOfDay(parseISO(f.fed_at)).toISOString())
  )]

  let streak = 1
  for (let i = 1; i < days.length; i++) {
    const diff = differenceInCalendarDays(parseISO(days[i - 1]), parseISO(days[i]))
    if (diff === 1) streak++
    else break
  }
  return streak
}

// ─── Milestones ──────────────────────────────────────────────────────────────

export const MILESTONE_DEFS: MilestoneDef[] = [
  {
    id: 'first_feed',
    icon: '🌱', name: 'First Feed', desc: 'Log your first feeding',
    check: (feedings) => feedings.length >= 1,
  },
  {
    id: 'five_feeds',
    icon: '🍞', name: '5 Feedings', desc: 'Feed your starter 5 times',
    check: (feedings) => feedings.length >= 5,
  },
  {
    id: 'ten_feeds',
    icon: '🥖', name: "Baker's Dozen", desc: 'Feed your starter 10 times',
    check: (feedings) => feedings.length >= 10,
  },
  {
    id: 'bubbling',
    icon: '🫧', name: 'Bubble Party', desc: 'Observe active bubbling',
    check: (feedings) => feedings.some(f => f.activities.includes('bubbling')),
  },
  {
    id: 'doubled',
    icon: '📈', name: 'It Doubled!', desc: 'Starter doubled in size',
    check: (feedings) => feedings.some(f => f.activities.includes('doubled')),
  },
  {
    id: 'hooch',
    icon: '🍺', name: 'Hooch Alert', desc: 'Spotted a hooch layer',
    check: (feedings) => feedings.some(f => f.activities.includes('hooch')),
  },
  {
    id: 'streak_3',
    icon: '🔥', name: '3 Day Streak', desc: 'Feed 3 days in a row',
    check: (feedings) => getFeedStreak(feedings) >= 3,
  },
  {
    id: 'streak_7',
    icon: '⭐', name: 'Week Warrior', desc: 'Feed 7 days in a row',
    check: (feedings) => getFeedStreak(feedings) >= 7,
  },
  {
    id: 'level4',
    icon: '👑', name: 'Grand Loaf', desc: 'Reach Stage 4',
    check: (feedings) => feedings.length >= 20,
  },
]

export function getNewlyUnlockedMilestones(
  feedings: Feeding[],
  alreadyUnlocked: MilestoneId[]
): MilestoneId[] {
  return MILESTONE_DEFS
    .filter(m => !alreadyUnlocked.includes(m.id) && m.check(feedings, alreadyUnlocked))
    .map(m => m.id)
}
