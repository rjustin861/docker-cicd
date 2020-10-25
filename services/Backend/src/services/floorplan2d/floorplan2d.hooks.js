const { fastJoin } = require("feathers-hooks-common");

const floorplanResolver = {
  joins: {
    geoInfo: $select => async (floorplan, context) =>
      (floorplan.geoInfo = (
        await context.app.service("geoInfo").find({
          query: { _id: floorplan.geoInfo, $select: $select },
          paginate: false
        })
      )[0]),
    devices: $select => async (floorplan, context) =>
      (floorplan.devices = await context.app.service("floorplanDevices").find({
        query: { _id: { $in: floorplan.devices }, $select: $select },
        paginate: false
      }))
  }
};

const fastResolver = {
  joins: {
    floorplan2d: {
      resolver: $select => async (floorplan2d, context) => {
        floorplan2d.station = (
          await context.app.service("stations").find({
            query: { _id: floorplan2d.station, $select: $select },
            paginate: false
          })
        )[0];
        return floorplan2d.floorplan;
      },
      joins: floorplanResolver
    }
  }
};

const query = {
  floorplan2d: {
    args: [["_id", "name"]],
    geoInfo: [["origin", "direction"]],
    devices: [["_id", "position", "device", "direction", "model"]]
  }
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
