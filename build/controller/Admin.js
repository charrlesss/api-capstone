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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const express_1 = require("express");
const admin_1 = require("../model/methods/admin");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../third-party/jwt");
exports.admin = (0, express_1.Router)();
exports.admin.post("/auth-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body);
    const user = yield (0, admin_1.get_admin_from_email)(req.body.email);
    if (!user) {
        return res.json({
            data: {
                message: "No user with that email",
                success: false,
            },
        });
    }
    try {
        if (yield bcryptjs_1.default.compare(req.body.password, user.password)) {
            (_a = user.loginAt) === null || _a === void 0 ? void 0 : _a.push(`${new Date().toLocaleString()}`);
            yield user.save();
            const _id = user._id;
            const ACCESS_TOKEN = (0, jwt_1.generateAccessToken)({ id: _id });
            const REFRESH_TOKEN = (0, jwt_1.generateRefreshToken)({ id: _id });
            yield (0, admin_1.store_refreshToken_from_admin)(_id, REFRESH_TOKEN);
            const authUser = {
                _id,
                ACCESS_TOKEN,
                REFRESH_TOKEN,
            };
            req.session.admin = authUser;
            res.cookie('sidebar', 'open');
            return res.json({
                data: { message: "successfuly login.", success: true },
            });
        }
        else {
            return res.json({
                data: {
                    message: "Password incorrect",
                    success: false,
                },
            });
        }
    }
    catch (e) {
        return res.json({
            data: {
                message: `${e}`,
                success: false,
            },
        });
    }
}));
exports.admin.get("/authenticated-admin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.session.admin) {
        return res.json({
            data: {
                message: "Authorise User",
                data: req.session.admin,
                success: true,
            },
        });
    }
    return res.json({
        data: {
            message: "Not Authorize User",
            data: { _id: "", ACCESS_TOKEN: "", REFRESH_TOKEN: "" },
            success: false,
        },
    });
}));
exports.admin.get("/get-admin-details", jwt_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    return res.json({
        data: {
            message: "Not Authorize User",
            data: yield (0, admin_1.get_admin_from_id)((_b = req.session.admin) === null || _b === void 0 ? void 0 : _b._id),
            success: false,
        },
    });
}));
