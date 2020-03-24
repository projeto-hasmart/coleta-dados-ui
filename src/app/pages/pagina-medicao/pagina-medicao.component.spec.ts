import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaMedicaoComponent } from './pagina-medicao.component';

describe('PaginaMedicaoComponent', () => {
  let component: PaginaMedicaoComponent;
  let fixture: ComponentFixture<PaginaMedicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaMedicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaMedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
