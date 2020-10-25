const { fastJoin, makeCallingParams } = require("feathers-hooks-common")
const BatchLoader = require("@feathers-plus/batch-loader")
const { loaderFactory, getResultsByKey, getUniqueKeys } = BatchLoader

const fastResolver = {
  // before: (context) => {
  //   context._loaders = { station: {}, device: {}, point: {}, ackUser: {} }

  //   context._loaders.station.id = new BatchLoader(
  //     async (keys, context2) => {
  //       const result = await context.app
  //         .service("stations")
  //         .find(
  //           makeCallingParams(
  //             context2,
  //             { _id: { $in: getUniqueKeys(keys) }, $select: ["_id", "name"] },
  //             undefined,
  //             { paginate: false }
  //           )
  //         )
  //       return getResultsByKey(keys, result, (station) => station._id, "")
  //     },
  //     { context }
  //   )

  //   context._loaders.device.id = new BatchLoader(
  //     async (keys, context2) => {
  //       const result = await context.app.service("devices").find(
  //         makeCallingParams(
  //           context2,
  //           {
  //             _id: { $in: getUniqueKeys(keys) },
  //             $select: ["_id", "name", "externalId", "related"]
  //           },
  //           undefined,
  //           { paginate: false }
  //         )
  //       )
  //       return getResultsByKey(keys, result, (device) => device._id, "")
  //     },
  //     { context }
  //   )

  //   context._loaders.point.id = new BatchLoader(
  //     async (keys, context2) => {
  //       const result = await context.app
  //         .service("pointType")
  //         .find(
  //           makeCallingParams(
  //             context2,
  //             { _id: { $in: getUniqueKeys(keys) }, $select: ["_id", "name"] },
  //             undefined,
  //             { paginate: false }
  //           )
  //         )
  //       return getResultsByKey(keys, result, (point) => point._id, "")
  //     },
  //     { context }
  //   )

  //   context._loaders.ackUser.id = new BatchLoader(
  //     async (keys, context2) => {
  //       const result = await context.app
  //         .service("personnel")
  //         .find(
  //           makeCallingParams(
  //             context2,
  //             { _id: { $in: getUniqueKeys(keys) }, $select: ["_id", "name"] },
  //             undefined,
  //             { paginate: false }
  //           )
  //         )
  //       return getResultsByKey(keys, result, (ackUser) => ackUser._id, "")
  //     },
  //     { context }
  //   )
  // },
  joins: {
    // station: () => async (eventsLog, context) =>
    //   !eventsLog.station
    //     ? null
    //     : (eventsLog.station = await context._loaders.station.id.load(
    //         eventsLog.station
    //       )),
    // device: () => async (eventsLog, context) =>
    //   !eventsLog.device
    //     ? null
    //     : (eventsLog.device = await context._loaders.device.id.load(
    //         eventsLog.device
    //       )),
    // point: () => async (eventsLog, context) =>
    //   !eventsLog.point
    //     ? null
    //     : (eventsLog.point = await context._loaders.point.id.load(
    //         eventsLog.point
    //       )),
    // ackUser: () => async (eventsLog, context) =>
    //   !eventsLog.ackUser
    //     ? null
    //     : (eventsLog.ackUser = await context._loaders.ackUser.id.load(
    //         eventsLog.ackUser
    //       ))

    station: ($select) => async (eventsLog, context) =>
      (eventsLog.station = (
        await context.app.service("stations").find({
          query: { _id: eventsLog.station, $select: $select },
          paginate: false
        })
      )[0]),
    device: ($select) => async (eventsLog, context) =>
      (eventsLog.device = (
        await context.app.service("devices").find({
          query: { _id: eventsLog.device, $select: $select },
          paginate: false
        })
      )[0]),
    point: ($select) => async (eventsLog, context) =>
      (eventsLog.point = (
        await context.app.service("pointType").find({
          query: { _id: eventsLog.point, $select: $select },
          paginate: false
        })
      )[0]),
    ackUser: ($select) => async (eventsLog, context) =>
      (eventsLog.ackUser = (
        await context.app.service("personnel").find({
          query: { _id: eventsLog.ackUser, $select: $select },
          paginate: false
        })
      )[0])
  }
}

const query = {
  station: [["_id", "name"]],
  device: [["_id", "name", "externalId", "related"]],
  point: [["_id", "name"]],
  ackUser: [["_id", "name"]]
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
