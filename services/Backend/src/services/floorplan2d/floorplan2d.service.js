// Initializes the `floorplans` service on path `/floorplans`
const { Floorplan2d } = require("./floorplan2d.class");
const createModel = require("../../models/floorplan2d.model");
const hooks = require("./floorplan2d.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/floorplan2d", new Floorplan2d(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("floorplan2d");

  service.hooks(hooks);
};
