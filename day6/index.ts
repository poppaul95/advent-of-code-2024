const DUMMY_DATA = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

const visited = new Set();

const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
const solve = (data, startPosition) => {  
  let dirIndex = 0;
  let position = startPosition;

  while (true) {
    const [x, y] = position;
    const [dx, dy] = directions[dirIndex];
    const nextPosition = [x + dx, y + dy];

    if (
      nextPosition[0] < 0 ||
      nextPosition[0] >= data.length ||
      nextPosition[1] < 0 ||
      nextPosition[1] >= data[0].length
    ) {
		visited.add(`${x},${y}`);
      break;
    }

    if (data[nextPosition[0]][nextPosition[1]] !== "#") {
      visited.add(`${x},${y}`);
      position = nextPosition;
    } else {
      dirIndex = (dirIndex + 1) % 4;
    }
  }
};

const part2 = (data, startPosition) => {
  solve(data, startPosition);

  const sim = (map) => {
    const visitedStates = new Set();

    let dirIndex = 0;
    let position = startPosition;

    while (true) {
      const [x, y] = position;
      const [dx, dy] = directions[dirIndex];
      const nextPosition = [x + dx, y + dy];

      if (
        nextPosition[0] < 0 ||
        nextPosition[0] >= data.length ||
        nextPosition[1] < 0 ||
        nextPosition[1] >= data[0].length
      ) {
        visited.add(`${x},${y}`);
        break;
      }

      if (map[nextPosition[0]][nextPosition[1]] !== "#") {
        const state = `${position} - ${dirIndex}`;
        if (visitedStates.has(state)) {
          return true;
        }

        visitedStates.add(state);
        position = nextPosition;
      } else {
        dirIndex = (dirIndex + 1) % 4;
      }
    }
  };

  let loopCount = 0;

  visited.forEach((pos: string) => {
    const [x, y] = pos.split(",").map(Number);
    const modifiedMap = data.map((row) => [...row]);
    modifiedMap[x][y] = "#";
    if (sim(modifiedMap)) {
      loopCount++;
    }
  });
  return loopCount
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split(/\r|\n/).map((row) => row.split(""));
  const startPosition = parsedData?.reduce<Array<number>>((acc, row, i) => {
  const j = row.indexOf("^");
  if (j !== -1) {
    acc = [i, j];
  }
  return acc;
}, []);
  solve(parsedData, startPosition);
  return visited.size;
};

const levelTwo = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split(/\r|\n/).map((row) => row.split(""));
  const startPosition = parsedData?.reduce<Array<number>>((acc, row, i) => {
  const j = row.indexOf("^");
  if (j !== -1) {
    acc = [i, j];
  }
  return acc;
}, []);
  const loops = part2(parsedData, startPosition);
  return loops
};

export { levelOne, levelTwo };
