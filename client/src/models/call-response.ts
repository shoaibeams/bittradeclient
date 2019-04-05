
export class mdCallResponse
{
    constructor()
    {
        this.isSuccess = false;
        this.message = "";
        this.extras = {};
    }
    public isSuccess: boolean;
    public message: string;
    public extras: any;
}