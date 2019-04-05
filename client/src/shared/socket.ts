import * as io from 'socket.io-client';
import LoggerService from "./logger";
import { Constants } from './constants';

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
    log: LoggerService = LoggerService.getInstance();
    connect(callback?)
    {
        this.io = io(Constants.Instance.BaseURL, {forcenew: true, path: Constants.Instance.EndPoints.GetStreamSocket});
        
        this.io.on("connect", (e)=>{
            this.log.debug("socket connected");
            callback();
        });
    }

    emitEvent(event: string, payload?)
    {
        if(this.io)
        {
            this.io.emit(event, payload);
        }
    }

    registerEvent(event: string, callback)
    {
        if(this.io)
        {
            this.io.on(event, callback);
        }
    }

    unregisterEvent(event: string)
    {
        if(this.io)
        {
            this.io.off(event);
        }
    }

}