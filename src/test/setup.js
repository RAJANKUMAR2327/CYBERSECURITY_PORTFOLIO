import "@testing-library/jest-dom/vitest";

// jsdom does not implement IntersectionObserver. Framer Motion uses it
// for whileInView, so provide a harmless test implementation.
class MockIntersectionObserver {
  constructor(callback, options = {}) {
    this.callback = callback;
    this.options = options;
    this.elements = new Set();
  }

  observe(element) {
    this.elements.add(element);
    // Report elements as visible so whileInView components can render
    // their normal visible state in component tests.
    this.callback?.(
      [{
        isIntersecting: true,
        target: element,
        intersectionRatio: 1,
        boundingClientRect: element.getBoundingClientRect(),
        intersectionRect: element.getBoundingClientRect(),
        rootBounds: null,
        time: 0
      }],
      this
    );
  }

  unobserve(element) {
    this.elements.delete(element);
  }

  disconnect() {
    this.elements.clear();
  }

  takeRecords() {
    return [];
  }
}

globalThis.IntersectionObserver = MockIntersectionObserver;
