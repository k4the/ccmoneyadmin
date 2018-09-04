import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcModalComponent2 } from './cc-modal.component';

describe('CcModalComponent2', () => {
  let component: CcModalComponent2;
  let fixture: ComponentFixture<CcModalComponent2>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcModalComponent2 ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcModalComponent2);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
