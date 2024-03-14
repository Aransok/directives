import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[appMyStructural]',
  exportAs: 'appMyStructural',
})
export class MyStructuralDirective implements OnChanges {
  @Input() appMyStructural: boolean = true;
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {
    console.log(templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes', this.appMyStructural);
    if (this.appMyStructural) {
      this.vcRef.createEmbeddedView(
        this.templateRef,
        //context
        {MyCustomValue: 'yeet'}
              );
    } else {
      this.vcRef.clear();
    }
  }
}
