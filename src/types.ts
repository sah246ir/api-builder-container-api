import { Collection } from "mongodb";
import z from "zod";

export type Query = {
    type: "find";
    collection: string;
};

export type ResponseFromDb = {
    key: string;
    query: Query;
};

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export type BaseMethod = {
    method: HttpMethod;
    response?: Object;
};
  
export type TypeEnum = "string" | "boolean" | "number" | any[]
export interface FieldSchema{
    field: string,
    array?: boolean,
    required?: boolean,
    type:TypeEnum
} 
interface RouteDefinition{
    action:keyof Collection<Document>,
    filterBy?:{
        type:TypeEnum,
        field:string,
        required?:boolean
    }[],
    collection:string
}

export type ApiEndpoint = {
    endpoint: string;
    definition: RouteDefinition[];
    method: HttpMethod;
    RequestBody?: {
        schema: FieldSchema[];
    } | null
    QueryParams?:{
        schema: FieldSchema[];
    } | null
}
export type ApiRouteDefinition = {
    endpoint: string;
    ApiEndpoint: ApiEndpoint[]
}

export type SchemaType = FieldSchema[];

export type Field = {
    name: string;
    type: "string" | "number" | SchemaType; 
    optional?:boolean  
}  