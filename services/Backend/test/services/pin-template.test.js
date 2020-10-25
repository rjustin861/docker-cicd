const app = require('../../src/app');

describe('\'pinTemplate\' service', () => {
  it('registered the service', () => {
    const service = app.service('pinTemplate');
    expect(service).toBeTruthy();
  });
});
