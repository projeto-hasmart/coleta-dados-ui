import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMedicaoComponent } from './page-medicao.component';

describe('PageMedicaoComponent', () => {
  let component: PageMedicaoComponent;
  let fixture: ComponentFixture<PageMedicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageMedicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageMedicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
