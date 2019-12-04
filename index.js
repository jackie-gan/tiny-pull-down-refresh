;(function() {
  'use strict';

  function PDRPlugin (wrapper, options) {
    this._initAnimationKeyFrame();

    this._bindWrapper(wrapper);
  }

  PDRPlugin.prototype._initAnimationKeyFrame = function () {
    var keyFrame = '@keyframes PDR-pull-to-refresh-indicator { 50% { opacity: 0.2; } 100% { opacity: 1; } }';

    var styleNode = document.createElement('style');
    
    styleNode.type = 'text/css';
    styleNode.innerHTML = keyFrame;

    document.getElementsByTagName('head')[0].appendChild(styleNode);
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

  window.PDRPlugin = PDRPlugin;
})();