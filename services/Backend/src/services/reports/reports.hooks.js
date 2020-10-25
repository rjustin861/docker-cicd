const { fastJoin } = require("feathers-hooks-common");

const progressResolver = {
  joins: {
    updatedBy: $select => async (progress, context) =>
      (progress.updatedBy = (
        await context.app.service("personnel").find({
          query: { _id: progress.updatedBy, $select: $select },
          paginate: false
        })
      )[0])
  }
};

const fastResolver = {
  joins: {
    reports: {
      resolver: $select => async (reports, context) => {
        reports.type = (
          await context.app.service("reportsType").find({
            query: { _id: reports.type, $select: $select },
            paginate: false
          })
        )[0];
        reports.device = (
          await context.app.service("devices").find({
            query: { _id: reports.device, $select: $select },
            paginate: false
          })
        )[0];
        reports.station = (
          await context.app.service("stations").find({
            query: { _id: reports.station, $select: $select },
            paginate: false
          })
        )[0];
        reports.reportedBy = (
          await context.app.service("personnel").find({
            query: { _id: reports.reportedBy, $select: $select },
            paginate: false
          })
        )[0];
        return reports.progress;
      },
      joins: progressResolver
    }
  }
};

const query = {
  reports: {
    args: [["_id", "name", "zone", "health", "status", "department"]],
    updatedBy: [["_id", "name", "department"]]
  }
};

const createOrUpdateReport = async context => {
  if (context.data.progress) {
    const obj = context.data.progress;
    if (Object.keys(obj).length === 0 && obj.constructor === Object) {
      context.data.progress = [];
    } else {
      if (context.method == "patch") {
        const { progress } = await context.app
          .service("reports")
          .get(context.id);
        context.data.progress = [...progress, obj];
      }
      context.data.status = obj.status;
    }
  }
  return context;
};

const updateAlertStatus = async context => {
  if (context.result.alertId) {
    const alertId = context.result.alertId;
    const data = {
      status: "I"
    };
    await context.app.service("alerts").patch(alertId, data);
  }
  return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createOrUpdateReport],
    update: [],
    patch: [createOrUpdateReport],
    remove: []
  },

  after: {
    all: [fastJoin(fastResolver, query)],
    find: [],
    get: [],
    create: [updateAlertStatus],
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
