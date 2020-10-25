// Initializes the `floorplanDevicesModel` service on path `/floorplanDevicesModel`
const { FloorplanDevicesModel } = require("./floorplan-devices-model.class");
const createModel = require("../../models/floorplan-devices-model.model");
const hooks = require("./floorplan-devices-model.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/floorplanDevicesModel", new FloorplanDevicesModel(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("floorplanDevicesModel");

  service.hooks(hooks);
};
