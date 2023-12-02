"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function readDataUtil(path, splitBy) {
    return fs.readFileSync(path, 'utf-8').split(splitBy || "\n");
}
exports.default = readDataUtil;
