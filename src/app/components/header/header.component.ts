import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnChanges {
  isAuth: boolean = false;
  rol: string = "ADMIN";

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticated();
  }

  ngOnChanges(changes: SimpleChanges): void {
    
    throw new Error('Method not implemented.');
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  getRol(): string {
    return "ADMIN";
  }

  logout(): void {
    this.authService.logout();
    this.isAuth = false;
  }
}
