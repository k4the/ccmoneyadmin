import { CcModalModule } from './cc-modal.module';

describe('CcModalModule', () => {
  let ccModalModule: CcModalModule;

  beforeEach(() => {
    ccModalModule = new CcModalModule();
  });

  it('should create an instance', () => {
    expect(ccModalModule).toBeTruthy();
  });
});
