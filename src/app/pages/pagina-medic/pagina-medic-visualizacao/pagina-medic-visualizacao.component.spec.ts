import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicVisualizacaoComponent } from './pagina-medic-visualizacao.component';

describe('PaginaMedicVisualizacaoComponent', () => {
  let component: PaginaMedicVisualizacaoComponent;
  let fixture: ComponentFixture<PaginaMedicVisualizacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicVisualizacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicVisualizacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
