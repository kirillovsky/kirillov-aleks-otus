function getPath(domElement) {
  if (!domElement) {
    throw new Error('illegal argument error')
  }

  let pathSelector = ":root";
  if (!isRootNode(domElement)) {
    pathSelector += ` > ${elementSelector(domElement)}`
  }
  return pathSelector;
}

function elementSelector(domElement) {
  const neighbors = elementNeighbors(domElement);
  const index = findElementIndex(domElement, neighbors);

  switch (index) {
    case 0:
      return ":first-child";
    case neighbors.length - 1:
      return ":last-child";
    default:
      return `:nth-child(${index})`;
  }
}

function elementNeighbors(domElement) {
  if (domElement === document.documentElement) {
    return [];
  }

  return domElement.parentElement.children;
}

function findElementIndex(domElement, elements) {
  for (let i = 0; i < elements.length; i++) {
    if (domElement === elements[i]) {
      return i;
    }
  }

  return -1;
}

function isRootNode(domElement) {
  return domElement === document.documentElement;
}

module.exports = getPath;