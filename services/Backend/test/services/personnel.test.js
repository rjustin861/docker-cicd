const app = require('../../src/app');

describe('\'personnel\' service', () => {
  it('registered the service', () => {
    const service = app.service('personnel');
    expect(service).toBeTruthy();
  });
});
