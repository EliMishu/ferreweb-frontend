import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDetailComponent } from './venta-detail.component';

describe('VentaDetailComponent', () => {
  let component: VentaDetailComponent;
  let fixture: ComponentFixture<VentaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
