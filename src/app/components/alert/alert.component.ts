import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent implements OnInit {
  message: string | null = null;
  fading: boolean = false;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void {
    this.alertService.alertState$.subscribe(message => {
      this.message = message;
      this.fading = false;

      setTimeout(() => {
        this.fading = true;
        setTimeout(() => {
          this.message = null; 
        }, 500);
      }, 3000);
    });
  }
}