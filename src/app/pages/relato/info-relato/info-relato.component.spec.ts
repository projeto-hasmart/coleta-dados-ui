import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRelatoComponent } from './info-relato.component';

describe('InfoRelatoComponent', () => {
  let component: InfoRelatoComponent;
  let fixture: ComponentFixture<InfoRelatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoRelatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoRelatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
