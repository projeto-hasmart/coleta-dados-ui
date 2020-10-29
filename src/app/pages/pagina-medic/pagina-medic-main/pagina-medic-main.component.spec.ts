import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicMainComponent } from './pagina-medic-main.component';

describe('PaginaMedicMainComponent', () => {
  let component: PaginaMedicMainComponent;
  let fixture: ComponentFixture<PaginaMedicMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
