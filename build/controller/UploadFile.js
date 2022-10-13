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
exports.uploadfile = void 0;
const express_1 = require("express");
const jwt_1 = require("../third-party/jwt");
const uuid_1 = require("uuid");
exports.uploadfile = (0, express_1.Router)();
exports.uploadfile.post("/upload-file", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const profile = (_a = req.files) === null || _a === void 0 ? void 0 : _a.updloadProfile;
    const filename = (0, uuid_1.v4)();
    const mimetype = profile === null || profile === void 0 ? void 0 : profile.mimetype.split("/")[1];
    const file = `${filename}.${mimetype}`;
    req.session.profile = file;
    profile === null || profile === void 0 ? void 0 : profile.mv(`./assets/upload-photo/${file}`, function (err) {
        if (err)
            return res.json({
                data: { filename: undefined, message: err, success: false },
            });
    });
    res.json({
        data: { filename: file, message: "successfully upload", success: true },
    });
}));
