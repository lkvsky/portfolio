define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var Bubble = Backbone.View.extend({

    r: 90,

    g: 142,

    b: 152,

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
      var self = this,
          ctx = self.ctx;

      ctx.beginPath();
      ctx.strokeStyle = self.getRgba(0.1);
      ctx.fillStyle = self.getRgba(0.5);
      ctx.arc(self.x, self.y, self.radius, 0, Math.PI*2, true);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    },

    getRgba: function(opacity) {
      var self = this;

      return 'rgba(' + self.r + ', ' + self.g + ', ' + self.b + ', ' + opacity + ')';
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
    },

    changeColor: function(color) {
      var self = this;

      self.r = color.r;
      self.g = color.g;
      self.b = color.b;
    }
  });

  return Bubble;
});