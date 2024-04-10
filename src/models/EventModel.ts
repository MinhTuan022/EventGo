export interface EventModel {
  geometry: Geometry
  _id: string
  title: string
  description: string
  address: string
  fullAddress: string
  photoEvent: string
  startTime: Date
  endTime: Date
  organizer: string
  category: string
  attendees: any[]
  tickets: string[]
  __v: number
}

export interface Geometry {
  type: string
  coordinates: number[]
}
