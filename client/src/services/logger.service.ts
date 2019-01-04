import { Injectable } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';
import { GlobalsService } from './globals.service';

@Injectable({
    providedIn: 'root',
})

export class LoggerService {

    constructor(private globals: GlobalsService) {
    }

    debug(data: any, error?: any) {
        if (this.globals.isDev) {
            let message: string;
            if(typeof data == 'string')
            {
                try
                {
                message = JSON.parse(data);
                }
                catch(error)
                {
                    message = data;
                }
            }
            else
            {
                message = data;
            }
            if (error) {
                console.error(message, error);
            }
            else {
                console.log(message);
            }
        }
    }

    error(error?: any, ...args) {
        if (this.globals.isDev) {
            console.error(error, ...args);
        }
    }

    info(message: string, ...args) {
        console.log(message, ...args);
    }

}