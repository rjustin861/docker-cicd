// Initializes the `dashboardTemplate` service on path `/dashboardTemplate`
const { DashboardTemplate } = require("./dashboard-template.class");
const createModel = require("../../models/dashboard-template.model");
const hooks = require("./dashboard-template.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/dashboardTemplate", new DashboardTemplate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("dashboardTemplate");

  service.hooks(hooks);
};
