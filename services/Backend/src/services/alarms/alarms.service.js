// Initializes the `alarm` service on path `/alarm`
const { Alarms } = require("./alarms.class");
const createModel = require("../../models/alarms.model");
const hooks = require("./alarms.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"]
  };

  // Initialize our service with any options it requires
  app.use("/alarms", new Alarms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("alarms");

  service.hooks(hooks);
};
