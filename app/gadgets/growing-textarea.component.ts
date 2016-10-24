import { Component, Input, OnInit, forwardRef, ElementRef, AfterViewInit, ViewChild, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'growing-textarea',
  template:
  `
    <textarea #textfield (keyup)="grow()" class="growing-textarea" [(ngModel)]="value"></textarea>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrowingTextareaComponent),
      multi: true
    }
  ]
})
export class GrowingTextareaComponent implements AfterViewInit{
   @ViewChild('textfield') textarea: ElementRef;

  //default callbacks which do nothing (they are being replaced when
  //  someone binds a value to ngModel)
  private propagateChange: (value: any) => void = (value) => {};
  private propagateTouch: (value: any) => void = (value) => {};

  private _value: string = "";
  private isViewInitialized: boolean = false;

  constructor(
    private renderer: Renderer
  ){}

  ngAfterViewInit() {
    this.isViewInitialized = true;
  }

  get value(){
    return this._value;
  }

  set value(value: any){
    if (value !== this._value) {
      this._value = value;
      this.propagateChange(value);
    }
  }

  grow(){
    let ta = this.textarea.nativeElement;
    if(ta.scrollHeight > ta.clientHeight){
      ta.style.height = ta.scrollHeight + "px";
    }
  }

  /* ngModel (ControlValueAccessor) */
  writeValue(value: any) : void {
    this._value = value;
    if(this.isViewInitialized == true){
      this.grow();
    }
  }

  registerOnChange(fn: any) : void {
    this.propagateChange = fn;
  }

  setDisabledState(isDisabled: boolean) : void {

  }

  registerOnTouched(fn: any) {
      this.propagateTouch = fn;
  }

}
