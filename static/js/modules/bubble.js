define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var Bubble = Backbone.View.extend({

    initialize: function() {
      this.ctx = this.options.ctx;
      this.velocity = this.options.velocity;
      this.x = this.options.x;
      this.y = this.options.y;
      this.radius = this.options.radius;
    },

    render: function() {
      this.update();
      this.drawBubble();
    },

    drawBubble: function() {
      this.ctx.beginPath();
      this.ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      this.ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();
    },

    update: function() {
      var lowerBound = this.x - (2 * this.radius);
      var upperBound = this.x + (2 * this.radius);

      if (this.x <= lowerBound || this.x >= upperBound || this.radius >= 80) {
        this.velocity.x *= -1;
      }

      if (this.y <= -(2 * this.radius)) {
        this.y = window.innerHeight + (2 * this.radius);
        this.x = Math.floor(Math.random() * window.innerWidth);
      }

      this.y -= (0.5 * this.velocity.y);
      this.x += (0.3 * this.velocity.x);
    }
  });

  return Bubble;
});