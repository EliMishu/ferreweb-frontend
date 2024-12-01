import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private toasts: Toast[] = [];
  private toastSubject = new Subject<Toast[]>();

  getToasts(): Observable<Toast[]> {
    return this.toastSubject.asObservable();
  }

  showError(message: string) {
    const toast: Toast = {type: ToastType.Danger, title: "Error", message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }
  
  showErrorWithTitle(title:string, message: string) {
    const toast: Toast = {type: ToastType.Danger, title, message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 10000);
  }

  showWarning(message: string) {
    const toast: Toast = {type: ToastType.Warning, title: "Warning", message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }
  
  showWarningWithTitle(title:string, message: string) {
    const toast: Toast = {type: ToastType.Warning, title, message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }

  showInfo(message: string) {
    const toast: Toast = {type: ToastType.Info, title: "Info", message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }
  
  showInfoWithTitle(title:string, message: string) {
    const toast: Toast = {type: ToastType.Info, title, message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }

  showSuccess(message: string) {
    const toast: Toast = {type: ToastType.Success, title: "Success", message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }
  
  showSuccessWithTitle(title:string, message: string) {
    const toast: Toast = {type: ToastType.Success, title, message};
    this.addToast(toast);
    this.toastSubject.next((this.toasts));

    setTimeout(() => this.removeToast(toast), 5000);
  }

  addToast(toast: Toast):void {
    this.toasts = [...this.toasts, toast];
  }

  removeToast(toast: Toast): void {
    this.toasts = this.toasts.filter(t => t !== toast);
    this.toastSubject.next(this.toasts);
  }
}

export enum ToastType {
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info'
}

export interface Toast {
  type: ToastType;
  title: string;
  message: string;
}