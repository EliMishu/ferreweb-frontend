import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPresencialCreateComponent } from './venta-presencial-create.component';

describe('VentaPresencialCreateComponent', () => {
  let component: VentaPresencialCreateComponent;
  let fixture: ComponentFixture<VentaPresencialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaPresencialCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaPresencialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
