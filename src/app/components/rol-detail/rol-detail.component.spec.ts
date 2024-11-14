import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolDetailComponent } from './rol-detail.component';

describe('RolDetailComponent', () => {
  let component: RolDetailComponent;
  let fixture: ComponentFixture<RolDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RolDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RolDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
