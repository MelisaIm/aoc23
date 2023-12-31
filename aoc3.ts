import readDataUtil from './readDataUtil';

const PUZZLE_THREE_INPUT = "./puzzle3_input.txt";
const PUZZLE_THREE_SAMPLE = "./puzzle3_sample.txt";

// If a number is adjacent to a symbol (not a period), including diagonals
// then it is a part number and must be added to the final sum

// To figure out diagonals, I think we can convert all the values into
// a multi dimensional array and when we find a symbol, we check 
// all of it's cardinal positions 

// Each line is a value in the array
let data: string[] | string[][] = readDataUtil(PUZZLE_THREE_INPUT);
// Split each line into corresponding spots 
data = data.map(line => line.split(""));

// For first line we look left, right, diagonals down, and down 
// ..1..#..3...
// ....34......

// For last line we look left, right, diagonals up, and up
// ....34......
// ..1..#..3...

// consider duplicate values, track already read positions... 
// in that case, it might be best to find numbers and check for symbols
// instead of finding symbols and checking for numbers 

// For first line we look left, right, down, diagonal down left, diagonal down right
// ..-.34.#..
// ....$.....

// For last line we look left, right, up, diagonal up left, diagonal up right
// ....$.....
// ..-.34.#..

function puzzleThreePartOne() {
    let partSum = 0;
    data.forEach((line, row) => {
        for (let column = 0; column < line.length; column++) {
            let adjacentFlag = false;
            if (!isNaN(line[column])) {
                // for each number found, check it's cardinal directions if they exist
                // find the full number first
                const [number, lastIndex] = findNumber(line, column);
                // we need to check the current column and the lastIndex for diagonals
                adjacentFlag = checkForEachDigit(column, lastIndex, row);
                column = lastIndex as number;
                if (adjacentFlag) {
                    partSum += number;
                    column = lastIndex + 1; // do not add the same number more than once
                }
            }
        }
    })
    return partSum;
}

// Loop through each number in a multi digit number and check if 
// any symbol is in its cardinal directions 
// arguments 
function checkForEachDigit(numStart, numEnd, row) {
    for (let i = numStart; i < numEnd + 1; i++) {
        const flag = checkCardinals(i, row);
        if (flag) return true;
    }
    return false;
}

function checkCardinals(col: number, row: number) {
    // check up
    if (row > 0) {
        if (checkForSymbol(data[row - 1][col])) return true; 
        // check for upper left
        if (col > 0) {
            if (checkForSymbol(data[row - 1][col - 1])) return true;
        }
        // check for upper right
        if (col < data[row].length - 1) {
            if (checkForSymbol(data[row - 1][col + 1])) return true;
        }
    }
    // check left
    if (col > 0) {
        if (checkForSymbol(data[row][col - 1])) return true;
    }
    // check right
    if (col < data[row].length - 1) {
        if (checkForSymbol(data[row][col + 1])) return true;
    }
    // check down
    if (row < data.length - 1) {
        if (checkForSymbol(data[row + 1][col])) return true;
        // check lower right
        if (col < data[row].length - 1) {
            if (checkForSymbol(data[row + 1][col + 1])) return true;
        }
        // check lower left
        if (col > 0) {
            if (checkForSymbol(data[row + 1][col - 1])) return true;
        }
    }
    return false;
}

// not a number and not a period
function checkForSymbol(val) {
    console.log(val);
    if (/\d/.test(val)) {
        if (!/\./.test(val)) {
            return true;
        }
    }
    return false;
}

function findNumber(line: Array<string>, startingIndex: number) {
    let num = line[startingIndex];
    let lastIndex: number = startingIndex + 1; 
    while (lastIndex < line.length - 1 && !isNaN(line[lastIndex] as any)) {
        num += line[lastIndex];
        lastIndex++;
    }
    return [parseInt(num), lastIndex];
}

console.log(puzzleThreePartOne());
// attempt 1: 555076 (too high!)
// attempt 2: 501509 try not to add same number multiple times (too low!)
// attempt 3: 501513 (too low!)
// attemt 4: 549533 use regex instead of parseInt (not right)