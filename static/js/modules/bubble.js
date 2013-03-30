define(['jquery'], function($) {
  var Bubble = function(options) {
    var that = this;

    that.x = options.x;
    that.y = options.y;
    that.radius = options.radius;
    that.velocity = options.velocity;

    that.draw = function() {
      that.update();
      that.drawBubble();
    };

    that.drawBubble = function() {
      options.ctx.beginPath();
      options.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      options.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      options.ctx.arc(that.x, that.y, that.radius, 0, Math.PI*2, true);
      options.ctx.closePath();
      options.ctx.fill();
      options.ctx.stroke();
    };

    that.update = function() {
      var lowerBound = options.x - (2 * that.radius);
      var upperBound = options.x + (2 * that.radius);

      if (that.x <= lowerBound || that.x >= upperBound || that.radius >= 80) {
        that.velocity.x *= -1;
      }

      if (that.y <= -(2 * that.radius)) {
        that.y = window.innerHeight + (2 * that.radius);
        that.x = Math.floor(Math.random() * window.innerWidth);
      }

      that.y -= (0.5 * that.velocity.y);
      that.x += (0.3 * that.velocity.x);
    };
  };

  return Bubble;
});