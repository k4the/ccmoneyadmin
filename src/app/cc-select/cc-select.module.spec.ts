import { CcSelectModule } from './cc-select.module';

describe('CcSelectModule', () => {
  let ccSelectModule: CcSelectModule;

  beforeEach(() => {
    ccSelectModule = new CcSelectModule();
  });

  it('should create an instance', () => {
    expect(ccSelectModule).toBeTruthy();
  });
});
