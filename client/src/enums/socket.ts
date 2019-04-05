export enum SocketActions{
    JOINED,
    LEFT,
    RENAME,
}
export enum SocketEvents{
    CONNECT = 'connect',
    DISCONNECT = 'disconnect',
}
export enum SocketMessageTypes{
    CHAT = 'chat',
    NOTIFICATION = 'notification',
}