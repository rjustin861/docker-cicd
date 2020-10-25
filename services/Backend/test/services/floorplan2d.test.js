const app = require('../../src/app');

describe('\'floorplans\' service', () => {
  it('registered the service', () => {
    const service = app.service('floorplans');
    expect(service).toBeTruthy();
  });
});
