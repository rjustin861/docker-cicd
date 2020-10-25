// Initializes the `device` service on path `/device`
const { Device } = require("./device.class");
const { DeviceConnected } = require("./device-connected.class");
const createModel = require("../../models/device.model");
const hooks = require("./device.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
    paginate: {
      default: 200,
      max: 200
    }
  };

  // Initialize our service with any options it requires
  app.use("/devices", new Device(options, app));
  app.use("/devicesConnected", new DeviceConnected(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("devices");

  service.hooks(hooks);
};
