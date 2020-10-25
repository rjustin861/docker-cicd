const { Service } = require("feathers-mongoose");

exports.DeviceConnected = class DeviceConnected extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async find() {
    const query = [
      {
        $group: {
          _id: { category: "$category", health: "$health" },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.category",
          healths: {
            $push: {
              health: "$_id.health",
              count: "$count"
            }
          },
          count: { $sum: "$count" }
        }
      },
      { $sort: { count: -1 } },
      {
        $project: {
          healths: { $slice: ["$healths", 2] },
          count: 1
        }
      }
    ];
    const numbers = await this.app.service("devices").Model.aggregate(query);

    return numbers;
  }
};
