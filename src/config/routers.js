"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Products_1 = __importDefault(require("../controller/Administrative/Products"));
const routes = (0, express_1.Router)();
routes.get("/products", Products_1.default);
exports.default = routes;
