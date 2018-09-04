import { CcToggleModule } from './cc-toggle.module';

describe('CcToggleModule', () => {
  let ccToggleModule: CcToggleModule;

  beforeEach(() => {
    ccToggleModule = new CcToggleModule();
  });

  it('should create an instance', () => {
    expect(ccToggleModule).toBeTruthy();
  });
});
