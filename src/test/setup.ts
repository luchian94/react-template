import '@testing-library/jest-dom/vitest';
import 'whatwg-fetch';

const originalConsoleError = console.error;
const jsDomCssError = 'Error: Could not parse CSS stylesheet';
console.error = (...params) => {
  if (!params.find((p) => p.toString().includes(jsDomCssError))) {
    originalConsoleError(...params);
  }
};

// runs a cleanup after each test case (e.g. clearing jsdom)
/*afterEach(() => {
  cleanup();
});*/
