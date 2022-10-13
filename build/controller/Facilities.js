"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilities = void 0;
const express_1 = require("express");
const jwt_1 = require("../third-party/jwt");
const facilities_1 = require("../model/methods/facilities");
exports.facilities = (0, express_1.Router)();
exports.facilities.get("/facilities", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield (0, facilities_1.get_facilities)());
}));
