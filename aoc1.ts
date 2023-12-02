import readDataUtil from './readDataUtil';

const data = readDataUtil('./puzzle1_input.txt')
let calibrationSum = 0;

function formLineValue(numbers: Array<string>) {
    if (numbers.length === 1) {
        return parseInt(numbers[0]+numbers[0]);
    } else {
        return parseInt(numbers[0] + numbers[numbers.length - 1]);
    }
}

function filterCalibrationValues(): void {
    data.forEach((line: string) => {
        // find all the single integers 
        const numbers = line.match(/\d/g);
        // line could be null
        if (numbers) {
            calibrationSum += formLineValue(numbers);
        }
    })
}

filterCalibrationValues();
console.log(calibrationSum);

//  Part II, need to filter by printed numbers 