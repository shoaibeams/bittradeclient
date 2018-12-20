import * as socketIO from 'socket.io-client';
import { Injectable } from '@angular/core';
import { GlobalsService } from 'src/services/globals.service';
import { Constants } from 'src/shared/constants';
import { SocketMessage } from 'src/models/socket-message';
import * as Promise from 'bluebird';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import * as SocketEnums from 'src/enums/socket';
import { LoggerService } from './logger.service';

@Injectable()

export class SocketService {
    private socket;
    constructor(private log: LoggerService) {

    }

    public initSocket(): void {
        this.socket = socketIO(Constants.Instance.BaseURL);
    }

    public send(message: SocketMessage): void {
        this.socket.emit('message', message);
    }

    public onMessage(): Observable<SocketMessage> {
        return new Observable<SocketMessage>(observer => {
            this.socket.on('message', (data: SocketMessage) => {
                observer.next(data);
            });
        });
    }

    public onEvent(event: SocketEnums.Event): Observable<SocketEnums.Event> {
        return new Observable<SocketEnums.Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

}