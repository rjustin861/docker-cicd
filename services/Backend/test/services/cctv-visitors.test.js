const app = require('../../src/app');

describe('\'cctvVisitors\' service', () => {
  it('registered the service', () => {
    const service = app.service('cctvVisitors');
    expect(service).toBeTruthy();
  });
});
