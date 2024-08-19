export interface IRoomListItemParticipants {
  _id: string;
  username: string;
}

export interface IRoomListItem {
  _id: string;
  name: string,
  participants: IRoomListItemParticipants[],
}
