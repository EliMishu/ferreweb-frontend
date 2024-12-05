import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-producto-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-edit.component.html',
  styleUrl: './producto-edit.component.css'
})
export class ProductoEditComponent {

}
