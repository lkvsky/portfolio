define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var Bubble = Backbone.View.extend({

    initialize: function() {
      var self = this,
          options = self.options;

      self.ctx = options.ctx;
      self.velocity = options.velocity;
      self.x = options.x;
      self.y = options.y;
      self.radius = options.radius;
    },

    render: function() {
      var self = this;

      self.update();
      self.drawBubble();
    },

    drawBubble: function() {
      var ctx = this.ctx;

      ctx.beginPath();
      ctx.strokeStyle = "rgba(255, 255, 255, 1)";
      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    },

    update: function() {
      var self = this,
          lowerBound = self.x - (2 * self.radius),
          upperBound = self.x + (2 * self.radius);

      if (self.x <= lowerBound || self.x >= upperBound || self.radius >= 80) {
        self.velocity.x *= -1;
      }

      if (self.y <= -(2 * self.radius)) {
        self.y = window.innerHeight + (2 * self.radius);
        self.x = Math.floor(Math.random() * window.innerWidth);
      }

      self.y -= (0.5 * self.velocity.y);
      self.x += (0.3 * self.velocity.x);
    }
  });

  return Bubble;
});