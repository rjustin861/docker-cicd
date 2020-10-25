// eventsLog-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "eventsLog";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      station: { type: "ObjectId", required: true, ref: "stations" },
      description: { type: String, required: true },
      point: { type: "ObjectId", required: true, ref: "pointType" },
      device: { type: "ObjectId", required: true, ref: "devices" },
      severity: { type: String, required: true },
      ackTime: { type: Date },
      ackUser: { type: "ObjectId", ref: "personnel" },
      alert: { type: "ObjectId" },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
