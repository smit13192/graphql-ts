import {
    Query,
    Request,
    ParamsDictionary,
    Response,
    Send,
  } from "express-serve-static-core";
  
  export interface TypeRequestBody<Body> extends Request {
    body: Body;
  }
  
  export interface TypeRequestQuery<T extends Query> extends Request {
    query: T;
  }
  
  export interface TypeRequestQueryBody<T extends Query, Body> extends Request {
    query: T;
    body: Body;
  }
  
  export interface TypeRequestParams<P extends ParamsDictionary> extends Request {
    params: P;
  }
  
  export interface TypeRequestParamsBody<P extends ParamsDictionary, Body>
    extends Request {
    params: P;
    body: Body;
  }
  
  export interface TypeResponseJson<ResBody = any> extends Response {
    json: Send<ResBody, this>;
  }
  
  export interface ResponseType<D = any> {
    success: boolean;
    data?: D;
    message?: string;
    token?: string;
  }
  