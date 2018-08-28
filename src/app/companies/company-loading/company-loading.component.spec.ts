import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyLoadingComponent } from './company-loading.component';

describe('CompanyLoadingComponent', () => {
  let component: CompanyLoadingComponent;
  let fixture: ComponentFixture<CompanyLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create CompanyLoadingComponent', () => {
    expect(component).toBeTruthy();
  });
});
