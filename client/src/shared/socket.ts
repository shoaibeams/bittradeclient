import * as io from "socket.io-client";
import LoggerService from "./logger";
import { Constants } from "./constants";
import { mdRegisterSocketEvent } from "../models/register-socket-event";
import { SocketCustomEvents, SocketEvents } from "../enums/socket";

export default class Socket {
  private static _instance: Socket;
  private constructor() {}
  static get Instance(): Socket {
    if (!this._instance) {
      this._instance = new Socket();
    }
    return this._instance;
  }
  private io;
  RegisterEvent = "register_event";
  private prevRegisteredEvents: any[] = [];
  log: LoggerService = LoggerService.getInstance();

  connect(callback?) {
    this.io = io(Constants.Instance.BaseURL, {
      forcenew: false,
      path: Constants.Instance.EndPoints.GetStreamSocket,
      reconnection: true,
      reconnectionDelay: 3000,
      reconnectionAttempts: 20
    });
    
    this.prevRegisteredEvents.forEach(({ event, payload }) => {
      this.emitEvent(event, payload);
    });

    this.io.on(SocketEvents.CONNECT, e => {
      this.log.debug("socket connected");
      callback();
    });

    this.io.on(SocketEvents.DISCONNECT, e => {
      this.log.debug("socket disconnected");
      callback();
    });
  }

  registerEvent(event: SocketCustomEvents, callback, payload?) {
    const filteredEvent = this.prevRegisteredEvents.filter(
      m => m.event === event
    )[0];
    if (filteredEvent) {
      const index = this.prevRegisteredEvents.indexOf(filteredEvent);
      this.prevRegisteredEvents[index] = { event, callback, payload };
    } else {
      this.prevRegisteredEvents.push({ event, callback, payload });
    }

    this.log.error(
      "Previously registered events are: ",
      this.prevRegisteredEvents
    );

    if (this.io) {
      this.io.on(event, callback);
      this.emitEvent(event, payload);
    }
  }

  emitEvent(event: SocketCustomEvents, payload?: any) {
   this.log.error("Emitting event:", event)
      this.io.emit(
        this.registerEvent,
        new mdRegisterSocketEvent(event, payload)
      );
   
  }

  unregisterEvent(event: SocketCustomEvents) {
    if (this.io) {
      this.io.emit(SocketEvents.UnRegisterEvent, event);
      this.io.off(event);
    }
  }
}
