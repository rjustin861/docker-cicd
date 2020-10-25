const app = require('../../src/app');

describe('\'bacsLogType\' service', () => {
  it('registered the service', () => {
    const service = app.service('bacsLogType');
    expect(service).toBeTruthy();
  });
});
