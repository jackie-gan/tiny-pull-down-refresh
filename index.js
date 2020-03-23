;(function() {
  'use strict';

  function PDRPlugin (wrapper, options) {
    this.dragOnEdge = false;
    this._startScreenY = 0;

    this._initAnimationKeyFrame();

    this._initContainer();

    this._bindWrapper(wrapper);
  }

  PDRPlugin.prototype._initAnimationKeyFrame = function () {
    var keyFrame = '@keyframes PDR-pull-to-refresh-indicator { 50% { opacity: 0.2; } 100% { opacity: 1; } }';

    var styleNode = document.createElement('style');
    
    styleNode.type = 'text/css';
    styleNode.innerHTML = keyFrame;

    document.getElementsByTagName('head')[0].appendChild(styleNode);
  }

  PDRPlugin.prototype._initContainer = function () {
    this.scrollContainer = document.body;
  }

  PDRPlugin.prototype._bindWrapper = function (wrapper) {
    this.touchElement = document.querySelector(wrapper);
    var ele = this.touchElement;
    this.bindTouchEvents = {
      touchstart: this.onTouchStart.bind(this, ele),
      touchmove: this.onTouchMove.bind(this, ele),
      touchend: this.onTouchEnd.bind(this, ele),
      touchcancel: this.onTouchEnd.bind(this, ele)
    }

    var self = this;
    Object.keys(this.bindTouchEvents).forEach(function(event) {
      ele.addEventListener(event, self.bindTouchEvents[event], false);
    });
  }

  PDRPlugin.prototype._destroy = function () {
    var ele = this.touchElement;
    var self = this;
    Object.keys(this.bindTouchEvents).forEach(function(event) {
      ele.removeEventListener(event, self.bindTouchEvents[event]);
    });
  }

  PDRPlugin.prototype._isEdge = function (ele) {
    var container = this.scrollContainer;
    var scrollElement;
    if (container && container === document.body) {
      scrollElement = document.scrollingElement || document.body;

      return scrollElement.scrollTop <= 0;
    }
  }

  PDRPlugin.prototype.onTouchStart = function (ele, e) {
    this._startScreenY = e.touches[0].screenY;
  }

  PDRPlugin.prototype.onTouchMove = function (ele, e) {
    var _screenY = e.touches[0].screenY;

    if (this._isEdge(ele)) {
      
    }
  }

  window.PDRPlugin = PDRPlugin;
})();