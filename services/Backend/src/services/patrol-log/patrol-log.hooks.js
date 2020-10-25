const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    station: ($select) => async (patrolLog, context) =>
      (patrolLog.station = (
        await context.app.service("stations").find({
          query: { _id: patrolLog.station, $select: $select },
          paginate: false,
        })
      )[0]),
    user: ($select) => async (patrolLog, context) =>
      (patrolLog.user = (
        await context.app.service("personnel").find({
          query: { _id: patrolLog.user, $select: $select },
          paginate: false,
        })
      )[0]),
  },
};

const query = {
  station: [["_id", "name"]],
  user: [["_id", "name"]],
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
