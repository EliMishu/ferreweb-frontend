import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<string>();
  alertState$ = this.alertSubject.asObservable();

  show(message: string) {
    this.alertSubject.next(message);
  }
}