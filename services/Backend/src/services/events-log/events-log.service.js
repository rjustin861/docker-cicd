// Initializes the `eventsLog` service on path `/eventsLog`
const { EventsLog } = require("./events-log.class");
const createModel = require("../../models/events-log.model");
const hooks = require("./events-log.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use("/eventsLog", new EventsLog(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("eventsLog");

  service.hooks(hooks);
};
