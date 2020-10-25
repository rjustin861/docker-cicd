// Initializes the `reports-type` service on path `/reportsType`
const { ReportsType } = require("./reports-type.class");
const createModel = require("../../models/reports-type.model");
const hooks = require("./reports-type.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"]
  };

  // Initialize our service with any options it requires
  app.use("/reportsType", new ReportsType(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("reportsType");

  service.hooks(hooks);
};
