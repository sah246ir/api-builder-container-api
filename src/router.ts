import { Router,Request,Response } from "express";
import { apiRouteDefinition } from "./api";
import { ParseSchema } from "./zod";
import { Controllers } from "./controller";

export const IndexRouter = Router()

for(let route of apiRouteDefinition.ApiEndpoint){
    const method = IndexRouter[route.method.toLowerCase() as "get"|"post"|"put"|"delete"].bind(IndexRouter)
    const output = apiRouteDefinition.endpoint + route.endpoint.replace(/\{(\w+)\}/g, ":$1");
    console.log(output)
    method(output,Controllers[route.method](route))
}
