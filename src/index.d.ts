import type { PureAbility } from "@casl/ability";
import type { IUser } from "./models/User";

declare global {
  declare namespace Express {
    export interface Request {
      user: IUser;
      ability: PureAbility;
    }
  }
}
