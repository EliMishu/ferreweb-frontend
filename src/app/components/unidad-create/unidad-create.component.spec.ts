import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadCreateComponent } from './unidad-create.component';

describe('UnidadCreateComponent', () => {
  let component: UnidadCreateComponent;
  let fixture: ComponentFixture<UnidadCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnidadCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
