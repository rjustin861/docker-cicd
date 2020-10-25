const { fastJoin, makeCallingParams } = require("feathers-hooks-common")
const BatchLoader = require("@feathers-plus/batch-loader")
const { loaderFactory } = BatchLoader
const { getResultsByKey, getUniqueKeys } = BatchLoader

const fastResolver = {
  //before: (context) => {
  //context._loaders = { dept: {} }
  // context._loaders.dept.id = loaderFactory(
  //   context.app.service("departments"),
  //   "_id",
  //   false,
  //   {
  //     paginate: false
  //   }
  // )(context)
  //   context._loaders.dept.id = new BatchLoader(
  //     async (keys, context2) => {
  //       const result = await context.app
  //         .service("departments")
  //         .find(
  //           makeCallingParams(
  //             context2,
  //             { _id: { $in: getUniqueKeys(keys) }, $select: ["_id", "name"] },
  //             undefined,
  //             { paginate: false }
  //           )
  //         )
  //       return getResultsByKey(
  //         keys,
  //         result,
  //         (department) => department._id,
  //         "!"
  //       )
  //     },
  //     { context }
  //   )
  // },

  joins: {
    department: ($select) => async (personnel, context) =>
      (personnel.department = (
        await context.app.service("departments").find({
          query: { _id: personnel.department, $select: $select },
          paginate: false
        })
      )[0])
    // department: () => async (personnel, context) =>
    //   (personnel.department = await context._loaders.dept.id.load(
    //     personnel.department
    //   ))
  }
}

const query = {
  department: [["_id", "name"]]
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
