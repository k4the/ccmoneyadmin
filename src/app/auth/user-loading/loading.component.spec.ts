import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoadingComponent } from './loading.component';

describe('UserLoadingComponent', () => {
  let component: UserLoadingComponent;
  let fixture: ComponentFixture<UserLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create UserLoadingComponent', () => {
    expect(component).toBeTruthy();
  });
});
