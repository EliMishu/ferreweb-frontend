import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmacenListComponent } from './almacen-list.component';

describe('AlmacenListComponent', () => {
  let component: AlmacenListComponent;
  let fixture: ComponentFixture<AlmacenListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlmacenListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlmacenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
