import { BaseApiService, SwaggerModel, SwaggerOptions } from "efesto";

import Dog from "../../../models/Dog";

type Aggregate = {
  _id: {
    createdAt: string;
    updatedAt: string;
  };
  available: number;
  adopted: number;
  in_custody: number;
};

// ennpoint: /api/v1/dogs/stats
class DogStats extends BaseApiService {
  constructor() {
    super(__filename);
  }

  swaggerModel: SwaggerModel = {
    modelName: "dogs",
    schemas: [
      {
        name: "Stats",
        properties: {
          _id: {
            type: "object",
            properties: {
              createdAt: {
                type: "string",
                format: "date",
              },
              updatedAt: {
                type: "string",
                format: "date",
              },
            },
          },
          available: "number",
          adopted: "number",
          in_custody: "number",
        },
        noTimestamps: true,
      },
    ],
  };

  _getSwagger: Omit<SwaggerOptions, "requestBody"> | undefined = {
    operationId: "getDogStats",
    summary: "Restituisce le statistiche giornaliere dei cani",
    responses: {
      200: "@Stats[]",
    },
  };

  async _get(
    req: DogStatsTypes.GetRequest,
    res: DogStatsTypes.GetResponse
  ): Promise<DogStatsTypes.GetReturn> {
    const result = await Dog.aggregate<Aggregate>([
      {
        $group: {
          _id: {
            createdAt: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
            updatedAt: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$updatedAt",
              },
            },
          },
          available: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "available"],
                },
                1,
                0,
              ],
            },
          },
          adopted: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "adopted"],
                },
                1,
                0,
              ],
            },
          },
          in_custody: {
            $sum: {
              $cond: [
                {
                  $eq: ["$status", "in-custody"],
                },
                1,
                0,
              ],
            },
          },
        },
      },
      {
        $sort: {
          "_id.createdAt": 1,
          "_id.updatedAt": 1,
        },
      },
    ]);

    return res.status(200).json(result);
  }
}

export default DogStats;
