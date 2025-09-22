import "jest-canvas-mock";

// Mock ColorThief to prevent sharp issues in tests
jest.mock('colorthief', () => {
  return {
    __esModule: true,
    default: jest.fn(() => ({
      getColor: jest.fn(() => [128, 128, 128]),
      getPalette: jest.fn(() => [[128, 128, 128], [64, 64, 64]])
    }))
  };
});

// Mock matchMedia for the test environment
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  disconnect() {}
  unobserve() {}
};
