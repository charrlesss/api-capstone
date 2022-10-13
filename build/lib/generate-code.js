"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCode = void 0;
function generateCode() {
    let code = "";
    while (code.length < 5) {
        const randomNumber = Math.floor(Math.random() * 9);
        if (code.indexOf(randomNumber.toString()) === -1) {
            code = code + randomNumber;
        }
    }
    const genCode = code;
    return genCode;
}
exports.generateCode = generateCode;
;
