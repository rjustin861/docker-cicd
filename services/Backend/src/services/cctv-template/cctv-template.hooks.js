const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    devices: ($select) => async (cctvTemplate, context) =>
      (cctvTemplate.devices = await context.app.service("devices").find({
        query: { _id: { $in: cctvTemplate.devices }, $select: $select },
        paginate: false,
      })),
  },
};

const query = {
  devices: [["name", "model", "station", "description"]],
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [fastJoin(fastResolver, query)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
