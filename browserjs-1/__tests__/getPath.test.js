const getPath = require('../getPath');

describe('getPath test suite', () => {
  test('path for html', () => {
    const element = document.querySelector('html');

    expect(getPath(element)).toBe(':root')
  });

  test('path for head', () => {
    const element = document.querySelector('head');

    expect(getPath(element)).toBe(':root > :first-child')
  });

  test('path for body', () => {
    const element = document.querySelector('body');

    expect(getPath(element)).toBe(':root > :last-child')
  });

  test('path for single indirect descendant', () => {
    setupBody(`<div/>`);
    const element = document.querySelector('div');

    expect(getPath(element)).toBe(':root > :last-child > :first-child');

  });

  test('path for indirect descendant with neighbors', () => {
    setupBody(
      `<span>Hi!</span>
      <div>
        <h1>First header</h1>
        <h2>Second header</h2>
        <h3>Third header</h3>
        <h4>Fourth header</h4>
       </div>
       <span>By!</span>`
    );
    const element = document.querySelector('h3');
    
    expect(getPath(element)).toBe(':root > :last-child > :nth-child(2) > :nth-child(3)')
  });
});

function setupBody(bodyHtml) {
  document.body.innerHTML = bodyHtml;
}