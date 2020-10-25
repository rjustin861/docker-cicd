// Initializes the `geoInfo` service on path `/geoInfo`
const { GeoInfo } = require('./geo-info.class');
const createModel = require('../../models/geo-info.model');
const hooks = require('./geo-info.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/geoInfo', new GeoInfo(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('geoInfo');

  service.hooks(hooks);
};
