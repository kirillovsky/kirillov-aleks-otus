function promiseReduce(promiseFunctionSuppliers, reducer, initialValue) {
	 return promiseFunctionSuppliers.reduce((acc, promiseFunction) => {
	 	   return promiseFunction().then(val => {
	 	   	return acc.then(v => reducer(v, val));
	 	   });
	 	   		 
	 }, Promise.resolve(initialValue));
}

//TESTS
promiseReduce([], (l, r) => {throw "WRONG"}, 1223).then(
	result => console.assert(result == 1223)
);

promiseReduce(
	[() => Promise.resolve(1)], 
	(acc, n) => acc + n,
	1000
).then(
	result => console.assert(result == 1001)
);

promiseReduce(
	[() => Promise.resolve(1), () => Promise.resolve(2), () => Promise.resolve(3)],
	(acc, n) => acc + n,
	0
).then(
	result => console.assert(result == 6)
);

//DEMO
var fn1 = () => {
	console.log('fn1')
	return Promise.resolve(1)
}

var fn2 = () => new Promise(resolve => {
	console.log('fn2')
	return setTimeout(() => resolve(2), 1000)
})

promiseReduce([fn1, fn2], (memo, value) => memo * value, 1).then(console.log)