const app = require('../../src/app');

describe('\'pointType\' service', () => {
  it('registered the service', () => {
    const service = app.service('pointType');
    expect(service).toBeTruthy();
  });
});
