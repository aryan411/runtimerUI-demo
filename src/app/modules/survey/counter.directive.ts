import { Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[counterOf]'
})
export class CounterDirective implements OnChanges
{
  @Input('counterOf')
  counter!: number;
  constructor(
    private viewContainer: ViewContainerRef,
    private template: TemplateRef<any>) { }
  ngOnChanges(changes: SimpleChanges): void
  {
    this.viewContainer.clear();
    for (let index = 0; index < this.counter; index++)
    {
      this.viewContainer.createEmbeddedView(this.template, new CounterDirectiveContext(index + 1));
    }
  }
}
class CounterDirectiveContext
{
  constructor(public $implicit: any) {}
}
