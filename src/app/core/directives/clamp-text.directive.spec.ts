import { ClampTextDirective } from './clamp-text.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('ClampTextDirective', () => {
  it('should create an instance', () => {
    const elRef = {
      nativeElement: document.createElement('div'),
    } as ElementRef;
    const renderer = {} as Renderer2;
    const directive = new ClampTextDirective(elRef, renderer);
    expect(directive).toBeTruthy();
  });
});
