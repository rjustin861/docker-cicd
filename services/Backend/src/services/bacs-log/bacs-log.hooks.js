const { fastJoin } = require("feathers-hooks-common")

const fastResolver = {
  joins: {
    station: ($select) => async (bacsLog, context) =>
      (bacsLog.station = (
        await context.app.service("stations").find({
          query: { _id: bacsLog.station, $select: $select },
          paginate: false
        })
      )[0]),
    device: ($select) => async (bacsLog, context) =>
      (bacsLog.device = (
        await context.app.service("devices").find({
          query: { _id: bacsLog.device, $select: $select },
          paginate: false
        })
      )[0]),
    type: ($select) => async (bacsLog, context) =>
      (bacsLog.type = (
        await context.app.service("bacsLogType").find({
          query: { _id: bacsLog.type, $select: $select },
          paginate: false
        })
      )[0]),
    user: ($select) => async (bacsLog, context) =>
      (bacsLog.user = (
        await context.app.service("personnel").find({
          query: { _id: bacsLog.user, $select: $select },
          paginate: false
        })
      )[0])
  }
}

const query = {
  station: [["_id", "name"]],
  device: [["_id", "name"]],
  type: [["_id", "name"]],
  user: [["_id", "name"]]
}

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
}
