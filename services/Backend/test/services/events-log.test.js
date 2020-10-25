const app = require('../../src/app');

describe('\'eventsLog\' service', () => {
  it('registered the service', () => {
    const service = app.service('eventsLog');
    expect(service).toBeTruthy();
  });
});
