const { Service } = require("feathers-mongoose");

exports.AlertsStats = class AlertsStats extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }

  async find() {
    const query = [
      {
        $match: {
          type: {
            $in: ["P", "C"]
          },
          status: "N"
        }
      },
      {
        $group: {
          _id: {
            station: "$station",
            system: "$system"
          },
          data: {
            $push: {
              type: "$type"
            }
          }
        }
      },
      {
        $project: {
          // item: 1,
          station: "$_id.station",
          system: { $arrayElemAt: ["$_id.system", 0] },
          confirmed: {
            $filter: {
              input: "$data",
              as: "data",
              cond: { $eq: ["$$data.type", "C"] }
            }
          },
          potential: {
            $filter: {
              input: "$data",
              as: "data",
              cond: { $eq: ["$$data.type", "P"] }
            }
          }
        }
      },
      {
        $project: {
          // item: 1,
          station: "$station",
          system: "$system",
          confirmedAlert: {
            $cond: {
              if: { $isArray: "$confirmed" },
              then: { $size: "$confirmed" },
              else: 0
            }
          },
          potentialAlert: {
            $cond: {
              if: { $isArray: "$potential" },
              then: { $size: "$potential" },
              else: 0
            }
          }
        }
      },
      {
        $group: {
          _id: "$station",
          alert: {
            $push: {
              k: "$system",
              v: {
                confirmedAlert: "$confirmedAlert",
                potentialAlert: "$potentialAlert"
              }
            }
          }
        }
      },
      {
        $project: {
          station: "$_id",
          _id: 0,
          alerts: { $arrayToObject: "$alert" }
        }
      },
      {
        $group: {
          _id: null,
          data: {
            $push: "$$ROOT"
          }
        }
      },
      {
        $project: {
          _id: 0,
          data: {
            $arrayToObject: {
              $map: {
                input: "$data",
                as: "el",
                in: {
                  k: {
                    $toString: "$$el.station"
                  },
                  v: {
                    alerts: "$$el.alerts"
                  }
                }
              }
            }
          }
        }
      }
    ];

    // const query = [
    //   {
    //     $match: {
    //       type: { $in: ["P", "C"] },
    //       status: "N"
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: { station: "$station", system: "$system", type: "$type" },
    //       count: { $sum: 1 }
    //     }
    //   },
    //   {
    //     $group: {
    //       _id: "$_id.station",
    //       systems: {
    //         $push: {
    //           system: { $arrayElemAt: ["$_id.system", 0] },
    //           data: {
    //             type: "$_id.type",
    //             count: "$count"
    //           }
    //         }
    //       }
    //     }
    //   }
    // {
    //   $project: {
    //     station: "$_id",
    //     _id: 0,
    //     data: { $arrayToObject: "$systems" }
    //   }
    //}
    //];
    // const alerts = await this.app.service("alerts").find({
    //   query: {
    //     type: "C",
    //     status: "N"
    //   }
    // })
    const alerts = await this.app.service("alerts").Model.aggregate(query);
    return alerts[0].data;
  }
};
