export type EventType = 'off-game' | 'in-game'

export interface ClanEvent {
  id: number
  title: string
  type: EventType
  image?: string | null
  beneficiente: boolean
  description?: string | null
  date: string
  organizer?: string | null
}
