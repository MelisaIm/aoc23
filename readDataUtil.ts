import * as fs from 'fs';

export default function readDataUtil(path: string, splitBy?: string) {
    return fs.readFileSync(path,'utf-8').split(splitBy || "\n");
}