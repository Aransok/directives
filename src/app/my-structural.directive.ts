import {
  Directive,
  Input,
  OnChanges,
  OnInit,
  Optional,
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
  @Input() myTmpRef: TemplateRef<any> | undefined;
  constructor(
    @Optional() private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef
  ) {
    console.log(templateRef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('On changes', this.appMyStructural);
    const template = this.templateRef || this.myTmpRef;
    if (this.appMyStructural) {
      this.vcRef.createEmbeddedView(
        template,
        //context
        { MyCustomValue: 'yeet' }
      );
    } else {
      this.vcRef.clear();
    }
  }
}
