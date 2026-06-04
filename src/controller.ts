import { ObjectId } from "mongodb";
import { HttpMethod, ApiEndpoint } from "./types";
import { Response, Request } from "express";
import { ParseSchema } from "./zod";
import z from "zod";
import { Mongodb } from ".";
import { mongoSafe } from "./utile";
const CreateGetController = (method: ApiEndpoint) => {
    return async (req: Request, res: Response) => {
        try {
            let Mongod = await Mongodb.connect()
            let client = Mongod.db()
            const dbresponse: any[] = [];
            for (let action of method.definition || []) {
                console.log(action)
                if (!client.collection(action.collection)[action.action]) return
                //@ts-ignore
                const col = client.collection(action.collection)
                const query = col[action.action as "find"].bind(col) 
                const qr = await query({})
                const data = await qr.toArray()
                dbresponse.push(data)
            }
            return res.json(mongoSafe(dbresponse));
        } catch (error) {
            console.error("Error in Get Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};

const CreatePostController = (method: ApiEndpoint) => {
    return async (req: Request, res: Response) => {
        try {
            let Mongod = await Mongodb.connect()
            let client = Mongod.db()
            const dbresponse: any[] = [];
            const dataschema = ParseSchema(method.RequestBody?.schema)
            console.log(dataschema,method.RequestBody)
            if (!dataschema) {
                return res.status(500).json({
                    errors: ["Schema not found"],
                    helper: "Please recheck your databaseSchema or requestSchema"
                })
            } 
            const ParsedData = dataschema?.safeParse(req.body);
            if (ParsedData?.error || !ParsedData.data) {
                return res.status(400).json({
                    helper: "Please make sure the request body aligns well with our standards and your definition",
                    errors: ParsedData?.error.issues || ["request body is empty"],
                });
            }
            for (let action of method.definition) {
                //@ts-ignore
                const col = client.collection(action.collection)
                const query = col[action.action as "insertOne"].bind(col) 
                const qr = await query(ParsedData.data)
                dbresponse.push(qr)
            }
            return res.json(mongoSafe(dbresponse));
        } catch (error) {
            console.error("Error in Post Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};

const CreatePutController = (method: ApiEndpoint) => {
    return async (req: Request, res: Response) => {
        try {
            let Mongod = await Mongodb.connect()
            let client = Mongod.db()
            const dataschema = ParseSchema(method.RequestBody?.schema)
            if (!dataschema) {
                return res.status(500).json({
                    errors: ["Schema not found"],
                    helper: "Please recheck your databaseSchema or requestSchema"
                })
            }
            const ParsedData = dataschema.safeParse(req.body);
            if (ParsedData?.error || !ParsedData) {
                return res.status(400).json({
                    helper: "Please make sure the request body aligns well with our standards and your definition",
                    errors: ParsedData?.error.issues,
                });
            }
            const dbresponse: any[] = [];
            const data = ParsedData.data;
            for (let action of method.definition) {
                //@ts-ignore
                const col = client.collection(action.collection)
                const query = col[action.action as "updateOne"].bind(col) 
                const qr = await query({
                    _id:new ObjectId(req.params.id)
                },{$set:data})
                dbresponse.push(qr)
            }
            return res.json(dbresponse);
        } catch (error) {
            console.error("Error in Put Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};

const CreatePatchController = (method: ApiEndpoint) => {
    return async (req: Request, res: Response) => {
        try {
            let Mongod = await Mongodb.connect()
            let client = Mongod.db()
            const dataschema = ParseSchema(method.RequestBody?.schema)
            if (!dataschema) {
                return res.status(500).json({
                    errors: ["Schema not found"],
                    helper: "Please recheck your databaseSchema or requestSchema"
                })
            }
            const ParsedData = dataschema.safeParse(req.body);
            if (ParsedData?.error || !ParsedData) {
                return res.status(400).json({
                    helper: "Please make sure the request body aligns well with our standards and your definition",
                    errors: ParsedData?.error.issues,
                });
            }
            const dbresponse: any[] = [];
            const data = ParsedData.data;
            for (let action of method.definition) {
                //@ts-ignore
                const col = client.collection(action.collection)
                const query = col[action.action as "updateOne"].bind(col) 
                const qr = await query({
                    _id:new ObjectId(req.params.id)
                },{$set:data})
                dbresponse.push(qr)
            }
            return res.json(dbresponse);
        } catch (error) {
            console.error("Error in Put Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};

const CreateDeleteController = (method: ApiEndpoint) => {
    return async (req: Request, res: Response) => {
        try {
            let Mongod = await Mongodb.connect()
            let client = Mongod.db()
            const dbres = []
            for (let action of method.definition) { 
                //@ts-ignore 
                const col = client.collection(action.collection)
                const query = col[action.action as "deleteOne"].bind(col) 
                const qr = await query({
                    _id:new ObjectId(req.params.id)
                })
                // await client.collection("movies").deleteOne({ _id: new ObjectId('678b81742bd2e51d5e02c9f9') })
                dbres.push(qr)
            }
            return res.json( []);
        } catch (error) {
            console.error("Error in Delete Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};

type ControllerMap = {
    [K in HttpMethod]: (method: ApiEndpoint) => any;
};

export const Controllers: ControllerMap = {
    GET: CreateGetController,
    POST: CreatePostController,
    PUT: CreatePutController,
    DELETE: CreateDeleteController, 
    PATCH: CreatePatchController,
};
