// Initializes the `rules` service on path `/rules`
const { Rules } = require("./rules.class");
const createModel = require("../../models/rules.model");
const hooks = require("./rules.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use("/rules", new Rules(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("rules");

  service.hooks(hooks);
};
