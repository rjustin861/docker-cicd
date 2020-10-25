// Initializes the `dashboardControl` service on path `/dashboardControl`
const { DashboardControl } = require("./dashboard-control.class");
const createModel = require("../../models/dashboard-control.model");
const hooks = require("./dashboard-control.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/dashboardControl", new DashboardControl(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("dashboardControl");

  service.hooks(hooks);
};
