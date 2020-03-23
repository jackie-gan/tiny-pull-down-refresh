import React, { Component } from 'react';
import './index.scss';

export default class PDR extends Component {
  constructor() {
    super(...arguments);

    this.state = {
      dragOnEdge: false
    };
  }

  _startScreenY = 0
  _ScreenY = 0
  _lastScreenY = 0
  container = null

  bindTouchEvents = {
    touchstart: () => {},
    touchmove: () => {},
    touchend: () => {},
    touchcancel: () => {}
  }

  init() {
    this.touchElement = document.querySelector('.PDR-wrapper');
    const ele = this.touchElement;
    this.bindTouchEvents = {
      touchstart: this.onTouchStart.bind(this, ele),
      touchmove: this.onTouchMove.bind(this, ele),
      touchend: this.onTouchEnd.bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this, ele)
    };

    Object.keys(this.bindTouchEvents).forEach((event) => {
      ele && ele.removeEventListener(event, this.bindTouchEvents[event]);
    });
  }

  destroy() {
  }

  reset() {
    this._lastScreenY = 0;
    this.setContentType(0);
  }

  isEdge(ele) {
    return ele.scrollTop <=0;
  }

  damping(diff) {
    let dy = diff;
    const ratio =
      Math.abs(this._ScreenY - this._startScreenY) / window.screen.height;
    dy *= (1 - ratio) * 0.6;
    return dy;
  }

  setContentStyle(ty) {
    if (this.container) {
      this.setTransform(
        this.container && this.container.style,
        `translate3d(0px,${ty}px,0)`
      );
    }
  };

  setTransform(nodeStyle, value) {
    nodeStyle.transform = value;
    nodeStyle.webkitTransform = value;
    nodeStyle.MozTransform = value;
  }

  onTouchStart(ele, e) {
    this._startScreenY = e.touches[0].screenY;
    this._ScreenY = e.touches[0].screenY;
  }

  onTouchMove(ele, e) {
    const { dragOnEdge } = this.state;
    const screenY = e.touches[0].screenY;

    if (this.isEdge(ele)) {
      if (!dragOnEdge) {
        this._startScreenY = e.touches[0].screenY;
        this._ScreenY = e.touches[0].screenY;

        this.setState({
          dragOnEdge: true
        });
      }

      const diff = Math.abs(screenY - this._ScreenY);
      this._ScreenY = screenY;
      this._lastScreenY += this.damping(diff);
      this.setContentType(this._lastScreenY);
    }
  }

  onTouchEnd() {

  }

  componentDidMount() {
    this.init();
  }

  render() {
    return (
      <div className='PDR-wrapper'>
        <div className='PDR-container' ref={(ref) => {
          this.container = ref;
        }}>
          {this.props.children}
        </div>
      </div>
    );
  }
}