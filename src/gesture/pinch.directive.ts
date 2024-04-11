import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appPinch]',
})
export class PinchDirective extends MultipleGestures {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
