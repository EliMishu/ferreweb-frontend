import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraCreateComponent } from './orden-compra-create.component';

describe('OrdenCompraCreateComponent', () => {
  let component: OrdenCompraCreateComponent;
  let fixture: ComponentFixture<OrdenCompraCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdenCompraCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrdenCompraCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
