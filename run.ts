import chalk from "chalk";
import { getArgs, readFromFile } from "./utils/index.js";
import dotenv from "dotenv";
dotenv.config();

const { day, level, example } = getArgs(process.argv);

if (typeof day === "string" && !day.match(/^\d+$/)) {
  console.log(
    chalk.bold(chalk.red("Invalid day: ")),
    chalk.reset("Please select a number between 1 and 25")
  );
  process.exit();
}

async function importModule() {
  return import(`./${process.env.DAY_FOLDER}${day}/index.ts`);
}

const module = await importModule();
let data = "";

if (!example) {
  try {
    data = readFromFile(`${process.env.DAY_FOLDER}${day}/input.txt`);

    if (!example && !data) {
      console.log(
        chalk.bold(chalk.red("Error: ")),
        chalk.reset("Input file is empty")
      );
      process.exit();
    }
  } catch (e) {
    console.log(chalk.bold(chalk.red("Error: ")), chalk.reset(e.message));
    process.exit();
  }
}

let levelOneSolution = "";
let levelTwoSolution = "";

switch (level) {
  case "1":
    levelOneSolution = module.levelOne(data);
    break;
  case "2":
    levelTwoSolution = module.levelTwo(data);
    break;
  default:
    levelOneSolution = module.levelOne(data);
    levelTwoSolution = module.levelTwo(data);
    break;
}

console.group();
levelOneSolution &&
  console.info(chalk.bgGreen("Level 1 Solution:"), levelOneSolution);
levelTwoSolution &&
  console.info(chalk.bgGreen("Level 2 Solution:"), levelTwoSolution);
console.groupEnd();
