import { Component } from '@angular/core';
import {
    trigger,
    state,
    style,
    animate,
    transition,
    useAnimation,
    AnimationOptions
    // ...
} from '@angular/animations';
import {
    slideInLeft,
    slideOutUp,
} from 'ng-animate';
 
@Component({
  selector: 'my-component',
  templateUrl: 'my-component.component.html',
  animations: [
      trigger('bounce', [
          transition('slideOut => slideIn', useAnimation(slideInLeft, {
              params: { timing: '3', delay: 0 }
          })),
          transition('slideIn => slideOut', useAnimation(slideOutUp, {
              params: { timing: '3', delay: 0 }
          })),
          state('slideOut', style({
              display: 'none',
          })),
          state('slideIn', style({
              display: 'block',
          }))
      ]),
  ],
//   animations: [
//     trigger('bounce', [transition('show => hide', useAnimation(bounce))])
//   ],
})
export class MyComponent {
  bounce: boolean =true;
  divclicked()
  {
      this.bounce = !this.bounce;
  }
}