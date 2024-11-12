import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloProductosComponent } from './modulo-productos.component';

describe('ModuloProductosComponent', () => {
  let component: ModuloProductosComponent;
  let fixture: ComponentFixture<ModuloProductosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloProductosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
