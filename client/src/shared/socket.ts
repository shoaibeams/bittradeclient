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
  SubscribeToTimer = "subscribeToTimer";
  log: LoggerService = LoggerService.getInstance();

  connect(callback?) {
    this.io = io(Constants.Instance.BaseURL, {
      forcenew: true,
      path: Constants.Instance.EndPoints.GetStreamSocket
    });

    this.io.on(SocketEvents.CONNECT, e => {
      this.log.debug("socket connected");
      callback();
    });
  }

  emitEvent(event: SocketCustomEvents, payload?: any) {
    if (this.io) {
      this.io.emit(
        this.RegisterEvent,
        new mdRegisterSocketEvent(event, payload)
      );
    }
  }

  registerEvent(event: SocketCustomEvents, callback) {
    if (this.io) {
      this.io.on(event, callback);
    }
  }

  unregisterEvent(event: SocketCustomEvents) {
    if (this.io) {
      this.io.emit(SocketEvents.UnRegisterEvent, event);
      this.io.off(event);
    }
  }
}
