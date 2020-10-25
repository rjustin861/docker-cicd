const postRTAlarmSchema = require("./schemas/postRTAlarmSchema");
const postRTStatusSchema = require("./schemas/postRTStatusSchema");
const postRTBadgeSchema = require("./schemas/postRTBadgeSchema");
const postReplyActionSchema = require("./schemas/postReplyActionSchema");
const postReplyBadgeSchema = require("./schemas/postReplyBadgeSchema");
const postInfoBadgeSchema = require("./schemas/postInfoBadgeSchema");
const postServerHBReplySchema = require("./schemas/postServerHBReplySchema");

const postRTAlarmService = require("./services/postRTAlarmService");
const postRTStatusService = require("./services/postRTStatusService");
const postRTBadgeService = require("./services/postRTBadgeService");
const postReplyActionService = require("./services/postReplyActionService");
const postReplyBadgeService = require("./services/postReplyBadgeService");
const postInfoBadgeService = require("./services/postInfoBadgeService");
const postServerHBReplyService = require("./services/postServerHBReplyService");

// This is the routes for API that is provided by C2
module.exports = function (app) {
  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  //5.3.1 Alarm Message
  app.post("/postRTAlarm", postRTAlarmSchema, postRTAlarmService);

  //5.3.2 Status Message
  app.post("/postRTStatus", postRTStatusSchema, postRTStatusService);

  //5.3.3 Card Access Event Message
  app.post("/postRTBadge", postRTBadgeSchema, postRTBadgeService);

  //5.3.4 Action Reply Message
  app.post("/postReplyAction", postReplyActionSchema, postReplyActionService);

  //5.3.5 Assign – UnAssign Card Reply message
  app.post("/postReplyBadge", postReplyBadgeSchema, postReplyBadgeService);

  //5.3.6 Card Reader Configuration Information
  app.post("/postInfoBadge", postInfoBadgeSchema, postInfoBadgeService);

  //5.3.7 Aggregation Server Heartbeat Reply Message
  app.post(
    "/postServerHBReply",
    postServerHBReplySchema,
    postServerHBReplyService
  );
};
