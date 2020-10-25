// stations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = "Stations";
  const mongooseClient = app.get("mongooseClient");
  const { Schema } = mongooseClient;

  const totalAlert = new Schema({
    _id: false,
    confirmedAlert: { type: Number, default: 0 },
    potentialAlert: { type: Number, default: 0 }
  });

  const schema = new Schema(
    {
      name: { type: String, required: true },
      tag: { type: String },
      type: { type: String, required: true },
      address: { type: String, required: true },
      region: { type: String, required: true },
      cat: { type: Number },
      location: [Number],
      maintenanceStatus: { type: String, required: true },
      personnel: { type: String, required: true },
      personnelContact: { type: String, required: true },
      alert: {
        CCTV: { type: totalAlert },
        BACS: { type: totalAlert },
        FIDS: { type: totalAlert },
        HEARTBEAT: { type: totalAlert },
        UPS: { type: totalAlert },
        NVR: { type: totalAlert },
        PA: { type: totalAlert }
      },
      visitorCount: { type: Number, default: 0 },
      noOfLogin: { type: Number, default: 0 },
      pa_system_off: { type: Boolean, default: false },
      fids_system_off: { type: Boolean, default: false },
      bacs_system_off: { type: Boolean, default: false },
      cctv_system_off: { type: Boolean, default: false },
      pa_disarm_until: { type: Date },
      fids_disarm_until: { type: Date },
      bacs_disarm_until: { type: Date },
      cctv_disarm_until: { type: Date },
      remarks: { type: String },
      lastCompleteChecked: { type: Date }
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
