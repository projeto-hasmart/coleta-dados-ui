import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCidadaosComponent } from './pagina-cidadaos.component';

describe('PaginaCidadaosComponent', () => {
  let component: PaginaCidadaosComponent;
  let fixture: ComponentFixture<PaginaCidadaosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaCidadaosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCidadaosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
