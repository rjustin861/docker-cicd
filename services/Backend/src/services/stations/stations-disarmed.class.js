const { Service } = require("feathers-mongoose");

exports.StationsDisarmed = class StationsDisarmed extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async find() {
    const stations = await this.app.service("stations").find();
    let results = {
      BACS: {
        total: 0,
        stations: []
      },
      CCTV: {
        total: 0,
        stations: []
      },
      FIDS: {
        total: 0,
        stations: []
      },
      PA: {
        total: 0,
        stations: []
      }
    };
    for (let {
      _id,
      name,
      bacs_system_off,
      cctv_system_off,
      fids_system_off,
      pa_system_off
    } of stations.data) {
      const station = { _id, name };
      if (bacs_system_off) {
        results["BACS"].total = results["BACS"].total + 1;
        results["BACS"].stations = [...results["BACS"].stations, station];
      }
      if (cctv_system_off) {
        results["CCTV"].total = results["CCTV"].total + 1;
        results["CCTV"].stations = [...results["CCTV"].stations, station];
      }
      if (fids_system_off) {
        results["FIDS"].total = results["FIDS"].total + 1;
        results["FIDS"].stations = [...results["FIDS"].stations, station];
      }
      if (pa_system_off) {
        results["PA"].total = results["PA"].total + 1;
        results["PA"].stations = [...results["PA"].stations, station];
      }
    }
    return results;
  }
};
