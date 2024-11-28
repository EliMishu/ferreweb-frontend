import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolSelectionComponent } from './rol-selection.component';

describe('RolSelectionComponent', () => {
  let component: RolSelectionComponent;
  let fixture: ComponentFixture<RolSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
