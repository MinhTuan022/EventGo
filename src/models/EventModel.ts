export interface EventModel {
  position: Position
  _id: string
  title: string
  description: string
  location: string
  images: any[]
  photoUrl: string
  startTime: Date
  endTime: Date
  organizer: Organizer
  category: string
  attendees: Attendee[]
  totalTickets: number
  ticketTypes: TicketType[]
  __v: number
}

export interface Position {
  type: string
  coordinates: number[]
}

export interface Organizer {
  _id: string
  name: string
  photo: string
}

export interface Attendee {
  _id: string
  name: string
  photo: string
  followers: any[]
}

export interface TicketType {
  typeTicket: string
  price: number
  _id: string
}
