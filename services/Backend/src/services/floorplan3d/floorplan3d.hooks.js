const { fastJoin } = require("feathers-hooks-common");

const static3dResolver = {
  joins: {
    device: $select => async (static_3d, context) =>
      (static_3d.device = (
        await context.app.service("devices").find({
          query: { _id: static_3d.device, $select: $select },
          paginate: false
        })
      )[0])
  }
};

const fastResolver = {
  joins: {
    floorplan3d: {
      resolver: $select => async (floorplan3d, context) => {
        floorplan3d.station = (
          await context.app.service("stations").find({
            query: { _id: floorplan3d.station, $select: $select },
            paginate: false
          })
        )[0];
        floorplan3d.geoInfo = (
          await context.app.service("geoInfo").find({
            query: { _id: floorplan3d.geoInfo, $select: $select },
            paginate: false
          })
        )[0];
        floorplan3d.devices_3d = await context.app
          .service("floorplanDevices")
          .find({
            query: { _id: { $in: floorplan3d.devices_3d }, $select: $select },
            paginate: false
          });
        return floorplan3d.static_3d;
      },
      joins: static3dResolver
    }
  }
};

const query = {
  floorplan3d: {
    args: [
      ["_id", "name", "origin", "direction", "position", "device", "model"]
    ],
    device: [["_id", "name", "category", "health", "status", "zone", "related"]]
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
