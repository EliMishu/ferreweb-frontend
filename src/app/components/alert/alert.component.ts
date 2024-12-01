import { Component, OnInit } from '@angular/core';
import { AlertService, Toast, ToastType } from '../../services/alert.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  toasts: Toast[] = [];

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.getToasts().subscribe((toasts) => {
      this.toasts = toasts;
    });
  }

  getClassForToast(type: ToastType): string {
    switch (type) {
      case ToastType.Success:
        return 'bg-success';
      case ToastType.Danger:
        return 'bg-danger';
      case ToastType.Warning:
        return 'bg-warning';
      case ToastType.Info:
        return 'bg-info';
      default:
        return '';
    }
  }

  removeToast(toast: Toast): void {
    this.alertService.removeToast(toast);
  }
}