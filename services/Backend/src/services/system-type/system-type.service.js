// Initializes the `systemType` service on path `/systemType`
const { SystemType } = require("./system-type.class");
const createModel = require("../../models/system-type.model");
const hooks = require("./system-type.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/systemType", new SystemType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("systemType");

  service.hooks(hooks);
};
