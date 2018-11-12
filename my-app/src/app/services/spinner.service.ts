import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinner:NgxSpinnerService) { }

  show()
  {
    this.spinner.show();
  }

  hide()
  {
    this.spinner.hide();
  }

  showAndAutoHide(timeInSeconds:number)
  {
    this.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.hide();
    }, timeInSeconds * 1000);
  }

}
