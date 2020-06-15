import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicaoSucessoComponent } from './pagina-medicao-sucesso.component';

describe('PaginaMedicaoSucessoComponent', () => {
  let component: PaginaMedicaoSucessoComponent;
  let fixture: ComponentFixture<PaginaMedicaoSucessoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicaoSucessoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicaoSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
