// reports-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = "reports";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const progress = new Schema({
    status: { type: String, required: true },
    text: { type: String },
    updatedBy: { type: "ObjectId", required: true, ref: "personnel" },
    updatedDate: { type: Date, default: Date.now }
  });

  const schema = new Schema(
    {
      type: { type: "ObjectId", required: true, ref: "reportsType" },
      status: { type: String },
      system: [{ type: String, required: true }],
      device: { type: "ObjectId", required: true, ref: "devices" },
      station: { type: "ObjectId", required: true, ref: "stations" },
      reportedBy: { type: "ObjectId", required: true, ref: "personnel" },
      severity: { type: String, required: true },
      alertId: { type: "ObjectId" },
      progress: [{ type: progress, required: true }]
    },
    {
      timestamps: true
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);
};
