import { ProductsModule } from './products.module';

describe('ProductsModule', () => {
  let postsModule: ProductsModule;

  beforeEach(() => {
    postsModule = new ProductsModule();
  });

  it('should create an instance', () => {
    expect(postsModule).toBeTruthy();
  });
});
