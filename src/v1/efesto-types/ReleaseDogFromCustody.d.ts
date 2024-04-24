
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace ReleaseDogFromCustodyTypes {
      
    type DeleteParams = {dogId: string}
    type DeleteQuery = {}
    type DeleteResponseBody = Efesto.Dog;
    type DeleteRequestBody = any;

    type DeleteRequest<Params = DeleteParams, ReqQuery = DeleteQuery, ReqBody = DeleteRequestBody> = Request<
      Params,
      {},
      ReqBody,
      ReqQuery
    >;

    type DeleteReturnBaseType = Response<DeleteResponseBody> | DeleteResponseBody;
    type DeleteResponse = Response<DeleteResponseBody>;
    type DeleteReturn = Promise<DeleteReturnBaseType> | DeleteReturnBaseType | void;
    
    }
  }

  export {}
  