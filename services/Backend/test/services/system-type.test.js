const app = require('../../src/app');

describe('\'systemType\' service', () => {
  it('registered the service', () => {
    const service = app.service('systemType');
    expect(service).toBeTruthy();
  });
});
