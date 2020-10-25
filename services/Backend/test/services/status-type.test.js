const app = require('../../src/app');

describe('\'status-type\' service', () => {
  it('registered the service', () => {
    const service = app.service('statusType');
    expect(service).toBeTruthy();
  });
});
