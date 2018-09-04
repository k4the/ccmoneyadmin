import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcSelectComponent } from './cc-select.component';

describe('CcSelectComponent', () => {
  let component: CcSelectComponent;
  let fixture: ComponentFixture<CcSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
