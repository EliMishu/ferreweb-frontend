import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmGeneralDashboardComponent } from './adm-general-dashboard.component';

describe('AdmGeneralDashboardComponent', () => {
  let component: AdmGeneralDashboardComponent;
  let fixture: ComponentFixture<AdmGeneralDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdmGeneralDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdmGeneralDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
