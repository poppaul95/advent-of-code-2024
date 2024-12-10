const dummyData = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const isPath = (lines, startX, startY, endX, endY) => {
  const visited = new Set();
  visited.add(`${startX},${startY}`);
  const queue: Array<Array<number>> = [[startX, startY, 0]];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) continue;
    const [x, y, v] = item;

    if (x === endX && y === endY) {
      return true;
    }

    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 &&
        newX < lines[0].length &&
        newY >= 0 &&
        newY < lines.length &&
        lines[newY][newX] === v + 1 &&
        !visited.has(`${newX},${newY}`)
      ) {
        visited.add(`${newX},${newY}`);
        queue.push([newX, newY, v + 1]);
      }
    });
  }
  return false;
};

const getPaths = (lines, startX, startY, endX, endY) => {
  const visited = {};
  visited[`${startX},${startY}`] = 1;
  const queue = [[startX, startY, 0]];

  while (queue.length > 0) {
    const item = queue.shift();
    if (!item) continue;
    const [x, y, v] = item;

    if (x === endX && y === endY) {
      return visited[`${x},${y}`];
    }

    directions.forEach(([dx, dy]) => {
      const newX = x + dx;
      const newY = y + dy;
      if (
        newX >= 0 &&
        newX < lines[0].length &&
        newY >= 0 &&
        newY < lines.length &&
        lines[newY][newX] === v + 1
      ) {
        if (!Object.keys(visited).includes(`${newX},${newY}`)) {
          visited[`${newX},${newY}`] = visited[`${x},${y}`];
          queue.push([newX, newY, v + 1]);
        } else {
          visited[`${newX},${newY}`] += visited[`${x},${y}`];
        }
      }
    });
  }
  return false;
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("\n");
  const lines = parsedData.map((line) => line.split("").map(Number));

  const tailHeads: Array<Array<number>> = [];
  const ends: Array<Array<number>> = [];

  lines.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === 0) {
        tailHeads.push([x, y]);
      } else if (cell === 9) {
        ends.push([x, y]);
      }
    });
  });
  let count = 0;
  tailHeads.forEach(([x, y]) => {
    let counter = 0;
    ends.forEach(([endX, endY]) => {
      if (isPath(lines, x, y, endX, endY)) {
        counter++;
      }
    });
    count += counter;
  });
  return count;
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("\n");
  const lines = parsedData.map((line) => line.split("").map(Number));
  const tailHeads: Array<Array<number>> = [];
  const ends: Array<Array<number>> = [];

  lines.forEach((line, y) => {
    line.forEach((cell, x) => {
      if (cell === 0) {
        tailHeads.push([x, y]);
      } else if (cell === 9) {
        ends.push([x, y]);
      }
    });
  });
  let count = 0;
  tailHeads.forEach(([x, y]) => {
    ends.forEach(([endX, endY]) => {
      count += getPaths(lines, x, y, endX, endY);
    });
  });
  return count;
};

export { levelOne, levelTwo };
