export class mdTableSettings
{
    attr?:any;
    rowClassFunction?:Function;
    columns:any;
}

export class mdTableColumn{
    title:string;
    valuePrepareFunction: (value: any, index: number, row: any)=>{};
}