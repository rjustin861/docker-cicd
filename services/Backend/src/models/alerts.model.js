// alerts-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "Alerts";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      text: { type: String, required: true },
      system: [{ type: String, required: true }],
      date: { type: Date, default: Date.now },
      status: { type: String, default: "N", ref: "statusType" },
      type: { type: String, required: true },
      severity: { type: String, required: true },
      remarks: { type: String },
      station: {
        type: "ObjectId",
        required: true,
        ref: "stations",
      },
      device: {
        type: "ObjectId",
        required: true,
        ref: "devices",
      },
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
