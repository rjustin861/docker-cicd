// Initializes the `audio` service on path `/audio`
const { Audio } = require('./audio.class');
const createModel = require('../../models/audio.model');
const hooks = require('./audio.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/audio', new Audio(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('audio');

  service.hooks(hooks);
};
