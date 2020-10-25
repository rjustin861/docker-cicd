// Initializes the `floorplans3d` service on path `/floorplans3d`
const { Floorplan3d } = require("./floorplan3d.class");
const createModel = require("../../models/floorplan3d.model");
const hooks = require("./floorplan3d.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/floorplan3d", new Floorplan3d(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("floorplan3d");

  service.hooks(hooks);
};
