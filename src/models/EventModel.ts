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
  attendees: string[]
  tickets: Ticket[]
  __v: number
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Ticket {
  _id: string
  ticketType: string
  price: number
  quantity: number
}
