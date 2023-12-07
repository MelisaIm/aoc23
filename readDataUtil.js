"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readDataUtil(path, splitBy) {
    return fs.readFileSync(path, 'utf-8').split(splitBy || "\n");
}
exports.default = readDataUtil;
//# sourceMappingURL=readDataUtil.js.map