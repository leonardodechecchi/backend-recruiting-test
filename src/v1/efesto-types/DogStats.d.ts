
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace DogStatsTypes {
      
    type GetParams = {}
    type GetQuery = {}
    type GetResponseBody = Efesto.Stats[];
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
  