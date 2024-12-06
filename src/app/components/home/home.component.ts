import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  banners = [
    'assets/images/inicio-1',
    'assets/images/inicio-2',
    'assets/images/inicio-3',
    'assets/images/inicio-4'
  ];
}
