import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCidadaosVisualizarComponent } from './pagina-cidadaos-visualizar.component';

describe('PaginaCidadaosVisualizarComponent', () => {
  let component: PaginaCidadaosVisualizarComponent;
  let fixture: ComponentFixture<PaginaCidadaosVisualizarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCidadaosVisualizarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCidadaosVisualizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
