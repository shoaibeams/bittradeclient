
export class mdContactUs {
    public name: string;
    public contact_no: string;
    public email: string;
    public message: string;
    public uuid: string;
    public interested_in: string;
    public duration: string;
    public budget: string;
    public skype_id: string;

    constructor(init?: boolean) {
        if (init === true) {
            this.name = "";
            this.contact_no = "";
            this.email = "";
            this.message = "";
            this.uuid = "";
            this.interested_in = "";
            this.duration = "";
            this.skype_id = "";
            
            this.email = 'inaamiub@gmil.com';
            this.name = '1',
            this.contact_no = 'sf';
            this.message = '1';
        }
    }
}

export class ContactUsMetaData {
    public static nameMaxLength: number = 50;
    public static contactNoMaxLength: number = 15;
    public static emailMaxLength: number = 50;
    public static messageMaxLength: number = 500;
    public static messageMinLength: number = 60;
    public static uuidMaxLength: number = 50;
    public static skypeIdMaxLength: number = 50;
}
