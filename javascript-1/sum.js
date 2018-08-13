function sum(n) {
	function sumWithAccumulator(n, acc) {
		return n === undefined ? acc: (m) => sumWithAccumulator(m, acc + n)
	}
	return sumWithAccumulator(n, 0)
}

//TESTS
console.assert(sum() === 0)
console.assert(typeof sum(1) == 'function')
console.assert(sum(1)() === 1)
console.assert(typeof sum(1)(2)(3) == 'function')
console.assert(sum(1)(2)(3)() === 6)