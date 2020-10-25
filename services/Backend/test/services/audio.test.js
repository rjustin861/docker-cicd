const app = require('../../src/app');

describe('\'audio\' service', () => {
  it('registered the service', () => {
    const service = app.service('audio');
    expect(service).toBeTruthy();
  });
});
