"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseSchema = void 0;
const zod_1 = require("zod");
const ParseSchema = (obj) => {
    if (!obj)
        return undefined;
    const schema = {};
    for (let prop of obj) {
        if (Array.isArray(prop.type)) {
            schema[prop.field] = (0, exports.ParseSchema)(prop.type);
        }
        else {
            schema[prop.field] = !prop.required ? zod_1.z[prop.type]().optional() : zod_1.z[prop.type]();
        }
    }
    return zod_1.z.object(schema);
};
exports.ParseSchema = ParseSchema;
// export const CreateDbSchema = (db:SchemaType)=>{
//     const schema:Record<string,ZodObject<any>> = {}
//     for(let collection of db){
//         schema[collection.collection] = ParseSchema(collection.schema)
//     } 
//     return schema
// }
