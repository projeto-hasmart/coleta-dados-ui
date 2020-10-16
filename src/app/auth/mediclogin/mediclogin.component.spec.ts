import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicloginComponent } from './mediclogin.component';

describe('MedicloginComponent', () => {
  let component: MedicloginComponent;
  let fixture: ComponentFixture<MedicloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
