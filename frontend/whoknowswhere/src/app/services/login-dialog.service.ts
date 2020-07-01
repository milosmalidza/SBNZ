import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginDialogService {

  private subject: Subject<any> = new Subject<any>();

  constructor() { }

  sendData(data: any): void {
    this.subject.next(data);
  }

  receiveData(): Observable<any> {
    return this.subject.asObservable();
  }
}
