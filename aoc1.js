"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readDataUtil_1 = require("./readDataUtil");
const INPUTFILE = './puzzle1_input.txt';
const SAMPLEINPUT = './puzzle1_sample.txt';
const SAMPLEINPUT2 = './puzzle1_2_sample.txt';
const TESTINPUT = './puzzle1_2_testingrgx.txt';
const data = (0, readDataUtil_1.default)(INPUTFILE);
let calibrationSum1 = 0;
let calibrationSum2 = 0;
function formLineValue(numbers) {
    if (numbers.length === 1) {
        return parseInt(numbers[0] + numbers[0]);
    }
    else {
        return parseInt(numbers[0] + numbers[numbers.length - 1]);
    }
}
function filterCalibrationValues() {
    data.forEach((line) => {
        // find all the single integers 
        const numbers = line.match(/\d/g);
        // line could be null
        if (numbers) {
            calibrationSum1 += formLineValue(numbers);
        }
    });
}
filterCalibrationValues();
console.log("Part 1: ", calibrationSum1);
//  Part II, need to filter by printed numbers 
// (?:one|two|three|four|five|six|seven|eight|nine|\d)
// Tries: 54something, 51890 (too low), 54770 (correct!)
const mapObj = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9'
};
function generateArray(l) {
    const arr = [];
    let placeholder = "";
    for (let i = 0; i < l.length; i++) {
        const num = parseInt(l[i]);
        if (num) {
            arr.push(l[i]);
            placeholder = "";
        }
        else {
            placeholder += l[i];
        }
        const numString = placeholder.match(/one|two|three|four|five|six|seven|eight|nine/i);
        if (numString) {
            arr.push(mapObj[numString[0]]);
            placeholder = l[i];
        }
    }
    return arr;
}
function filterCalibrationValuesPartTwo() {
    data.forEach((line) => {
        // find all values and create an array
        const arr = generateArray(line);
        if (arr.length) {
            console.log(formLineValue(arr));
            calibrationSum2 += formLineValue(arr);
        }
    });
}
filterCalibrationValuesPartTwo();
console.log("Part 2: ", calibrationSum2);
//# sourceMappingURL=aoc1.js.map