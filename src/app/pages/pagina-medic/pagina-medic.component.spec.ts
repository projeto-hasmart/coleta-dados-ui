import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicComponent } from './pagina-medic.component';

describe('PaginaMedicComponent', () => {
  let component: PaginaMedicComponent;
  let fixture: ComponentFixture<PaginaMedicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
