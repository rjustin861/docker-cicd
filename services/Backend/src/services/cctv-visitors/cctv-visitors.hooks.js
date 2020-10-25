const { fastJoin } = require("feathers-hooks-common")

const fastResolver = {
  joins: {
    personnel: ($select) => async (cctvVisitors, context) => {
      cctvVisitors.personnel = (
        await context.app.service("personnel").find({
          query: { _id: cctvVisitors.personnel, $select: $select },
          paginate: false
        })
      )[0]
    }
  }
}

const query = {
  personnel: [["_id", "name", "photo", "department"]]
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
