import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaDispensacaoComponent } from './pagina-dispensacao.component';

describe('PaginaDispensacaoComponent', () => {
  let component: PaginaDispensacaoComponent;
  let fixture: ComponentFixture<PaginaDispensacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaDispensacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaDispensacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
