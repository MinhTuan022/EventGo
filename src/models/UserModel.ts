export interface UserModel {
  followers: Follower[]
  _id: string
  name: string
  firstname: string
  lastname: string
  email: string
  photo: string
  createdAt: string
  updateAt: string
  __v: number
  events: Event[]
  following: Following[]
}

export interface Follower {
  _id: string
  email: string
  name: string
}

export interface Event {
  _id: string
  title: string
  description: string
  location: string
  images: any[]
  photoUrl: string
  startTime: string
  endTime: string
  organizer: string
  attendees: any[]
  tickets: any[]
  __v: number
}

export interface Following {
  _id: string
  email: string
  name: string
}
