"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const options = {
    method: "GET",
    headers: { Accept: "application/json; charset=utf-8" },
};
function query(Query) {
    const url = `https://apiexamples.vtexcommercestable.com.br/api/catalog_system/pub/products/search/?ft=${Query}`;
    const Api = node_fetch_1.default(url, options);
    return Api.then((res) => res.json())
        .then((json) => json)
        .catch((err) => console.error("______error_____:" + err));
}
exports.query = query;
//# sourceMappingURL=api.vtx.js.map