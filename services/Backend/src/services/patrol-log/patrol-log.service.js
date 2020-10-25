// Initializes the `patrolLog` service on path `/patrolLog`
const { PatrolLog } = require("./patrol-log.class");
const createModel = require("../../models/patrol-log.model");
const hooks = require("./patrol-log.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/patrolLog", new PatrolLog(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("patrolLog");

  service.hooks(hooks);
};
