import readDataUtil from './readDataUtil';

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
