"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Module
const express_1 = require("express");
const router = express_1.Router();
const getData_controller_1 = __importDefault(require("./controllers/getData.controller"));
const allData = new getData_controller_1.default();
//home
router.get("/", (_, res) => {
    res.send({ message: "Welcome Search" });
});
router.post("/search", allData.handle);
exports.default = router;
//# sourceMappingURL=routes.js.map