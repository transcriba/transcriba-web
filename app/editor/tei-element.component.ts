import { Component, Input, OnInit, forwardRef, EventEmitter, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { TeiBase } from './tei-base';
import { TeiElement } from './tei-element';

import { EditorService } from './editor.service';


@Component({
  moduleId:     module.id,
  selector: 'tr-tei-element',
  templateUrl: 'tei-element.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TeiElementComponent),
      multi: true
    }
  ]
})
export class TeiElementComponent extends TeiBase implements OnInit {
  @Input() index: number;
  @Input() markDirty: boolean;
  @Input() editable: boolean;
  @Output() killMe: EventEmitter<any> = new EventEmitter();


  value: any;
  mode  = 'default';

  constructor(
    private docs: EditorService
  ) {
    super();
  }

  ngOnInit() {
    if (this.tei.isDirty) {
      console.log('mark element of type:' + this.tei.type + ' as dirty');
    }
  }

  delete() {
    this.killMe.emit(this.index);
  }

  deleteChild(index) {
    this.tei.children = this.tei.children.filter(
      (_, i) => index !== i
    );
  }

  focus() {
    this.docs.setFocusedElement(this);
    this.tei.isFocused = true;
  }

  unfocus() {
    this.tei.isFocused = false;
  }

  saveChanges() {
    if (this.tei.properties.value !== this.value) {
      this.tei.isDirty = true;
      this.tei.properties.value = this.value;
    }
  }

  textChange(event) {
    this.value = event.target.innerText;
  }

  addLine() {
    let defaultTextPart = new TeiElement('textPartOrdinary', { value: 'Text' }, []);
    this.tei.children.push(new TeiElement('line', {}, [defaultTextPart]));
  }

  addParagraph() {
    let defaultTextPart = new TeiElement('textPartOrdinary', { value: 'Text' }, []);
    let defaultLinePart = new TeiElement('line', {}, [defaultTextPart]);

    this.tei.children.push(new TeiElement('paragraph', {}, [defaultLinePart], true));
  }

  addHeading() {
    let defaultTextPart = new TeiElement('textPartOrdinary', { value: 'Text' }, [], true);

    this.tei.children.push(new TeiElement('heading', {}, [defaultTextPart]));
  }

  editText() {
    this.mode = 'edit';
    this.value = this.toText();
  }

  showText() {
    let lineStrings: Array<string> = this.value.trim().split('\n');
    lineStrings = lineStrings.filter(
      line =>  line.trim() !== ''
    );
    this.value = ''; // empty value

    this.tei.children = lineStrings.map(
      (lineString) => new TeiElement('line', {}, [
        new TeiElement('textPartOrdinary', { value: lineString }, [])
      ])
    );
    this.mode = 'default';
  }

  showHeading() {
    let lineString: string = this.value.trim();
    this.value = ''; // empty value

    this.tei.children = [
      new TeiElement('textPartOrdinary', { value: lineString }, [])
    ] ;
    this.mode = 'default';
  }

  editHeading() {
    this.mode = 'edit';
    this.value = this.toText();
  }

  toText(tei?: any) {
    let text = '';

    if (tei === undefined) {
      tei = this.tei;
    }

    if (['line', 'heading'].indexOf(tei.type) !== -1) {
      tei.children.forEach(
        (childTei) => text += childTei.properties.value
      );
    }else if (tei.type === 'paragraph') {
      tei.children.forEach(
        el => text += this.toText(el) + '\n'
      );
    }

    return text;
  }

}
