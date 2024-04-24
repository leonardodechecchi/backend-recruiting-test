
  import type { Request, Response, NextFunction } from "express";

  declare global {
    namespace LoginTypes {
      
    type PostParams = {}
    type PostQuery = {}
    type PostResponseBody = Efesto.User;
    type PostRequestBody = Efesto.Registration;

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
  