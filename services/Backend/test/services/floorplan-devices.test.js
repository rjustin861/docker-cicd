const app = require('../../src/app');

describe('\'floorplanDevices\' service', () => {
  it('registered the service', () => {
    const service = app.service('floorplanDevices');
    expect(service).toBeTruthy();
  });
});
