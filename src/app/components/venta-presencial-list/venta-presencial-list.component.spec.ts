import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPresencialListComponent } from './venta-presencial-list.component';

describe('VentaPresencialListComponent', () => {
  let component: VentaPresencialListComponent;
  let fixture: ComponentFixture<VentaPresencialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaPresencialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaPresencialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
