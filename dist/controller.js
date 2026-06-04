"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controllers = void 0;
const mongodb_1 = require("mongodb");
const zod_1 = require("./zod");
const _1 = require(".");
const CreateGetController = (method) => {
    return async (req, res) => {
        try {
            let Mongod = await _1.Mongodb.connect();
            let client = Mongod.db();
            const dbresponse = [];
            for (let action of method.definition || []) {
                if (!client.collection(action.collection)[action.action])
                    return;
                //@ts-ignore
                const qr = await client.collection(action.collection)[action.action]({}).toArray();
                dbresponse.push(qr);
            }
            return res.json(dbresponse);
        }
        catch (error) {
            console.error("Error in Get Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};
const CreatePostController = (method) => {
    return async (req, res) => {
        try {
            let Mongod = await _1.Mongodb.connect();
            let client = Mongod.db();
            const dbresponse = [];
            const dataschema = (0, zod_1.ParseSchema)(method.RequestBody?.schema);
            if (!dataschema) {
                return res.status(500).json({
                    errors: ["Schema not found"],
                    helper: "Please recheck your databaseSchema or requestSchema"
                });
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
                const qr = await client.collection(action.collection)[action.action](ParsedData.data);
                dbresponse.push(qr);
            }
            return res.json(dbresponse);
        }
        catch (error) {
            console.error("Error in Post Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};
const CreatePutController = (method) => {
    return async (req, res) => {
        try {
            let Mongod = await _1.Mongodb.connect();
            let client = Mongod.db();
            const dataschema = (0, zod_1.ParseSchema)(method.RequestBody?.schema);
            if (!dataschema) {
                return res.status(500).json({
                    errors: ["Schema not found"],
                    helper: "Please recheck your databaseSchema or requestSchema"
                });
            }
            const ParsedData = dataschema.safeParse(req.body);
            if (ParsedData?.error || !ParsedData) {
                return res.status(400).json({
                    helper: "Please make sure the request body aligns well with our standards and your definition",
                    errors: ParsedData?.error.issues,
                });
            }
            const dbresponse = [];
            const data = ParsedData.data;
            for (let action of method.definition) {
                //@ts-ignore
                const col = client.collection(action.collection);
                const query = col[action.action].bind(col);
                const qr = await query({
                    _id: new mongodb_1.ObjectId(req.params.id)
                }, { $set: data });
                dbresponse.push(qr);
            }
            return res.json(dbresponse);
        }
        catch (error) {
            console.error("Error in Put Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};
const CreateDeleteController = (method) => {
    return async (req, res) => {
        try {
            let Mongod = await _1.Mongodb.connect();
            let client = Mongod.db();
            const dbres = [];
            for (let action of method.definition) {
                //@ts-ignore 
                const col = client.collection(action.collection);
                const query = col[action.action].bind(col);
                const qr = await query({
                    _id: new mongodb_1.ObjectId(req.params.id)
                });
                // await client.collection("movies").deleteOne({ _id: new ObjectId('678b81742bd2e51d5e02c9f9') })
                dbres.push(qr);
            }
            return res.json([]);
        }
        catch (error) {
            console.error("Error in Delete Controller:", error);
            return res.status(500).json({ errors: ["unknown error"] });
        }
    };
};
exports.Controllers = {
    GET: CreateGetController,
    POST: CreatePostController,
    PUT: CreatePutController,
    DELETE: CreateDeleteController,
};
