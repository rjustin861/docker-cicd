const app = require('../../src/app');

describe('\'stations\' service', () => {
  it('registered the service', () => {
    const service = app.service('stations');
    expect(service).toBeTruthy();
  });
});
