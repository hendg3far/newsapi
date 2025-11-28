import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClampText]',
  standalone: true
})
export class ClampTextDirective {
  @Input('appClampText') lines: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    if (!this.lines) return;

    this.renderer.setStyle(this.el.nativeElement, 'display', '-webkit-box');
    this.renderer.setStyle(this.el.nativeElement, '-webkit-box-orient', 'vertical');
    this.renderer.setStyle(this.el.nativeElement, 'overflow', 'hidden');

    this.renderer.setStyle(this.el.nativeElement, 'height', `calc(${this.lines} * 1.2em)`);
    this.renderer.setStyle(this.el.nativeElement, '-webkit-line-clamp', String(this.lines));
  }

}
