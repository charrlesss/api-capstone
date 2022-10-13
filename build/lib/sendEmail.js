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
exports.sendEmailToVerifyAccount = exports.sendEmailToChangePassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
function sendEmailToChangePassword(email, link) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.SYSTEM_USERNAME,
                pass: process.env.SYSTEM_SECRET,
            },
        });
        var mailOptions = {
            from: "andrecoso09@gmail.com",
            to: email,
            subject: "Online Voting System",
            text: "Content-type:application/json",
            html: `
            <h3>Hi from Freight Admninistrative System  ${email}</h3>
                <h3>Clcik this link to change your password</h3> 
            <p>
             ${link}
             </p>
      
         `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    });
}
exports.sendEmailToChangePassword = sendEmailToChangePassword;
function sendEmailToVerifyAccount(email, code) {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer_1.default.createTransport({
            service: "gmail",
            secure: false,
            auth: {
                user: process.env.SYSTEM_USERNAME,
                pass: process.env.SYSTEM_SECRET,
            },
        });
        var mailOptions = {
            from: "andrecoso09@gmail.com",
            to: email,
            subject: "Online Voting System",
            text: "Content-type:application/json",
            html: `
            <h3>Hi from Freight Admninistrative System  ${email}</h3>
                <h3>Clcik this link to change your password</h3> 
            <p> 
             ${code}
             </p>
      
         `,
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            }
            else {
                console.log("Email sent: " + info.response);
            }
        });
    });
}
exports.sendEmailToVerifyAccount = sendEmailToVerifyAccount;
