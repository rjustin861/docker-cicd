const app = require('../../src/app');

describe('\'actionMessage\' service', () => {
  it('registered the service', () => {
    const service = app.service('actionMessage');
    expect(service).toBeTruthy();
  });
});
