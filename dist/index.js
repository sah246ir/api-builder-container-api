"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mongodb = exports.client = exports.MONGO_URI = exports.clients = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_headers_1 = require("./Middlewares/cors-headers");
const dotenv_1 = require("dotenv");
const router_1 = require("./router");
const mongodb_1 = require("mongodb");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
// initialize services
exports.clients = (process.env.CLIENTS || "").split(",");
exports.MONGO_URI = process.env.MONGO_URI || "";
exports.Mongodb = new mongodb_1.MongoClient(exports.MONGO_URI, { directConnection: true });
app.use((0, cors_1.default)({
    origin: exports.clients,
    credentials: true
}));
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// custom headers
app.use(cors_headers_1.corsHeaders);
// routes
app.use("/", router_1.IndexRouter);
// server listen
const server = app.listen(process.env.PORT, () => {
    console.log("server listening on http://localhost:" + process.env.PORT);
});
