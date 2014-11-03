(function (root) {
  function componentToHex(c) {
    var hex = c.toString(16)
    return hex.length == 1 ? "0" + hex : hex
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
  }

  // just enough drawing library
  var Surface = function (element_id) {
    this.canvas = document.getElementById(element_id);
    this.width = this.canvas.width
    this.height = this.canvas.height
    this.ctx = this.canvas.getContext("2d");
  }

  // s.fill(10, 10, 10) or s.fill('#ff00ff')
  Surface.prototype.fill = function(r, g, b) {
    if (typeof g == 'undefined') { this.ctx.fillStyle = r }
    else { this.ctx.fillStyle = rgbToHex(r, g, b) }
  }

  Surface.prototype.rect = function(x, y, w, h) {
    this.ctx.fillRect(x, y, w, h)
  }

  Surface.prototype.background = function(r, g, b) {
    this.fill(r, g, b)
    this.rect(0, 0, this.width, this.height)
  }

  Surface.prototype.draw = function(callback) {
    var self = this

    this._draw = function (timestamp) {
      callback()

      if (!self.kill) {
        window.requestAnimationFrame(self._draw)
      } else {
        self.kill = false
        self.is_running = false
      }
    }
  }

  Surface.prototype.stop = function () {
    this.kill = true
  }

  Surface.prototype.start = function () {
    if (this.is_running) return
    window.requestAnimationFrame(this._draw);
    this.is_running = true
  }

  root.Surface = Surface
})(window)

