"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Encryption_1 = __importDefault(require("./Encryption"));
function main() {
    const encrypt = Encryption_1.default('risk3sixty');
    return encrypt.decrypt('f78D2XXh8tnSc8a5/FE=:0LDv4U8TeV918C/NvPLOpA==');
}
console.log(main());
