export interface EventModel {
  position: Position
  _id: string
  title: string
  description: string
  location: string
  images: any[]
  photoUrl: string
  startTime: string
  endTime: string
  organizer: Organizer
  category: string
  attendees: any[]
  tickets: any[]
  __v: number
}

export interface Position {
  type: string
  coordinates: number[]
}

export interface Organizer {
  _id: string
  name: string
}
