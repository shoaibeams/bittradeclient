export enum SocketActions {
  JOINED,
  LEFT,
  RENAME
}
export enum SocketEvents {
  CONNECT = "connect",
  DISCONNECT = "disconnect",
  RegisterEvent = "register_event",
  UnRegisterEvent = "unregister_event"
}
export enum SocketMessageTypes {
  CHAT = "chat",
  NOTIFICATION = "notification"
}
export enum SocketCustomEvents {
  AwaitingEmailVerification = "AwaitingEmailVerification",
  AwaitingPasswordRecovery = "AwaitingPasswordRecovery",
  ReceivedBalance = "AwaitNewBalance",

  SubscribeToBriefRecentHistory = "SubscribeToBriefRecentHistory",
  SubscribeToTrades = "SubscribeToTrades"
}
