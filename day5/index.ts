import chalk from "chalk";

const DUMMY_DATA = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

const sumOfMiddleElements = (instructions: Array<Array<number>>) => {
  const result = instructions.reduce(
    (acc, val) => acc + val[Math.floor(val.length / 2)],
    0
  );
  return result;
};

const parseData = (data) => {
  const rules: Array<Array<number>> = [];
  const instructions: Array<string> = [];

  data.forEach((line) => {
    if (line.includes("|")) {
      rules.push(line.split("|").map(Number));
    } else if (line) {
      instructions.push(line);
    }
  });

  return { rules, instructions };
};

const verifyInstructions = (
  shouldBeCorrect: boolean,
  instructions: Array<string>,
  rules: Array<Array<number>>
) => {
  const veifiedInstructions: Array<Array<number>> = [];

  instructions.forEach((pages) => {
    const pagesArr = pages.split(",").map(Number);
    let wrongInstruction = false;
    pagesArr.forEach((page, index) => {
      const rulesBefore = rules
        .filter((rule) => rule[0] === page)
        .map((rule) => rule[1]);
      const rulesAfter = rules
        .filter((rule) => rule[1] === page)
        .map((rule) => rule[0]);
      rulesBefore.forEach((rule) => {
        if (pagesArr.indexOf(rule) > 0 && pagesArr.indexOf(rule) < index) {
          wrongInstruction = true;
        }
      });
      rulesAfter.forEach((rule) => {
        if (pagesArr.indexOf(rule) > 0 && pagesArr.indexOf(rule) > index) {
          wrongInstruction = true;
        }
      });
    });
    if (shouldBeCorrect && !wrongInstruction) {
      veifiedInstructions.push(pagesArr);
    }
    if (!shouldBeCorrect && wrongInstruction) {
      veifiedInstructions.push(pagesArr);
    }
  });

  return veifiedInstructions;
};

const swapElements = (arr, index1, index2) => {
  const newArr = [...arr];
  [newArr[index1], newArr[index2]] = [newArr[index2], newArr[index1]];
  return newArr;
};

const isPositionWrong = (rule, pages) => {
	if(pages.indexOf(rule[0]) > pages.indexOf(rule[1])) {
		return true;
	}
	return false;
}

const part2 = (pages, pageindex, rules) => {
  if (pageindex === pages.length - 1) {
    return pages;
  }
  rules.forEach((rule) => {
    if(isPositionWrong(rule, pages)) {
      pages = swapElements(pages, pages.indexOf(rule[0]), pages.indexOf(rule[1]));
    }
    });

  return part2(pages, pageindex + 1, rules);
};

const levelOne = (data: string | undefined) => {
  const readData = (data || DUMMY_DATA).split("\n");

  const { rules, instructions } = parseData(readData);

  const verifiedInstructions = verifyInstructions(true, instructions, rules);

  return sumOfMiddleElements(verifiedInstructions);
};

const levelTwo = (data: string | undefined) => {
  const readData = (data || DUMMY_DATA).split("\n");

  const { rules, instructions } = parseData(readData);
  const verifiedInstructions = verifyInstructions(false, instructions, rules);
  console.log(chalk.green("Started Ordering:"));
  console.log(chalk.cyan(chalk.bold("0") + " out of " + chalk.bold(`${verifiedInstructions.length}`)));

  const fixedInstruction = verifiedInstructions.map((instruction, index) => {
    console.log(chalk.cyan(chalk.bold(`${index}`) + " out of " + chalk.bold(`${verifiedInstructions.length}`)));
    const rulesToApply = rules.filter((rule) => instruction.includes(rule[0]) && instruction.includes(rule[1]));
    return part2(instruction, 0, rulesToApply);
  });

  return sumOfMiddleElements(fixedInstruction);
};

export { levelOne, levelTwo };
