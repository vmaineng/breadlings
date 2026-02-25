export type Profile = {
    id: string
    username: string | null
    avatar_url: string | null
    created_at: string
    updated_at: string
}

export type Starter = { 
    id: string
    user_id: string
    name: string
     created_at: string
    updated_at: string
    archived: boolean
}

export type Feeding = {
    id: string
    starter_id: string
    user_id: string
    fed_at: string
    flour_grams: number | null
    water_grams: number | null
    discard_grams: number | null
    room_temp_f: number | null
    activities: StarterActivity[]
    notes: string | null
    created_at: string
    updated_at: string
}

export type Milestone = {
  id: string
  starter_id: string
  user_id: string
  milestone_id: MilestoneId
  unlocked_at: string
}

export type StarterActivity =
  | 'bubbling'
  | 'doubled'
  | 'peaked'
  | 'flat'
  | 'hooch'
  | 'smells_great'
  | 'smells_off'

export type MilestoneId =
  | 'first_feed'
  | 'five_feeds'
  | 'ten_feeds'
  | 'bubbling'
  | 'doubled'
  | 'hooch'
  | 'streak_3'
  | 'streak_7'
  | 'level4'

export type StarterStage = {
  level: number
  name: string
  stage: string
  title: string
  emoji: string
  desc: string
  svg: string
  feedsRequired: number
}

export type MilestoneDef = {
  id: MilestoneId
  icon: string
  name: string
  desc: string
  check: (feedings: Feeding[], unlockedIds: MilestoneId[]) => boolean
}

export type StarterHealth = {
  pct: number          // 0–100
  label: string        // e.g. "Thriving", "Hungry", "Starving"
  color: 'green' | 'yellow' | 'red'
  hoursSinceLastFeed: number | null
}

export type FeedingFormValues = {
  flourGrams: string
  waterGrams: string
  discardGrams: string
  roomTempF: string
  activities: StarterActivity[]
  notes: string
}

export type ApiSuccess<T> = { data: T; error: null }
export type ApiError      = { data: null; error: string }
export type ApiResult<T>  = ApiSuccess<T> | ApiError
