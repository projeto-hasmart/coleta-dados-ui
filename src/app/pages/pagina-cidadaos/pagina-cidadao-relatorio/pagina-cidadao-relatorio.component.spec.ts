import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCidadaoRelatorioComponent } from './pagina-cidadao-relatorio.component';

describe('PaginaCidadaoRelatorioComponent', () => {
  let component: PaginaCidadaoRelatorioComponent;
  let fixture: ComponentFixture<PaginaCidadaoRelatorioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCidadaoRelatorioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCidadaoRelatorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
