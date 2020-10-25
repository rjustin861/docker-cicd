// device-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "Devices";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      name: { type: String, required: true },
      description: { type: String },
      category: { type: String, required: true },
      type: { type: String }, //MG - Main Gate, CRM - Control Room, SRM - Switch Room
      model: { type: String },
      canControl: { type: String, default: "N" },
      isFR: { type: String },
      health: { type: String, required: true },
      status: { type: String, required: true },
      zone: { type: String },
      station: { type: "ObjectId", required: true, ref: "stations" },
      related: [{ type: "ObjectId" }],
      externalId: { type: String },
      sourceType: { type: String },
      sourceName: { type: String },
      wgInputId: { type: String },
      wgOutputId: { type: String },
      wgAlarmId: { type: String }
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
