import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appPan]',
})
export class PanDirective extends MultipleGestures {
  private animationFrame: number | undefined = undefined;
  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  override handleGestures(): void {
    // Don't allow the page to scroll when the target is first pressed.
    this.addTransition('opacity .3s ease');
    this.gesture.on('panstart', () => {
      // Remove left and top transitions so the target updates its position immediately.
      this.removeTransition('left');
      this.removeTransition('top');
    });

    this.gesture.on('panmove', () => {
      if (this.animationFrame) {
        return;
      }
      this.animationFrame = window.requestAnimationFrame(() => {
        if (this.gesture.scale && this.gesture.swipingDirection)
          if (this.gesture.scale <= 1.1 && this.gesture.scale >= 0.9) {
            // Give an indication of whether we've passed the swiping threshold.
            if (!this.gesture.swipingDirection.startsWith('pre-')) {
              this.targetedHTMLElement.style.opacity = '0.7';
            } else {
              this.targetedHTMLElement.style.opacity = '1';
            }
          }
        // Update the location to under the user's finger/mouse.
        this.targetedHTMLElement.style.left = this.gesture.touchMoveX + 'px';
        this.targetedHTMLElement.style.top = this.gesture.touchMoveY + 'px';
        this.animationFrame = undefined;
      });
    });

    this.gesture.on('panend', () => {
      this.animationFrame == undefined ||
        window.cancelAnimationFrame(this.animationFrame);
      this.animationFrame = undefined;
      // Set left and top transitions so we smoothly animate back to the target's origin.
      this.addTransition('left .3s ease');
      this.addTransition('top .3s ease');
      // Reset all the styles.
      this.targetedHTMLElement.style.left = '0px';
      this.targetedHTMLElement.style.top = '0px';
      this.targetedHTMLElement.style.opacity = '1';
    });
  }
}
