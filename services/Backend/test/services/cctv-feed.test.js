const app = require('../../src/app');

describe('\'cctvFeed\' service', () => {
  it('registered the service', () => {
    const service = app.service('cctvFeed');
    expect(service).toBeTruthy();
  });
});
