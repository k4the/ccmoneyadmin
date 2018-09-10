import { CcDateModule } from './cc-date.module';

describe('CcDateModule', () => {
  let ccDateModule: CcDateModule;

  beforeEach(() => {
    ccDateModule = new CcDateModule();
  });

  it('should create an instance', () => {
    expect(ccDateModule).toBeTruthy();
  });
});
