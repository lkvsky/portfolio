define(['jquery', 'underscore', 'backbone', 'modules/bubble'], function($, _, Backbone, Bubble) {
  var BackgroundView = Backbone.View.extend({
    bubbles: [],

    initialize: function() {
      var self = this;

      self.ctx = self.el.getContext("2d");
      self.ctx.canvas.height = window.innerHeight;
      self.ctx.canvas.width = window.innerWidth;
      self.generateBubbles();

      setInterval(_.bind(self.render, self), 1000/33);
    },

    render: function() {
      var self = this;

      self.ctx.canvas.height = window.innerHeight;
      self.ctx.canvas.width = window.innerWidth;

      for (var i = 0; i < self.bubbles.length; i++) {
        self.bubbles[i].render();
      }
    },

    createBubble: function(argX, argY, argRad, argVel) {
      var options = {
        ctx: this.ctx,
        velocity: argVel,
        x: argX,
        y: argY,
        radius: argRad
      };

      return new Bubble(options);
    },

    generateBubbles: function() {
      var self = this,
          canvas = self.ctx.canvas,
          i, vel, y, x, rad;

      for (i = 0; i < 40; i++) {
        vel = {
          x: Math.floor(Math.random() * 5) + 1,
          y: Math.floor(Math.random() * 5) + 1
        };
        y = Math.floor(Math.random() * canvas.height);
        x = Math.floor(Math.random() * canvas.width);
        rad = Math.floor(Math.random() * 50) + 5;

        self.bubbles.push(self.createBubble(x, y, rad, vel));
      }
    }
  });

  return BackgroundView;
});