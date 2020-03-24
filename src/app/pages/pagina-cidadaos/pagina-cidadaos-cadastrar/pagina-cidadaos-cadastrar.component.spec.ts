import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCidadaosCadastrarComponent } from './pagina-cidadaos-cadastrar.component';

describe('PaginaCidadaosCadastrarComponent', () => {
  let component: PaginaCidadaosCadastrarComponent;
  let fixture: ComponentFixture<PaginaCidadaosCadastrarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCidadaosCadastrarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCidadaosCadastrarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
