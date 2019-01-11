import * as SocketEnums from "../enums/socket";

export class SocketMessage{
    username: string;
    messageType: SocketEnums.MessageType;
    content: any;
    action: SocketEnums.Action;
    constructor(_username: string, _messageType: SocketEnums.MessageType, 
        _content: any, _action?: SocketEnums.Action)
    {
        this.username = _username;
        this.messageType = _messageType;
        this.content = _content;
        this.action = _action;
    }
}