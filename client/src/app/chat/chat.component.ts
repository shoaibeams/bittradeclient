import { Component, OnInit } from '@angular/core';

import * as SocketEnums from '../../enums/socket';
import { SocketMessage } from '../../models/socket-message';
import { SocketService } from '../../services/socket.service';
import { LoggerService } from '../../services/logger.service';
import { GlobalsService } from 'src/services/globals.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
    selector: 'tcc-chat',
    templateUrl: './chat.component.html',
})

export class ChatComponent implements OnInit {
    messages: SocketMessage[] = [];
    messageContent: string;
    ioConnection: any;
    form: FormGroup;

    constructor(private socketService: SocketService,
        private globals: GlobalsService,
        private log: LoggerService,
        private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            message: [
                ""
            ],
        });
        this.initIoConnection();
    }

    private initIoConnection(): void {
        this.socketService.initSocket();

        this.ioConnection = this.socketService.onMessage()
            .subscribe((message: SocketMessage) => {
                this.messages.push(message);
            });

        this.socketService.onEvent(SocketEnums.Event.CONNECT)
            .subscribe((data: SocketEnums.Event) => {
                this.log.info(SocketEnums.Event.CONNECT, data);
            });

        this.socketService.onEvent(SocketEnums.Event.DISCONNECT)
            .subscribe((data: SocketEnums.Event) => {
                this.log.info(SocketEnums.Event.CONNECT, data);
            });
    }

    get f() { return this.form.controls; }

    send() {
        this.sendMessage(this.form.controls.message.value);
    }

    public sendMessage(message: string): void {
        if (!message) {
            return;
        }

        this.socketService.send(new SocketMessage(this.globals.username, SocketEnums.MessageType.CHAT, message));
        this.messageContent = null;
    }

    public sendNotification(params: any, action: SocketEnums.Action): void {
        let message: SocketMessage;

        if (action === SocketEnums.Action.JOINED) {
            message = new SocketMessage(this.globals.username, SocketEnums.MessageType.NOTIFICATION,
                this.globals.username + " " + SocketEnums.Action.JOINED, action);
        } else if (action === SocketEnums.Action.RENAME) {
            message = new SocketMessage(this.globals.username, SocketEnums.MessageType.NOTIFICATION,
                this.globals.username + " " + action, action);
        }

        this.socketService.send(message);
    }
}