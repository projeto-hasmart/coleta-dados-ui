import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicamentosComponent } from './pagina-medicamentos.component';

describe('PaginaMedicamentosComponent', () => {
  let component: PaginaMedicamentosComponent;
  let fixture: ComponentFixture<PaginaMedicamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
