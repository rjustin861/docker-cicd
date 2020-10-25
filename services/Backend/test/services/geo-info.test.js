const app = require('../../src/app');

describe('\'geoInfo\' service', () => {
  it('registered the service', () => {
    const service = app.service('geoInfo');
    expect(service).toBeTruthy();
  });
});
