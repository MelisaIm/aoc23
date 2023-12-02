"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readDataUtil_1 = require("./readDataUtil");
var data = (0, readDataUtil_1.default)('./puzzle1_input.txt');
var calibrationSum = 0;
function formLineValue(numbers) {
    if (numbers.length === 1) {
        return parseInt(numbers[0] + numbers[0]);
    }
    else {
        return parseInt(numbers[0] + numbers[numbers.length - 1]);
    }
}
function filterCalibrationValues() {
    data.forEach(function (line) {
        // find all the single integers 
        var numbers = line.match(/\d/g);
        // line could be null
        if (numbers) {
            calibrationSum += formLineValue(numbers);
        }
    });
}
filterCalibrationValues();
console.log(calibrationSum);
