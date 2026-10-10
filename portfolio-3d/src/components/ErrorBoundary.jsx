import { Component } from 'react';

// Si le navigateur ou le téléphone ne supporte pas WebGL, le site ne plante pas :
// on affiche un simple bloc de remplacement à la place de la scène 3D.
export default class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback ?? null : this.props.children;
  }
}
