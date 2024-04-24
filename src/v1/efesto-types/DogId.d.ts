
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace DogIdTypes {
      
    type GetParams = {dogId: string}
    type GetQuery = {}
    type GetResponseBody = Efesto.Dog;
    type GetRequestBody = any;

    type GetRequest<Params = GetParams, ReqQuery = GetQuery, ReqBody = GetRequestBody> = Request<
      Params,
      {},
      ReqBody,
      ReqQuery
    >;

    type GetReturnBaseType = Response<GetResponseBody> | GetResponseBody;
    type GetResponse = Response<GetResponseBody>;
    type GetReturn = Promise<GetReturnBaseType> | GetReturnBaseType | void;
    
    }
  }

  export {}
  