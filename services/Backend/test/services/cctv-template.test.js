const app = require('../../src/app');

describe('\'cctvTemplate\' service', () => {
  it('registered the service', () => {
    const service = app.service('cctvTemplate');
    expect(service).toBeTruthy();
  });
});
