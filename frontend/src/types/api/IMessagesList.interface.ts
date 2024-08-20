export interface IMessagesListItem {
  _id: string;
  text: string | null;
  attachment: string | null;
  data: Date;
  user: {
    _id: string;
    username: string;
  };
}
