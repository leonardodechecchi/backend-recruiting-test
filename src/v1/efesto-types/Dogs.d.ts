
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace DogsTypes {
      
    type GetParams = {}
    type GetQuery = {}
    type GetResponseBody = Efesto.Dog[];
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
    
    type PostParams = {}
    type PostQuery = {}
    type PostResponseBody = Efesto.Dog;
    type PostRequestBody = Efesto.DogRegistration;

    type PostRequest<Params = PostParams, ReqQuery = PostQuery, ReqBody = PostRequestBody> = Request<
      Params,
      {},
      ReqBody,
      ReqQuery
    >;

    type PostReturnBaseType = Response<PostResponseBody> | PostResponseBody;
    type PostResponse = Response<PostResponseBody>;
    type PostReturn = Promise<PostReturnBaseType> | PostReturnBaseType | void;
    
    }
  }

  export {}
  