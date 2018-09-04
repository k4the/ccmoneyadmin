import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcModalComponent } from './cc-modal.component';

describe('CcModalComponent', () => {
  let component: CcModalComponent;
  let fixture: ComponentFixture<CcModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
