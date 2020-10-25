// Initializes the `cctvFeed` service on path `/cctvFeed`
const { CctvFeed } = require('./cctv-feed.class');
const createModel = require('../../models/cctv-feed.model');
const hooks = require('./cctv-feed.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cctvFeed', new CctvFeed(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cctvFeed');

  service.hooks(hooks);
};
