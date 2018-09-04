import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcToggleComponent } from './cc-toggle.component';

describe('CcToggleComponent', () => {
  let component: CcToggleComponent;
  let fixture: ComponentFixture<CcToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CcToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CcToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
