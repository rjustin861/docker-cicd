// floorplans-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "floorplan2d";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const floorplan = new Schema({
    level: { type: String, required: true },
    imagePath: { type: String, required: true },
    bounding: [[Number]],
    geoInfo: { type: "ObjectId", ref: "geoInfo" },
    devices: [{ type: "ObjectId", required: true, ref: "floorplanDevices" }],
  });
  const schema = new Schema(
    {
      building: { type: String },
      floorplan: [{ type: floorplan, required: true }],
      station: {
        type: "ObjectId",
        required: true,
        ref: "stations",
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
