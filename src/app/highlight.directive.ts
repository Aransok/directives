import {
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
type MyVoid = () => void;
@Directive({
  selector: '[appHighlight]',
})
/**
 * Directive that listens for mouseenter and mouseleave events
 * on the host element. When mouseenter fires, set background
 * style to initial. When mouseleave fires, set background
 * style to lightblue. Uses Renderer2 for DOM manipulation.
 */
export class HighlightDirective implements OnInit, OnDestroy {
  //@HostListener('mouseover', ['$event']) mouseOverHandler(e: MouseEvent): void {
  //console.log('mouseOverHandler');
  //}
  unsubFromEventsArray: MyVoid[] = [];
  constructor(private elRef: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    //console.log(this.elRef);
    //this.elRef.nativeElement.style.backgroundColor = 'lightblue';
    //this.renderer.setStyle(this.elRef.nativeElement, 'background', 'red');
    const MouseEnterEvent = this.renderer.listen(
      this.elRef.nativeElement,
      'mouseenter',
      this.mouseEnterHandler.bind(this)
    );
    const MouseLeaveEvent = this.renderer.listen(
      this.elRef.nativeElement,
      'mouseleave',
      this.mouseLeaveHandler.bind(this)
    );
    this.unsubFromEventsArray.push(MouseEnterEvent);
    this.unsubFromEventsArray.push(MouseLeaveEvent);
  }
  mouseEnterHandler(e: MouseEvent): void {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'initial'
    );
    this.renderer.addClass(this.elRef.nativeElement, 'highlight');
  }
  mouseLeaveHandler(e: MouseEvent): void {
    this.renderer.setStyle(
      this.elRef.nativeElement,
      'background-color',
      'lightblue'
    );
    this.renderer.removeClass(this.elRef.nativeElement, 'highlight');
  }
  ngOnDestroy(): void {
    console.log('ngOnDestroy invoked', this.unsubFromEventsArray);
    this.unsubFromEventsArray.forEach((fn) => fn());
  }
}
