import { CcImageFilterModule } from './cc-image-filter.module';

describe('CcImageFilterModule', () => {
  let ccModalModule: CcImageFilterModule;

  beforeEach(() => {
    ccModalModule = new CcImageFilterModule();
  });

  it('should create an instance', () => {
    expect(ccModalModule).toBeTruthy();
  });
});
