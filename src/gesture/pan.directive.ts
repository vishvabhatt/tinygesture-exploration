import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appPan]',
})
export class PanDirective extends MultipleGestures {
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
