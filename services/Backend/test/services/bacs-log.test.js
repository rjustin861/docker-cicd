const app = require('../../src/app');

describe('\'bacsLog\' service', () => {
  it('registered the service', () => {
    const service = app.service('bacsLog');
    expect(service).toBeTruthy();
  });
});
