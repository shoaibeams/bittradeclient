import { SocketMessageTypes, SocketActions } from "../enums/socket";

export class SocketMessage{
    username: string;
    messageType: SocketMessageTypes;
    content: any;
    action: SocketActions;
    constructor(_username: string, _messageType: SocketMessageTypes, 
        _content: any, _action?: SocketActions)
    {
        this.username = _username;
        this.messageType = _messageType;
        this.content = _content;
        this.action = _action;
    }
}