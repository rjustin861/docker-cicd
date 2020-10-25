const app = require('../../src/app');

describe('\'floorplans3d\' service', () => {
  it('registered the service', () => {
    const service = app.service('floorplans3d');
    expect(service).toBeTruthy();
  });
});
