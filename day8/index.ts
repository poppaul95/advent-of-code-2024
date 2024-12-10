const dummyData = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............
............`;

const uniqueLocs = new Set();

const solve = (grid, part) => {
  const antennas = Object.values(
    (() => {
      const res = {};
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
          if (grid[i][j] !== ".")
            res[grid[i][j]]
              ? res[grid[i][j]].push([i, j])
              : (res[grid[i][j]] = [[i, j]]);
        }
      }
      return res;
    })()
  );
  if (part === 1) {
    antennas.forEach((antennas: Array<number>) =>
      antennas.forEach((antenna, i, arr) =>
        arr
          .filter((_, j) => i !== j)
          .forEach((other) => {
            const x = 2 * antenna[0] - other[0],
              y = 2 * antenna[1] - other[1];
            if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length)
              return;
            uniqueLocs.add(`${x},${y}`);
          })
      )
    );
  }

  if (part === 2) {
    antennas.forEach((antenna: Array<number>) =>
      antenna.forEach((a, i, arr) =>
        arr
          .filter((_, j) => i !== j)
          .forEach((other) => {
            let k = 1;
            while (true) {
              const x = (1 - k) * a[0] + k * other[0],
                y = (1 - k) * a[1] + k * other[1];
              if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length)
                return; // out of bounds
              uniqueLocs.add(`${x},${y}`);
              k++;
            }
          })
      )
    );
  }
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || dummyData)
    .split("\n")
    .map((row) => row.split(""));
  solve(parsedData, 1);
  return uniqueLocs.size;
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || dummyData)
    .split("\n")
    .map((row) => row.split(""));
  solve(parsedData, 2);
  return uniqueLocs.size;
};

export { levelOne, levelTwo };
