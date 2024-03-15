export type EventModel = Event[]
export interface Event {
  __v: number
  _id: string
  attendees: any[]
  description: string
  endTime: string
  images: any[]
  location: string
  organizer: string
  startTime: string
  tickets: any[]
  title: string
}
