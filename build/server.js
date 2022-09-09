"use strict";
// const express = require("express");
// require("dotenv").config();
// const connectDB = require("./connect.db.js");
// const getAllProducts = require("./model/methods/get-all-products.js");
// const cors = require('cors')
// const app = express();
// const PORT = 4000;
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
// async function main() {
//   try {
//     app.use(express.json())
//     app.use(cors({origin:"http://localhost:3000" , credentials:true}))
//     app.get("/",async (req, res) => {
//       res.json(await getAllProducts());
//     });
//     await connectDB();
//     app.listen(process.env.PORT || PORT, () =>
//       console.log(`listen in port ${PORT}`)
//     )
//   } catch (err) {
//     console.log(err);
//   }
// }
// main();
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connect_db_1 = __importDefault(require("./connect.db"));
const get_all_products_1 = __importDefault(require("./model/methods/get-all-products"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 4000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.use(express_1.default.json());
            app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
            app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.json(yield (0, get_all_products_1.default)());
            }));
            yield (0, connect_db_1.default)();
            app.listen(process.env.PORT || PORT, () => {
                console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
            });
        }
        catch (err) {
            console.log(err);
        }
    });
}
main();
