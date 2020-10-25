// Initializes the `pointType` service on path `/pointType`
const { PointType } = require("./point-type.class");
const createModel = require("../../models/point-type.model");
const hooks = require("./point-type.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"]
  };

  // Initialize our service with any options it requires
  app.use("/pointType", new PointType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("pointType");

  service.hooks(hooks);
};
