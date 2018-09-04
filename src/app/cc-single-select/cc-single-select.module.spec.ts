import { CcSingleSelectModule } from './cc-single-select.module';

describe('CcSingleSelectModule', () => {
  let ccSingleSelectModule: CcSingleSelectModule;

  beforeEach(() => {
    ccSingleSelectModule = new CcSingleSelectModule();
  });

  it('should create an instance', () => {
    expect(ccSingleSelectModule).toBeTruthy();
  });
});
