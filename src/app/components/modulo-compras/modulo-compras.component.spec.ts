import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloComprasComponent } from './modulo-compras.component';

describe('ModuloComprasComponent', () => {
  let component: ModuloComprasComponent;
  let fixture: ComponentFixture<ModuloComprasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloComprasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuloComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
