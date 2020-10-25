const postCmdActionService = require("./services/postCmdActionService");
const postCmdBadgeService = require("./services/postCmdBadgeService");
const postServerHBService = require("./services/postServerHBService");
const postIOSnapshotService = require("./services/postIOSnapshotService");
const postHistMsgService = require("./services/postHistMsgService");
const postHistAccessLogService = require("./services/postHistAccessLogService");

// This is the routes for API that is provided by Data Aggregation Server
module.exports = function (app) {
  //5.4.1	Action Message
  app.post("/postCmdAction", postCmdActionService);

  //5.4.2	Card Access Action Message
  app.post("/postCmdBadge", postCmdBadgeService);

  //5.4.3	Aggregation Server Heartbeat Message
  app.post("/postServerHB", postServerHBService);

  //5.4.4	IO Snapshot Message
  app.post("/postIOSnapshot", postIOSnapshotService);

  //5.4.5	History Alarm Message
  app.post("/postHistMsg", postHistMsgService);

  //5.4.6	History Access Log
  app.post("/postHistAccessLog", postHistAccessLogService);
};
