import { An4Page } from './app.po';

describe('an4 App', () => {
  let page: An4Page;

  beforeEach(() => {
    page = new An4Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
