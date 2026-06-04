"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexRouter = void 0;
const express_1 = require("express");
const api_1 = require("./api");
const controller_1 = require("./controller");
exports.IndexRouter = (0, express_1.Router)();
for (let route of api_1.apiRouteDefinition.ApiEndpoint) {
    const method = exports.IndexRouter[route.method.toLowerCase()].bind(exports.IndexRouter);
    const output = route.endpoint.replace(/\{(\w+)\}/g, ":$1");
    method(output, controller_1.Controllers[route.method](route));
}
