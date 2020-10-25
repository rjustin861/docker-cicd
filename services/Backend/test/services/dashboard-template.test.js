const app = require('../../src/app');

describe('\'dashboardTemplate\' service', () => {
  it('registered the service', () => {
    const service = app.service('dashboardTemplate');
    expect(service).toBeTruthy();
  });
});
