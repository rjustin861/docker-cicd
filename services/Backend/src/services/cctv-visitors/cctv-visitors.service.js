// Initializes the `cctvVisitors` service on path `/cctvVisitors`
const { CctvVisitors } = require("./cctv-visitors.class");
const createModel = require("../../models/cctv-visitors.model");
const hooks = require("./cctv-visitors.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/cctvVisitors", new CctvVisitors(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("cctvVisitors");

  service.hooks(hooks);
};
