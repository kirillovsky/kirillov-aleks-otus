const getPath = require('../getPath');

describe('getPath test suite', () => {
  test('path for head', () => {
    const domElement = document.querySelector('head');

    expect(getPath(domElement)).toBe(':root > :first-child')
  });

  test('path for body', () => {
    const domElement = document.querySelector('body');

    expect(getPath(domElement)).toBe(':root > :last-child')
  });

  test('path for html', () => {
    const domElement = document.querySelector('html');

    getPath(domElement);

    expect(getPath(domElement)).toBe(':root')
  });
});

function setupBody(bodyHtml) {
  document.body.innerHTML = bodyHtml;
}