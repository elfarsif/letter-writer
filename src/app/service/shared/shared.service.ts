import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  // BehaviorSubject is used to track the current value and emit changes to subscribers
  private dataSubject = new BehaviorSubject<string>('');
  // Observable that components will subscribe to
  data$ = this.dataSubject.asObservable();
  // Function to update the value
  setData(newValue: string) {
    this.dataSubject.next(newValue);
  }

  //MP information
  private name = new BehaviorSubject<string>('');
  // Observable that components will subscribe to
  name$ = this.dataSubject.asObservable();
  // Function to update the value
  setName(newValue: string) {
    this.dataSubject.next(newValue);
  }
}
