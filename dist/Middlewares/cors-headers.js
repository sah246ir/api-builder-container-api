"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsHeaders = void 0;
const __1 = require("..");
function corsHeaders(req, res, next) {
    res.header('Access-Control-Allow-Origin', ...__1.clients);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
}
exports.corsHeaders = corsHeaders;
