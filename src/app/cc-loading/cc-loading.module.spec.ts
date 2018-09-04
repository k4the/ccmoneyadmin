import { CcLoadingModule } from './cc-loading.module';

describe('CcLoadingModule', () => {
  let ccLoadingModule: CcLoadingModule;

  beforeEach(() => {
    ccLoadingModule = new CcLoadingModule();
  });

  it('should create an instance', () => {
    expect(ccLoadingModule).toBeTruthy();
  });
});
