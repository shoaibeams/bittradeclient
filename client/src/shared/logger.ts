
export default class LoggerService {

    private static _instance: LoggerService;
    public static getInstance() {
        if (!this._instance) {
            this._instance = new LoggerService();
        }
        return this._instance;
    }
    constructor() {
        
    }

    static get Instance():LoggerService { return this.getInstance(); }

    debug(data: any, error?: any, ...args) {
        if (!global.isDev) {
            return;
        }
        let message: string;
        if (typeof data == 'string') {
            try {
                message = JSON.parse(data);
            }
            catch (error) {
                message = data;
            }
        }
        else {
            message = data;
        }
        if (error) {
            console.error(message, error, ...args);
        }
        else {
            console.log(message, ...args);
        }
    }

    error(error?: any, ...args) {
        if (!global.isDev) {
            return;
        }
        console.error(error, ...args);
    }

    info(message: any, ...args) {
        console.log(message, ...args);
    }

}