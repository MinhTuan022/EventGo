// export type EventModel = Event[]
export interface EventModel {
  __v: number
  _id: string
  attendees: any[]
  description: string
  endTime: Date
  images: any[]
  photoUrl:string
  location: string
  organizer: string
  startTime: Date
  tickets: any[]
  title: string
}
