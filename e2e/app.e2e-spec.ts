import { PRDLAPage } from './app.po';

describe('prdla App', function() {
  let page: PRDLAPage;

  beforeEach(() => {
    page = new PRDLAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
