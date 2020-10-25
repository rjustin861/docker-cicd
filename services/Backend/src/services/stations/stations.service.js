// Initializes the `stations` service on path `/stations`
const { Stations } = require("./stations.class");
const { StationsDisarmed } = require("./stations-disarmed.class");
const createModel = require("../../models/stations.model");
const hooks = require("./stations.hooks");

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate"),
    multi: ["create"],
    paginate: {
      default: 1000,
      max: 1000
    }
  };

  // Initialize our service with any options it requires
  app.use("/stations", new Stations(options, app));
  app.use("/stationsByDisarmed", new StationsDisarmed(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("stations");

  service.hooks(hooks);
};
