// Initializes the `actionMessage` service on path `/actionMessage`
const { ActionMessage } = require("./action-message.class");
const createModel = require("../../models/action-message.model");
const hooks = require("./action-message.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["patch"]
  };

  // Initialize our service with any options it requires
  app.use("/actionMessage", new ActionMessage(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("actionMessage");

  service.hooks(hooks);
};
