// dashboardTemplate-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "dashboardTemplate";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const component = new Schema({
    componentName: { type: String, required: true },
    col: { type: Number, required: true },
    width: { type: Number, required: true },
    posX: { type: Number, required: true },
    posY: { type: Number, required: true },
    bgImage: { type: String, required: true },
    remarks: { type: String }
  });

  const schema = new Schema(
    {
      components: [{ type: component, required: true }],
      station: { type: "ObjectId", required: true, ref: "stations" },
      duration: { type: Number, default: 5 }
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
