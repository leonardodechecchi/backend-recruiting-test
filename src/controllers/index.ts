import { cacheService } from "../utils";
import { AddDogToCustodyController } from "./AddDogToCustodyController";
import { AdoptDogController } from "./AdoptDogController";
import { GetAllDogsController } from "./GetAllDogsController";
import { GetAllUsersController } from "./GetAllUsersController";
import { GetDogByIdController } from "./GetDogByIdController";
import { GetDogStatisticsController } from "./GetDogStatisticsController";
import { LoginController } from "./LoginController";
import { RegisterController } from "./RegisterController";
import { RegisterDogController } from "./RegisterDogController";
import { ReleaseDogFromCustodyController } from "./ReleaseDogFromCustodyController";

const getAllDogsController = new GetAllDogsController(cacheService);

const getDogByIdController = new GetDogByIdController();

const getDogStatistics = new GetDogStatisticsController();

const registerDogController = new RegisterDogController(cacheService);

const adoptDogController = new AdoptDogController(cacheService);

const addDogToCustodyController = new AddDogToCustodyController(cacheService);

const releaseDogFromCustodyController = new ReleaseDogFromCustodyController(
  cacheService
);

const loginController = new LoginController();
const registerController = new RegisterController();

const getAllUsersController = new GetAllUsersController();

export {
  getAllDogsController,
  getDogByIdController,
  getDogStatistics,
  registerDogController,
  adoptDogController,
  addDogToCustodyController,
  releaseDogFromCustodyController,
  loginController,
  registerController,
  getAllUsersController
};
