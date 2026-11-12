import { Component } from "react";
import EarthFallback from "./EarthFallback";

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
      return <EarthFallback />;
    }

    return this.props.children;
  }
}
