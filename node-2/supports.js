function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function callNoMoreThanNTimes(n, originalFunction) {
  return function() {
    return (n-- > 0) ? originalFunction() : null;
  };
}

module.exports = {
  randomInt, callNoMoreThanNTimes,
};