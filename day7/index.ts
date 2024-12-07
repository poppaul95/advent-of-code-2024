const DUMMY_DATA = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;

let operations = new Set();
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
let unconcat = (a, b) => {
  const sub = a - b;
  const bMagnitude = Math.pow(10, Math.floor(Math.log10(b)) + 1);
  return sub > 0 && sub % bMagnitude === 0 ? sub / bMagnitude : -1;
};

const solve = (result, calculated, values, i, operands) => {
  if (calculated === result) {
    return operations.add(result);
  }
  if (i >= values.length) {
    return false;
  }

  operands.forEach((operand) => {
    let newCalculated = calculated;
    if (operand === "*") {
      newCalculated *= values[i];
    } else {
      newCalculated += values[i];
    }
    return solve(result, newCalculated, values, i + 1, operands);
  });
};

const solveBack = (result, values, i, operations) => {
  if (i === 0) {
    return result === values[0];
  }
  return operations.some((operation) =>
    solveBack(operation(result, values[i]), values, i - 1, operations)
  );
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split("\n").map((line) => {
    const [result, values] = line.split(": ");
    return {
      result: Number(result),
      values: values.split(" ").map(Number),
    };
  });

  parsedData.forEach((d) => {
    const { result, values } = d;
    if (solveBack(result, values, values.length - 1, [divide, subtract])) {
      operations.add(result);
    }
  });

  const sum = [...operations].reduce(
    (acc: number, val: number) => acc + val,
    0
  );
  return sum;
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split("\n").map((line) => {
    const [result, values] = line.split(": ");
    return {
      result: Number(result),
      values: values.split(" ").map(Number),
    };
  });

  parsedData.forEach((d) => {
    const { result, values } = d;
    if (
      solveBack(result, values, values.length - 1, [divide, subtract, unconcat])
    ) {
      operations.add(result);
    }
  });

  const sum = [...operations].reduce(
    (acc: number, val: number) => acc + val,
    0
  );
  return sum;
};

export { levelOne, levelTwo };
