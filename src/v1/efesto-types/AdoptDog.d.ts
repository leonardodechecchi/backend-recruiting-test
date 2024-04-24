
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace AdoptDogTypes {
      
    type PutParams = {dogId: string}
    type PutQuery = {}
    type PutResponseBody = Efesto.Dog;
    type PutRequestBody = any;

    type PutRequest<Params = PutParams, ReqQuery = PutQuery, ReqBody = PutRequestBody> = Request<
      Params,
      {},
      ReqBody,
      ReqQuery
    >;

    type PutReturnBaseType = Response<PutResponseBody> | PutResponseBody;
    type PutResponse = Response<PutResponseBody>;
    type PutReturn = Promise<PutReturnBaseType> | PutReturnBaseType | void;
    
    }
  }

  export {}
  