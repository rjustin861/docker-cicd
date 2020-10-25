const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    floorplanDevices: $select => async (floorplanDevices, context) => {
      floorplanDevices.device = (
        await context.app.service("devices").find({
          query: { _id: floorplanDevices.device, $select: $select },
          paginate: false
        })
      )[0];
      floorplanDevices.model = (
        await context.app.service("floorplanDevicesModel").find({
          query: { _id: floorplanDevices.model, $select: $select },
          paginate: false
        })
      )[0];
    }
  }
};

const query = {
  floorplanDevices: [
    [
      "_id",
      "name",
      "category",
      "health",
      "status",
      "zone",
      "related",
      "path",
      "model"
    ]
  ]
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
