export interface NotificationModel {
  _id: string;
  title: string;
  body: string;
  createdAt: Date;
  isRead: boolean;
  type: string;
  userId: string;
}