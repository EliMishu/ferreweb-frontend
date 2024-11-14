import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloGestionComponent } from './modulo-gestion.component';

describe('ModuloGestionComponent', () => {
  let component: ModuloGestionComponent;
  let fixture: ComponentFixture<ModuloGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuloGestionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
