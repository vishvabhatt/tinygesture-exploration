import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective extends MultipleGestures {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
