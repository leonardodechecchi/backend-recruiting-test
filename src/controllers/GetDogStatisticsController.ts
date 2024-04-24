import { Request, Response } from "express";
import { BaseController } from "./BaseController";
import Dog from "../models/Dog";

class GetDogStatisticsController extends BaseController {
  protected async executeImpl(_: Request, response: Response): Promise<void> {
    const result = await Dog.aggregate([
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

    return this.ok(response, result);
  }
}

export { GetDogStatisticsController };
