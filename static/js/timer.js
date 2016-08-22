                                                                                                       function countDown(timer) {
  if (timer.t <= 0) {
    timer.stop();
  } else if (timer._active) {
    timer._counter = Date.now();
    timer.count.html(timer.t--);
    timer.setColor(timer.shine());
    setTimeout(function() { countDown(timer); }, 1000);
  }
}

function Timer(nth, mode) {
  // 计时器相关
  this._mode = mode;
  // 运动员相关
  this.nth = nth;
  this.count = $('#timer-count-' + this.nth);
  this.status = $('#timer-status-' + this.nth);
  this.light = $('#light-' + this.nth);
  // 函数
  this.countDown = function() { countDown(this); };
  this.setColor = function (color) {
    return this.light.css(
      "background-image",
      "url(static/imgs/light" + color + ".png)"
    );
  };
  this.start = function() {
    if (!this._active) {
      this._active = true;
      this.status.html('START');
      setTimeout(function() { }, this._remain);
      this._remain = 0;
      this.countDown();
    }
  };
  this.suspend = function() {
    if (this._active) {
      this._active = false;
      this.status.html('SUSPEND');
      this._remain = 1000 - (Date.now() - this._counter);
      this._counter = null;
    }
  };
  this.stop = function() {
    this.shine();
    this.count.html(0);
    this.status.html('STOP');
  };
  this.shine = function() {
    if (this.t < 10) {
      return 'R';
    } else if (this.t >= 10 && this.t < 30) {
      return 'Y';
    } else {
      return 'G';
    }
  };
  this._init = function() {
    this.t = this._mode;
    this._active = false;
    this._counter = null;
    this._remain = 0;
    this.count.html(this.t);
    this.status.html('STOP');
    this.setColor('R');
  };
  this.reset = this._init;
  this._init();
}
