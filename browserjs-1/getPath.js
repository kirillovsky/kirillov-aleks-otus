function getPath(element) {
  if (!element) {
    throw new Error('illegal argument error')
  }

  let pathSelector = "";

  for (let elem = element; !isRoot(elem); elem = elem.parentElement) {
    pathSelector = ` > ${selector(elem)}` + pathSelector;
  }

  return ":root" + pathSelector;
}

function isRoot(element) {
  return element === document.documentElement;
}

function selector(element) {
  const neighbors = Array.from(element.parentNode.children);
  const index = neighbors.indexOf(element);

  switch (index) {
    case 0:
      return ":first-child";
    case neighbors.length - 1:
      return ":last-child";
    default:
      return `:nth-child(${index + 1})`;
  }
}

module.exports = getPath;