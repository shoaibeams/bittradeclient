import { trigger, transition, useAnimation } from '@angular/animations';
import { bounce } from 'ng-animate';
import { Component } from '@angular/core';
 
@Component({
  selector: 'my-component',
  templateUrl: 'my-component.component.html',
  animations: [
    trigger('bounce', [transition('show => hide', useAnimation(bounce))])
  ],
})
export class MyComponent {
  bounce: boolean =false;
  divclicked()
  {
      this.bounce = !this.bounce;
  }
}