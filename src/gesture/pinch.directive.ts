import { Directive, ElementRef } from '@angular/core';
import { MultipleGestures } from './multiple.gestures';

@Directive({
  selector: '[appPinch]',
})
export class PinchDirective extends MultipleGestures {
  private backTimeout: any;
  private scale = 1;
  private origin: number[] = [];
  private myTransform: string = '';

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
  public override handleGestures(): void {
    console.log('Override-HandleGestures');
    this.addTransition('transform .5s ease');
    this.addTransition('transform-origin .5s ease');
    this.targetedHTMLElement.style.transform = '';

    // When the target is pinched, scale it to the right size.
    this.gesture.on('pinch', () => {
      this.scale = this.gesture.scale ?? 1;
      if (this.origin.length === 0 && this.gesture.touchMove1) {
        const box = this.targetedHTMLElement.getBoundingClientRect();
        this.origin = [
          this.gesture.touchMove1.clientX - box.x,
          this.gesture.touchMove1.clientY - box.y,
        ];

        this.targetedHTMLElement.style.transformOrigin = `${origin[0]}px ${origin[1]}px`;
      }
      this.resetTransform();
      this.removeTransition('transform');
      this.removeTransition('transform-origin');
      this.targetedHTMLElement.style.transform =
        `${this.targetedHTMLElement.style.transform}` + this.myTransform;
    });

    // When the target is pinched, scale it to the right size.
    this.gesture.on('pinchend', () => {
      this.scale = this.gesture.scale ?? 1;
      this.origin = [];
      this.addTransition('transform .5s ease');
      this.addTransition('transform-origin .5s ease');
      this.targetedHTMLElement.style.transformOrigin = 'center';
      clearTimeout(this.backTimeout);
      this.backTimeout = setTimeout(() => {
        this.scale = 0;
        this.resetTransform();
      }, 1000);
    });
  }

  private resetTransform() {
    this.targetedHTMLElement.style.transform =
      `${this.targetedHTMLElement.style.transform}`.replace(
        /\s*scale\([^)]*\)/,
        ''
      );
    this.myTransform = ` scale(${this.scale})`;
  }
}
