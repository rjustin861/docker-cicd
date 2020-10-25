// Initializes the `floorplanDevices` service on path `/floorplanDevices`
const { FloorplanDevices } = require("./floorplan-devices.class");
const createModel = require("../../models/floorplan-devices.model");
const hooks = require("./floorplan-devices.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/floorplanDevices", new FloorplanDevices(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("floorplanDevices");

  service.hooks(hooks);
};
