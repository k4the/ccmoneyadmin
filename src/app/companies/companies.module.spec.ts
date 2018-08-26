import { CompaniesModule } from './companies.module';

describe('CompaniesModule', () => {
  let postsModule: CompaniesModule;

  beforeEach(() => {
    postsModule = new CompaniesModule();
  });

  it('should create an instance', () => {
    expect(postsModule).toBeTruthy();
  });
});
