import readDataUtil from '../readDataUtil';

const PUZZLE_TWO_INPUT = "./puzzle2_input.txt";
const PUZZLE_TWO_INSTRUCTIONS = "./puzzle2_sample.txt";

const data = readDataUtil(PUZZLE_TWO_INPUT);

const PART_ONE_LIMITS = {
    red: 12, 
    green: 13,
    blue: 14
}

function dayTwoPartOne() {
    let possible = 0;
    // Each line of dataset
    data.forEach((game) => {
        let possibleGameFlag = true;
        // separate game details from outcomes 
        const lineSplit: string[] = game.split(":");
        // all the rounds
        const rounds: string[] = lineSplit[1].split(";");
        let games: string[][] = rounds.map(round => round.split(","));
        games = games.map((result) => result.map((str) => str.trim())
        )
        const gameID = lineSplit[0].match(/(\d+)/)?.[0];
        // split value of each turn into # and color 
        possibleGameFlag = games.every((round: string[]) => {
            return round.every((valueCheck) => {
                // check against mapping if color limit is <= # drawn
                const [num, color] = valueCheck.split(" ");
                if (PART_ONE_LIMITS[color] >= parseInt(num)) {
                    return true;
                } else {
                    return false;
                }
            })
        });
        if (possibleGameFlag) {
            possible += parseInt(gameID);
        } 
    })
    return possible;
}

console.log(dayTwoPartOne());
// For day 2 part 2, we need to figure out the minimum needed for each game and then multiply the values together 
// and finally add all of the powers to get the final answer
// attempt 1: 59795 correct! 
function dayTwoPartTwo() {
    // 
    let sum = 0;
    // Each line of dataset
    data.forEach((game) => {
        const minRequiredMap = {};
        // separate game details from outcomes 
        const lineSplit: string[] = game.split(":");
        // all the rounds
        const rounds: string[] = lineSplit[1].split(";");
        let games: string[][] = rounds.map(round => round.split(","));
        games = games.map((result) => result.map((str) => str.trim())
        )
        // split value of each turn into # and color 
       games.forEach((round: string[]) => {
            return round.forEach((valueCheck) => {
                // check against mapping if color limit is <= # drawn
                const [num, color] = valueCheck.split(" ");
                const parsedNum = parseInt(num);
                if (minRequiredMap[color]) {
                    // check if new value smaller
                    if (minRequiredMap[color] < parsedNum) {
                        minRequiredMap[color] = parsedNum;
                    }
                } else {
                    minRequiredMap[color] = parsedNum;
                }
            })
        });
        // loop through and get the power from mins 
        console.log(minRequiredMap);
        let pow: number = 0;
        for (let color in minRequiredMap) {
            const parsedMin = parseInt(minRequiredMap[color]);
            if (pow) {
                pow *= parsedMin;
            } else {
                pow = parsedMin;
            }
        }
        console.log(pow);
        sum += pow;
    })
    return sum;
}

console.log(dayTwoPartTwo());