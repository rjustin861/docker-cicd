// Initializes the `cctvTemplate` service on path `/cctvTemplate`
const { CctvTemplate } = require('./cctv-template.class');
const createModel = require('../../models/cctv-template.model');
const hooks = require('./cctv-template.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/cctvTemplate', new CctvTemplate(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('cctvTemplate');

  service.hooks(hooks);
};
