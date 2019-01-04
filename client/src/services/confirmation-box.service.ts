import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})

export class ConfirmationBoxService {

    constructor() {
    }

    public displayMessage(message:string):void{
        alert(message);
    }

}