const dummyData = "2333133121414131402";

let ID = 0;

const mapFiles = (data) => data.reduce((acc, curr, index) => {
    let i = 0;
    while (i < curr) {
      if (index % 2 === 0) {
        acc.push(ID);
      } else {
        acc.push(".");
      }
      i++;
    }
    if (index % 2 === 0) {
      ID++;
    }
    return acc;
  }, []);

const checksum = (files) => files.reduce((acc, curr, index) => {
    if (typeof curr === "number") {
      acc += curr * index;
    }
    return acc;
  }, 0);

const solve = (filesMap) => {
  let mappedFiles: Array<string> = [];
  filesMap.forEach((file, index) => {
    if (file === ".") {
      const lastIndex = filesMap.findLastIndex(
        (f, i) => f !== "." && i > index
      );

      mappedFiles.push(filesMap[lastIndex]);
      filesMap[lastIndex] = ".";
    } else {
      mappedFiles.push(file);
    }
  });

  return checksum(mappedFiles);
};

const updateEmptyBlocks = (files) => {
  let emptyBlocks: Array<Array<number>> = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i] === ".") {
      let j = i;
      while (files[j] === ".") {
        j++;
      }
      emptyBlocks.push([i, j - 1]);
      i = j - 1;
    }
  }
  return emptyBlocks;
};

const solvePartTwo = (files) => {
  let emptyBlocks: Array<Array<number>> = updateEmptyBlocks(files);
  let mappedFiles = [];

  for (let i = files.length - 1; i >= 0; i--) {
    let file: Array<number> = [];
    if (typeof files[i] === "number") {
      let j = i;
      while (typeof files[j] === "number" && files[j] === files[i]) {
        file.push(j);
        j--;
      }
      i = j + 1;
    }
    let fittingInterval: Array<number> | null | undefined = null;
    if (file.length !== 0) {
      fittingInterval = emptyBlocks.find(([start, end]) => {
        return file.length <= end - start + 1;
      });
    }

    if (fittingInterval) {
      const [start] = fittingInterval;
      if (start < file[0]) {
        for (let j = 0; j < file.length; j++) {
          files[start + j] = files[file[j]];
        }
        for (let j = 0; j < file.length; j++) {
          files[file[j]] = ".";
        }
        emptyBlocks = updateEmptyBlocks(files);
        mappedFiles = files;
      }
    }
  }
  return checksum(mappedFiles);
};

const levelOne = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("");
  ID = 0
  const files = mapFiles(parsedData);
  const checkSum = solve(files);
  return checkSum;
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("");
  ID = 0
  const files = mapFiles(parsedData);
  const checkSum = solvePartTwo(files);
  return checkSum;
};

export { levelOne, levelTwo };
