const app = require('../../src/app');

describe('\'reports-type\' service', () => {
  it('registered the service', () => {
    const service = app.service('reportsType');
    expect(service).toBeTruthy();
  });
});
