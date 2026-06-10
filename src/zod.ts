import {z, ZodObject, ZodType} from "zod"
import { SchemaType } from "./types";
export const ParseSchema = (obj?:SchemaType)=>{
    if(!obj) return undefined
    const schema: Record<string, any> = {};
    for(let prop of obj){
        if(Array.isArray(prop.type)){
            if(prop.array === true){
                schema[prop.field] = z.array(ParseSchema(prop.type) as ZodType<any>)
            }
            else{
                schema[prop.field] = ParseSchema(prop.type) as ZodType<any>
            }
        }
        else{
            schema[prop.field] = !prop.required?z[prop.type]().optional():z[prop.type]({required_error:prop.field+" is required"})
        }
    }
    return z.object(schema)
}

// export const CreateDbSchema = (db:SchemaType)=>{
//     const schema:Record<string,ZodObject<any>> = {}
//     for(let collection of db){
//         schema[collection.collection] = ParseSchema(collection.schema)
//     } 
//     return schema
// }