const dummyData = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;

const badReport = (report, tolerate, startPoint) => {
  for (let i = startPoint; i < report.length; i++) {
    const diff = report[i] - report[i - 1];
    if (Math.abs(diff) > 3 || (report[i - 1] - report[i - 2]) * diff <= 0) {
      return (
        !tolerate ||
        [2, 1, 0].every((j) =>
          badReport(report.toSpliced(i - j, 1), tolerate - 1, i - j)
        )
      );
    }
  }
};

const levelOne = (data) => {
  const parsedData = (data || dummyData)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  return parsedData.filter((report) => !badReport(report, 0, 1)).length;
};

const levelTwo = (data) => {
  const parsedData = (data || dummyData)
    .split("\n")
    .map((line) => line.split(" ").map(Number));

  return parsedData.filter((report) => !badReport(report, 1, 1)).length;
};

export { levelOne, levelTwo };
