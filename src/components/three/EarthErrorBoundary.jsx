import { Component } from "react";

/**
 * Catches WebGL/Three.js render failures so a 3D crash doesn't blank the
 * entire page. React Error Boundaries must be class components.
 */
export default class EarthErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.warn("3D scene failed to render, showing fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="relative w-[min(620px,90vw)] aspect-square flex items-center justify-center">
          <div className="glass rounded-full w-full h-full flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 rounded-full bg-cyan-400/10 border border-cyan-400/30 mb-4 flex items-center justify-center">
              <span className="cyber text-2xl text-cyan-400">RK</span>
            </div>
            <p className="text-gray-400 text-sm">
              3D visualization unavailable in this browser.
              <br />
              Scroll down — the projects and content below work normally.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
