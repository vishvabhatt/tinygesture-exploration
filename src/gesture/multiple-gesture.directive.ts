import { Directive, ElementRef } from '@angular/core';
import TinyGesture, { Options } from 'tinygesture';

@Directive({
  selector: '[appMultipleGesture]'
})
export class MultipleGestureDirective {

  // Options object is optional. These are the defaults.
  private options: Partial<Options<HTMLElement>> = {
    // Used to calculate the threshold to consider a movement a swipe. it is
    // passed type of 'x' or 'y'.
    threshold: (type, self) =>
      Math.max(
        25,
        Math.floor(
          0.15 *
          (type === 'x'
            ? window.innerWidth || document.body.clientWidth
            : window.innerHeight || document.body.clientHeight),
        ),
      ),
    // Minimum velocity the gesture must be moving when the gesture ends to be
    // considered a swipe.
    velocityThreshold: 10,
    // Used to calculate the distance threshold to ignore the gestures velocity
    // and always consider it a swipe.
    disregardVelocityThreshold: (type, self) =>
      Math.floor(0.5 * (type === 'x' ? self.element.clientWidth : self.element.clientHeight)),
    // Point at which the pointer moved too much to consider it a tap or longpress
    // gesture.
    pressThreshold: 8,
    // If true, swiping in a diagonal direction will fire both a horizontal and a
    // vertical swipe.
    // If false, whichever direction the pointer moved more will be the only swipe
    // fired.
    diagonalSwipes: false,
    // The degree limit to consider a diagonal swipe when diagonalSwipes is true.
    // It's calculated as 45deg±diagonalLimit.
    diagonalLimit: 15,
    // Listen to mouse events in addition to touch events. (For desktop support.)
    mouseSupport: true,
  };

  private targetedHTMLElement: HTMLElement

  constructor(elementRef:ElementRef) {
    this.targetedHTMLElement = elementRef.nativeElement as HTMLElement;
    const gesture = new TinyGesture(this.targetedHTMLElement, this.options);
    console.log('TinyGesture Initiated with targeted element and default options', gesture)
  }

}
