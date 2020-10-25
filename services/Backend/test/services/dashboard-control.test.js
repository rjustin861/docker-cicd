const app = require('../../src/app');

describe('\'dashboardControl\' service', () => {
  it('registered the service', () => {
    const service = app.service('dashboardControl');
    expect(service).toBeTruthy();
  });
});
