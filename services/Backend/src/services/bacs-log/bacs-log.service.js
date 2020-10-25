// Initializes the `bacsLog` service on path `/bacsLog`
const { BacsLog } = require("./bacs-log.class");
const createModel = require("../../models/bacs-log.model");
const hooks = require("./bacs-log.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/bacsLog", new BacsLog(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("bacsLog");

  service.hooks(hooks);
};
