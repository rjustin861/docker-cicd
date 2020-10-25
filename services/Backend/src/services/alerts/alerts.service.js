// Initializes the `alerts` service on path `/alerts`
const { Alerts } = require("./alerts.class");
const { AlertsStats } = require("./alerts-stats.class");
const createModel = require("../../models/alerts.model");
const hooks = require("./alerts.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
    paginate: {
      default: 100,
      max: 200
    }
  };

  // Initialize our service with any options it requires
  app.use("/alerts", new Alerts(options, app));
  app.use("/alertsStats", new AlertsStats(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("alerts");

  service.hooks(hooks);
};
