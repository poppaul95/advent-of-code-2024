const DUMMY_DATA = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

const isInvalid = (row, col, prevRow, prevCol) => {
  return (
    row < 0 ||
    row >= matrixLength ||
    col < 0 ||
    col >= matrixLength ||
    (row === prevRow && col === prevCol)
  );
};

let wordCount = 0;
let matrixLength = 0;
const words: Array<{
  letter: string;
  row: number;
  col: number;
}> = [];

const rowNum = [-1, -1, -1, 0, 0, 1, 1, 1];
const colNum = [-1, 0, 1, -1, 1, -1, 0, 1];

const isPositionOk = (arr) => {
  let isArrayInOrder = true;
  let hasSameElements = true;

  for (let i = 2; i < arr.length; i++) {
    if ((arr[i - 1] - arr[i - 2]) * (arr[i] - arr[i - 1]) <= 0) {
      isArrayInOrder = false;
    }
  }

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[i - 1]) {
      hasSameElements = false;
    }
  }
  return isArrayInOrder || hasSameElements || false;
};

const isWordValid = (word) => {
  const rowIndices = word.map((w) => w.row);
  const colIndices = word.map((w) => w.col);

  if (!(isPositionOk(rowIndices) && isPositionOk(colIndices))) {
    return false;
  }
  return true;
};

const DFS = (grid, row, col, prevRow, prevCol, word, path, index, n) => {
  if (index > n || grid[row][col] !== word[index]) return;

  path += word[index] + "(" + row + ", " + col + ")  ";

  if (index === n) {
    const point: {
      letter: string;
      row: number;
      col: number;
    } = path
      .split("  ")
      .filter((p) => p)
      .map((p) => {
        p.trim();
        if (p) {
          const letter = p.match(/[A-Z]/g);
          const row = p.match(/\d+/g)[0];
          const col = p.match(/\d+/g)[1];
          return {
            letter: letter[0],
            row: parseInt(row),
            col: parseInt(col),
          };
        }
      });
    if (isWordValid(point)) {
      words.push(point);
      wordCount++;
    }
    return;
  }

  for (let i = 0; i < 8; i++) {
    const newRow = row + rowNum[i];
    const newCol = col + colNum[i];

    if (isInvalid(newRow, newCol, prevRow, prevCol)) continue;

    DFS(grid, newRow, newCol, row, col, word, path, index + 1, n);
  }
};

const findWord = (grid, word, n) => {
  for (let i = 0; i < matrixLength; i++) {
    for (let j = 0; j < matrixLength; j++) {
      if (grid[i][j] === word[0]) {
        DFS(grid, i, j, -1, -1, word, "", 0, n);
      }
    }
  }
};

const printMatrix = (words) => {
  let matrixArray = Array.from(Array(matrixLength), () =>
    new Array(matrixLength).fill(".")
  );
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words[i].length; j++) {
      matrixArray[words[i][j].row][words[i][j].col] = words[i][j].letter;
    }
  }
  for (let i = 0; i < matrixLength; i++) {
    console.log(matrixArray[i].join(" "));
  }
};

const printLevelTwoMatrix = (words, grid) => {
  let matrixArray = Array.from(Array(matrixLength), () =>
    new Array(matrixLength).fill(".")
  );

  for (let i = 0; i < words.length; i++) {
    matrixArray[words[i].row][words[i].col] = words[i].letter;
    matrixArray[words[i].row - 1][words[i].col - 1] =
      grid[words[i].row - 1][words[i].col - 1];
    matrixArray[words[i].row + 1][words[i].col + 1] =
      grid[words[i].row + 1][words[i].col + 1];
    matrixArray[words[i].row - 1][words[i].col + 1] =
      grid[words[i].row - 1][words[i].col + 1];
    matrixArray[words[i].row + 1][words[i].col - 1] =
      grid[words[i].row + 1][words[i].col - 1];
  }
  for (let i = 0; i < matrixLength; i++) {
    console.log(matrixArray[i].join(" "));
  }
};

const findXes = (grid) => {
  let xmasCount = 0;
  for (let i = 1; i < matrixLength - 1; i++) {
    for (let j = 1; j < matrixLength - 1; j++) {
      if (grid[i][j] === "A") {
        const leftOblique =
          (grid[i - 1][j - 1] === "M" && grid[i + 1][j + 1] === "S") ||
          (grid[i - 1][j - 1] === "S" && grid[i + 1][j + 1] === "M");
        const rightOblique =
          (grid[i - 1][j + 1] === "M" && grid[i + 1][j - 1] === "S") ||
          (grid[i - 1][j + 1] === "S" && grid[i + 1][j - 1] === "M");

        if (leftOblique && rightOblique) {
          xmasCount++;
          words.push({ row: i, col: j, letter: "A" });
        }
      }
    }
  }

  return xmasCount;
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split("\n");
  const grid = parsedData.map((row) => row.split(""));

  matrixLength = grid[0].length;
  const word = "XMAS".split("");
  const n = word.length - 1;
  findWord(grid, word, n);
  printMatrix(words);

  return wordCount;
};

const levelTwo = (data: string | undefined) => {
  const parsedData = (data || DUMMY_DATA).split("\n");
  const grid = parsedData.map((row) => row.split(""));

  matrixLength = grid.length;
  wordCount = findXes(grid);
  printLevelTwoMatrix(words, grid);

  return wordCount;
};

export { levelOne, levelTwo };
