import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appSwipe]',
})
export class SwipeDirective extends MultipleGestures {
  private goRaf = 0;
  private backTimeout: any;
  private xpos = 0;
  private ypos = 0;
  private myTransform = ` translateX(${this.xpos}px) translateY(${this.ypos}px)`;
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
  public override handleGestures(): void {
    this.addTransition('transform .5s ease');
    this.targetedHTMLElement.style.transform = '';

    // When the target is swiped, fling it really far in that direction before coming back to origin.
    this.gesture.on('swiperight', () => {
      console.log('swiperight');
      if (
        this.gesture.scale &&
        (this.gesture.scale > 1.1 || this.gesture.scale < 0.9)
      ) {
        return;
      }
      this.xpos = 2000;
      this.resetTransform();
      cancelAnimationFrame(this.goRaf);
      this.goRaf = requestAnimationFrame(this.doTransform);
    });
    this.gesture.on('swipeleft', () => {
      console.log('swipeleft');
      if (
        this.gesture.scale &&
        (this.gesture.scale > 1.1 || this.gesture.scale < 0.9)
      ) {
        return;
      }
      this.xpos = -2000;
      this.resetTransform();
      cancelAnimationFrame(this.goRaf);
      this.goRaf = requestAnimationFrame(this.doTransform);
    });
  }

  private resetTransform() {
    this.targetedHTMLElement.style.transform =
      `${this.targetedHTMLElement.style.transform}`.replace(
        /\s*translateX\([^)]*\)/,
        ''
      );
    this.targetedHTMLElement.style.transform =
      `${this.targetedHTMLElement.style.transform}`.replace(
        /\s*translateY\([^)]*\)/,
        ''
      );
    this.myTransform = ` translateX(${this.xpos}px) translateY(${this.ypos}px)`;
  }

  private doTransform() {
    this.targetedHTMLElement.style.transform =
      `${this.targetedHTMLElement.style.transform}` + this.myTransform;
    clearTimeout(this.backTimeout);
    this.backTimeout = setTimeout(() => {
      this.xpos = 0;
      this.ypos = 0;
      this.resetTransform();
    }, 1000);
  }
}
