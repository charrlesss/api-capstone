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
exports.makeAppointmentRequest = void 0;
const express_1 = require("express");
const visitor_type_1 = require("../model/methods/visitor-type");
exports.makeAppointmentRequest = (0, express_1.Router)();
exports.makeAppointmentRequest.get("/visitor-types", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        data: {
            message: "fetch successfully",
            data: yield (0, visitor_type_1.get_visitor_types)(),
            success: false,
        },
    });
}));
