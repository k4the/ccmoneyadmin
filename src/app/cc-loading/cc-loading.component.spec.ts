import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcLoadingComponent } from './cc-loading.component';

describe('CcLoadingComponent', () => {
  let component: CcLoadingComponent;
  let fixture: ComponentFixture<CcLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CcLoadingComponent', () => {
    expect(component).toBeTruthy();
  });
});
