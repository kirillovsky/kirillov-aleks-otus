function reduce(arr, reduction, initialValue) {
	let accumulator = initialValue;
	
	for (let next of arr) {
		 accumulator = reduction(accumulator, next);
	}
	
	return accumulator;
}

//TESTS
console.assert(reduce([], (acc, m) => { throw 'WRONG' }, 100) == 100)
console.assert(reduce([1], (acc, m) => acc + m, 100) == 101)
console.assert(reduce([1, 2, 3, 4], (acc, m) => acc.concat([m]), []) == "1,2,3,4")