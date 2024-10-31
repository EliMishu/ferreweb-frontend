import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { AlertComponent } from './components/alert/alert.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ferreweb-frontend';
}
