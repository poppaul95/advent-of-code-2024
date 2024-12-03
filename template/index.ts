const dummyData = "test";

const levelOne = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("\n");
  return "levelOne solution";
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || dummyData).split("\n");
  return "levelTwo solution";
};

export { levelOne, levelTwo };
