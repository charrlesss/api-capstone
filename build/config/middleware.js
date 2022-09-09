"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const midlewareRoutes = (0, express_1.Router)();
midlewareRoutes.use((0, express_1.json)());
midlewareRoutes.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
exports.default = midlewareRoutes;
