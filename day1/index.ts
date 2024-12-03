const dummyData = `3   4
4   3
2   5
1   3
3   9
3   3`;

const getList = (cond, lines) =>
  lines
    .flatMap((line) => line.split("   "))
    .filter((n, i) => i % 2 === cond)
    .map(Number);

const levelOne = (data) => {
  const lines = (data || dummyData).split("\n");
  const leftList = getList(0, lines);
  const rightList = getList(1, lines);
  const leftSorted = leftList.sort((a, b) => a - b);
  const rightSorted = rightList.sort((a, b) => a - b);
  const l = leftList.length;
  let dist = 0;

  for (let i = 0; i < l; i++) {
    dist += Math.abs(leftSorted[i] - rightSorted[i]);
  }

  return dist;
};

const levelTwo = (data) => {
  const lines = (data || dummyData).split("\n");

  const leftList = getList(0, lines);
  const rightList = getList(1, lines);

  let totalCount = 0;

  leftList.forEach((left) => {
    const occ = rightList.filter((right) => right === left).length;
    totalCount += left * occ;
  });

  return totalCount;
};

export { levelOne, levelTwo };
