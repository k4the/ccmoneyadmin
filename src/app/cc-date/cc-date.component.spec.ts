import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcDateComponent } from './cc-date.component';

describe('CcDateComponent', () => {
  let component: CcDateComponent;
  let fixture: ComponentFixture<CcDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
