import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';

export enum LayoutType {
  wide,
  fixed
}

@Injectable()
export class AppService {
  public layout: Observable<LayoutType>;
  private layoutSubject: BehaviorSubject<LayoutType>;

  constructor() {
    // Initalizing Reactive Components (Observables)
    this.layoutSubject = new BehaviorSubject(LayoutType.fixed);
    this.layout = this.layoutSubject.asObservable();
  }

  setLayoutType(type: LayoutType) {
    this.layoutSubject.next(type);
  }

  resetLayout() {
    this.layoutSubject.next(LayoutType.fixed);
  }


}
