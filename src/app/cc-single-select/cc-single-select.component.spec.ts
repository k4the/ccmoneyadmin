import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSingleSelectComponent } from './cc-single-select.component';

describe('CcSingleSelectComponent', () => {
  let component: CcSingleSelectComponent;
  let fixture: ComponentFixture<CcSingleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcSingleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
