const DUMMY_DATA= `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

const levelOne = (data) => {
	const parsedData = data || DUMMY_DATA
	const regex = /mul\((\d+),(\d+)\)/g
	const matches = parsedData.match(regex)
	return matches?.reduce((acc, match) => {
		const [a, b] = match.match(/\d+/g) as unknown as [number, number]
	return acc += a * b
  }, 0)
}

const levelTwo = (data) => {
	const parsedData = data || DUMMY_DATA
	const regex = /mul\((\d+),(\d+)\)(?<=(?:^|do\(\))(?:[^d]|d(?!on't\(\)))+?)/g
	const matches = parsedData.match(regex)
	return matches?.reduce((acc, match) => {
		const [a, b] = match.match(/\d+/g) as unknown as [number, number]
	return acc += a * b
  }, 0)
}

export { levelOne, levelTwo };