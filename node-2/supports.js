function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function callNoMoreThanNTimes(n, originalFunction) {
  return function() {
    return (n-- > 0) ? originalFunction() : null;
  };
}

function runAndDone(f, done) {
  const result = f();
  done();
  return result;
}

module.exports = {
  randomInt, callNoMoreThanNTimes, runAndDone,
};