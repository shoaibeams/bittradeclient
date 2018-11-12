import { Injectable } from '@angular/core';

@Injectable()

export class ConfirmationBoxService {

    constructor() {
    }

    public displayMessage(message:string):void{
        alert(message);
    }

}