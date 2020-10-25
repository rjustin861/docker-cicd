const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    station: ($select) => async (devices, context) => {
      devices.station = (
        await context.app.service("stations").find({
          query: { _id: devices.station, $select: $select },
          paginate: false
        })
      )[0];
    },
    related: ($select) => async (devices, context) => {
      devices.related = await context.app.service("devices").find({
        query: { _id: { $in: devices.related }, $select: $select },
        paginate: false
      });
    }
  }
};

const query = {
  station: [["_id", "name", "tag"]],
  related: [["_id", "name", "externalId"]]
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
