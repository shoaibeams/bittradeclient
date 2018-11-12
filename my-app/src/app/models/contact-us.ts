
export class mdContactUs{
    public name: string;
    public contact_no: string;
    public email: string;
    public message: string;
    public uuid: string;

    constructor(init?: boolean)
    {
        if(init === true)
        {
        this.name = "";
        this.contact_no = "";
        this.email = "";
        this.message = "";
        this.uuid = "";
        }
    }
}

export class ContactUsMetaData
{
    public static nameMaxLength: number = 50;
    public static contactNoMaxLength: number = 15;
    public static emailMaxLength: number = 50;
    public static messageMaxLength: number = 500;
    public static messageMinLength: number = 60;
    public static uuidMaxLength: number = 50;
}
