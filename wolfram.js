(function (root) {
  var Wolfram = function (rule, width) {
    this.ruleset = rule
    this.width = parseInt(width)

    this.world = new Array(this.width)
    this.next_world = new Array(this.width)

    this.initialize()
  }

  Wolfram.prototype.initialize = function () {
    // reset world with random data
    for (var x=0, w=this.width; x < w; x++) {
      // noise
      this.world[x] = Math.floor(Math.random() * 2)
    }
  }

  Wolfram.prototype.apply_ruleset = function (index) {
    var a, b, c;

    if (index === 0) {
      a = this.width - 1;
      b = index;
      c = index + 1;
    } else if (index == this.width - 1) {
      a = index - 1;
      b = index;
      c = 0;
    } else {
      a = index - 1;
      b = index;
      c = index + 1;
    }

    // convert indecies to values
    a = this.world[a];
    b = this.world[b];
    c = this.world[c];

    // get int from bits
    var rule_pattern = (a * 4) + (b * 2) + c;

    var result = (this.ruleset & parseInt(Math.pow(2, rule_pattern)));

    // increment by truth value or decrement by 1
    return result >= 1 ? 1 : 0;
  }

  Wolfram.prototype.step = function () {
    // generate next world step
    for (var x=0, w = this.width; x < w; x++) {
      this.next_world[x] = this.apply_ruleset(x)
    }

    // replace current gen with updated
    for (var x=0, w = this.width; x < w; x++) {
      this.world[x] = this.next_world[x]
    }
  }

  Wolfram.prototype.set_rule = function (r) {
    r = parseInt(r)
    if (r >= 0 && r <= 255) {
      this.initialize()
      this.ruleset = r
    }
  }

  Wolfram.prototype.each_cell = function (callback) {
    for (var x=0, w = this.width; x < w; x++) {
      callback(x, this.world[x])
    }
  }

  root.Wolfram = Wolfram
})(window)
