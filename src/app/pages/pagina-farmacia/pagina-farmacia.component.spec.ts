import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaFarmaciaComponent } from './pagina-farmacia.component';

describe('PaginaFarmaciaComponent', () => {
  let component: PaginaFarmaciaComponent;
  let fixture: ComponentFixture<PaginaFarmaciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaFarmaciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaFarmaciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
