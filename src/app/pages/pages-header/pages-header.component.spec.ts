import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHeaderComponent } from './pages-header.component';

describe('PagesHeaderComponent', () => {
  let component: PagesHeaderComponent;
  let fixture: ComponentFixture<PagesHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
