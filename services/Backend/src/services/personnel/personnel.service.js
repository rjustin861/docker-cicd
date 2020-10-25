// Initializes the `personnel` service on path `/personnel`
const { Personnel } = require("./personnel.class");
const createModel = require("../../models/personnel.model");
const hooks = require("./personnel.hooks");

module.exports = function(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"]
  };

  // Initialize our service with any options it requires
  app.use("/personnel", new Personnel(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("personnel");

  service.hooks(hooks);
};
