// Initializes the `bacsLogType` service on path `/bacsLogType`
const { BacsLogType } = require("./bacs-log-type.class");
const createModel = require("../../models/bacs-log-type.model");
const hooks = require("./bacs-log-type.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/bacsLogType", new BacsLogType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("bacsLogType");

  service.hooks(hooks);
};
