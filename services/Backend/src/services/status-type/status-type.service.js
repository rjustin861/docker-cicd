// Initializes the `status-type` service on path `/statusType`
const { StatusType } = require("./status-type.class");
const createModel = require("../../models/status-type.model");
const hooks = require("./status-type.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"]
  };

  // Initialize our service with any options it requires
  app.use("/statusType", new StatusType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("statusType");

  service.hooks(hooks);
};
