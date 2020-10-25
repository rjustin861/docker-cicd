const app = require('../../src/app');

describe('\'floorplanDevicesModel\' service', () => {
  it('registered the service', () => {
    const service = app.service('floorplanDevicesModel');
    expect(service).toBeTruthy();
  });
});
