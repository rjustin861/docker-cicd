const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    devices: ($select) => async (pinTemplate, context) =>
      (pinTemplate.devices = await context.app.service("devices").find({
        query: { _id: { $in: pinTemplate.devices }, $select: $select },
        paginate: false
      })),
    user: ($select) => async (pinTemplate, context) =>
      (pinTemplate.user = (
        await context.app.service("personnel").find({
          query: { _id: pinTemplate.user, $select: $select },
          paginate: false
        })
      )[0])
  }
};

const query = {
  devices: [["name", "model", "station", "description"]],
  user: [["_id", "name"]]
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [fastJoin(fastResolver, query)],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
