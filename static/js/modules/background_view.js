define(['jquery', 'modules/bubble'], function($, Bubble) {
  var BackgroundView = function() {
    var that = this;

    that.ctx = document.getElementById("canvas-background").getContext("2d");
    that.bubbles = [];

    that.initialize = function() {
      that.ctx.canvas.height = window.innerHeight;
      that.ctx.canvas.width = window.innerWidth;
      that.generateBubbles();
      setInterval(that.draw, 1000/33);
    };

    that.draw = function() {
      that.ctx.canvas.height = window.innerHeight;
      that.ctx.canvas.width = window.innerWidth;

      for (var i = 0; i < that.bubbles.length; i++) {
        that.bubbles[i].draw();
      }
    };

    that.createBubble = function(argX, argY, argRad, argVel) {
      var options = {
        ctx: that.ctx,
        velocity: argVel,
        x: argX,
        y: argY,
        radius: argRad
      };

      return new Bubble(options);
    };

    that.generateBubbles = function() {
      for (var i = 0; i < 40; i++) {
        var vel = {
          x: Math.floor(Math.random() * 5) + 1,
          y: Math.floor(Math.random() * 5) + 1
        };
        var y = Math.floor(Math.random() * that.ctx.canvas.height);
        var x = Math.floor(Math.random() * that.ctx.canvas.width);
        var rad = Math.floor(Math.random() * 50) + 5;

        that.bubbles.push(that.createBubble(x, y, rad, vel));
      }
    };

  };

  return BackgroundView;
});