import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcImageFilterComponent } from './cc-image-filter.component';

describe('CcImageFilterComponent', () => {
  let component: CcImageFilterComponent;
  let fixture: ComponentFixture<CcImageFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcImageFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcImageFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
