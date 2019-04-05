export class mdAnimControl{
  value: any;
  name: string;
  continousAnim: boolean;
  constructor(_value?, _name?, _continousAnim: boolean = false)
  {
      this.value = _value;
      this.name = _name;
      this.continousAnim = _continousAnim;
  }
}