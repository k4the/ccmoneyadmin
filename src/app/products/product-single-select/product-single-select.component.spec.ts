import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleSelectComponent } from './product-single-select.component';

describe('ProductSingleSelectComponent', () => {
  let component: ProductSingleSelectComponent;
  let fixture: ComponentFixture<ProductSingleSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSingleSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
