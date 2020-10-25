const { fastJoin } = require("feathers-hooks-common");

const fastResolver = {
  joins: {
    status: ($select) => async (alerts, context) => {
      alerts.status = (
        await context.app.service("statusType").find({
          query: { _id: alerts.status, $select: $select },
          paginate: false
        })
      )[0];
    },
    station: ($select) => async (alerts, context) => {
      alerts.station = (
        await context.app.service("stations").find({
          query: { _id: alerts.station, $select: $select },
          paginate: false
        })
      )[0];
    },
    device: ($select) => async (alerts, context) => {
      alerts.device = (
        await context.app.service("devices").find({
          query: { _id: alerts.device, $select: $select },
          paginate: false
        })
      )[0];
    }
  }
};

const query = {
  status: [["_id", "description"]],
  station: [["_id", "name"]],
  device: [["_id", "name", "category", "zone", "externalId", "related"]]
};

const getOriginalAlertType = async (context) => {
  originalAlert = await context.app.service("alerts").get(context.id);
  context.data.originalAlertType = originalAlert.type;
  return context;
};

const onAlertCreated = async (context) => {
  //1. Update stations' number of potential alert and confirmed alert - NOT REQUIRED ANYMORE
  // const stationId = context.result.station._id;
  // const type = context.data.type;
  // const system = context.data.system;

  // let { alert } = await context.app.service("stations").get(stationId);

  // if (type == "P") {
  //   alert[system]["potentialAlert"] = alert[system]["potentialAlert"] + 1;
  // } else if (type == "C") {
  //   alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] + 1;
  // }

  // console.log(alert);

  // await context.app.service("stations").patch(stationId, { alert });

  //2. Update device's status
  const deviceId = context.result.device._id;
  await context.app.service("devices").patch(deviceId, { status: "ALARM" });

  return context;
};

const onAlertRemoved = async (context) => {
  //1. Update stations' number of potential alert and confirmed alert  - NOT REQUIRED ANYMORE
  // const stationId = context.result.station._id;
  // const type = context.result.type;
  // const system = context.result.system;

  // let { alert } = await context.app.service("stations").get(stationId);

  // if (type == "P") {
  //   alert[system]["potentialAlert"] = alert[system]["potentialAlert"] - 1;
  // } else if (type == "C") {
  //   alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] - 1;
  // }

  // console.log(alert);

  // await context.app.service("stations").patch(stationId, { alert });

  //2. Update device's status
  const deviceId = context.result.device._id;
  await context.app.service("devices").patch(deviceId, { status: "Normal" });

  return context;
};

const onAlertUpdated = async (context) => {
  const status = context.data.status;
  //1. Update stations' number of potential alert and confirmed alert  - NOT REQUIRED ANYMORE
  // const stationId = context.result.station._id;
  // const type = context.data.type;
  // const system = context.result.system;

  // let { alert } = await context.app.service("stations").get(stationId);

  // //GET original alert before updated
  // const originalType = context.data.originalAlertType;
  // //END GET
  // console.log({ originalType });

  // if (type == "P") {
  //   alert[system]["potentialAlert"] = alert[system]["potentialAlert"] + 1;

  //   if (originalType == "P") {
  //     alert[system]["potentialAlert"] = alert[system]["potentialAlert"] - 1;
  //   } else if (originalType == "C") {
  //     alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] - 1;
  //   }
  // } else if (type == "C") {
  //   alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] + 1;

  //   if (originalType == "P") {
  //     alert[system]["potentialAlert"] = alert[system]["potentialAlert"] - 1;
  //   } else if (originalType == "C") {
  //     alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] - 1;
  //   }
  // }

  // //UPDATE count due to alert status is changed to other than N
  // if (status == "I" || status == "D" || status == "R" || status == "F") {
  //   if (originalType == "P") {
  //     alert[system]["potentialAlert"] = alert[system]["potentialAlert"] - 1;
  //   } else if (originalType == "C") {
  //     alert[system]["confirmedAlert"] = alert[system]["confirmedAlert"] - 1;
  //   }
  // }
  //END UPDATE

  // await context.app.service("stations").patch(stationId, { alert });

  //2. Update device's status
  if (status == "I" || status == "D" || status == "R" || status == "F") {
    const deviceId = context.result.device._id;
    await context.app.service("devices").patch(deviceId, { status: "Normal" });
  }

  return context;
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [getOriginalAlertType],
    patch: [getOriginalAlertType],
    remove: []
  },

  after: {
    all: [fastJoin(fastResolver, query)],
    find: [],
    get: [],
    create: [onAlertCreated],
    update: [onAlertUpdated],
    patch: [onAlertUpdated],
    remove: [onAlertRemoved]
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
