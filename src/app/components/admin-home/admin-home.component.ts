import { Component } from '@angular/core';
import { AdmGeneralDashboardComponent } from '../adm-general-dashboard/adm-general-dashboard.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [AdmGeneralDashboardComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

}
