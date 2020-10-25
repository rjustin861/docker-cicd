// floorplans3d-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const modelName = "floorplan3d";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const static_3d = new Schema({
    _id: { type: String, required: true },
    objectName: { type: String, required: true },
    device: { type: "ObjectId", required: true, ref: "devices" }
  });

  const schema = new Schema(
    {
      path: { type: String, required: true },
      scene: { type: String, required: true },
      geoInfo: { type: "ObjectId", required: true, ref: "geoInfo" },
      static_3d: [{ type: static_3d, required: true }],
      devices_3d: [
        { type: "ObjectId", required: true, ref: "floorplanDevices" }
      ],
      station: { type: "ObjectId", required: true, ref: "stations" }
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
