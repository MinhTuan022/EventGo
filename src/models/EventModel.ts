// export type EventModel = Event[]
export interface EventModel {
  __v: number
  _id: string
  attendees: any[]
  description: string
  endTime: string
  images: any[]
  photoUrl:string
  location: string
  organizer: string
  startTime: string
  tickets: any[]
  title: string
}
