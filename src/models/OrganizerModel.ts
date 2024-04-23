export interface OrganizerModel {
  _id: string
  name: string
  organizationName: string
  organizationAddress: string
  email: string
  password: string
  followers: any[]
  fcmTokens: string[]
  createdAt: string
  updatedAt: string
  about: string
  __v: number
  photo: string
}
