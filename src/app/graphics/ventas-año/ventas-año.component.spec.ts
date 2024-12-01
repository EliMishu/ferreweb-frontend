import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasAñoComponent } from './ventas-año.component';

describe('VentasMesComponent', () => {
  let component: VentasAñoComponent;
  let fixture: ComponentFixture<VentasAñoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasAñoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentasAñoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
