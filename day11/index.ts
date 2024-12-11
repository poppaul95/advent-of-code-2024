const dummyData = "test";

const getStonesCount = (stones, blinks) => {
	for (let i = 0; i < blinks; i++) {
		const newStones = {};
		Object.keys(stones).forEach((stone) => {
			if (stone === "0") {
				newStones["1"] = (newStones["1"] || 0) + stones[stone];
			} else if (stone.length % 2 === 0) {
				const firstHalf = Number(stone.slice(0, stone.length / 2));
				const secondHalf = Number(stone.slice(stone.length / 2));
				newStones[firstHalf] = (newStones[firstHalf] || 0) + stones[stone];
				newStones[secondHalf] = (newStones[secondHalf] || 0) + stones[stone];
			} else {
				newStones[Number(stone) * 2024] = (newStones[Number(stone) * 2024] || 0) + stones[stone];
			}
		});
		stones = newStones;
	}

	return stones;
}

const levelOne = (data: string | undefined) => {
  const parsedData = (data || dummyData).split(" ").map(Number);
  const stonesObj = parsedData.reduce((acc, stone) => {
    acc[stone] = (acc[stone] || 0) + 1;
    return acc;
  }, {});
  const stones = getStonesCount(stonesObj, 25);
  return Object.values(stones).reduce((acc: number, stone: number) => acc + stone, 0);
};
const levelTwo = (data: string | undefined) => {
  const parsedData = (data || dummyData).split(" ").map(Number);
  const stonesObj = parsedData.reduce((acc, stone) => {
    acc[stone] = (acc[stone] || 0) + 1;
    return acc;
  }, {});
  const stones = getStonesCount(stonesObj, 75);
  return Object.values(stones).reduce((acc: number, stone: number) => acc + stone, 0);
};

export { levelOne, levelTwo };
