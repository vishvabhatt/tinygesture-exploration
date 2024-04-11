import { NgModule } from '@angular/core';
import { PanDirective } from './pan.directive';
import { SwipeDirective } from './swipe.directive';
import { PinchDirective } from './pinch.directive';

@NgModule({
  declarations: [PanDirective, SwipeDirective, PinchDirective],
  imports: [],
  exports: [PanDirective, SwipeDirective, PinchDirective],
})
export class GestureModule {}
