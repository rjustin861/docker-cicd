const app = require('../../src/app');

describe('\'patrolLog\' service', () => {
  it('registered the service', () => {
    const service = app.service('patrolLog');
    expect(service).toBeTruthy();
  });
});
