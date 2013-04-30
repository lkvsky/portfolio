define(['jquery', 'underscore', 'backbone', 'modules/bubble'], function($, _, Backbone, Bubble) {
  var BackgroundView = Backbone.View.extend({
    bubbles: [],

    initialize: function() {
      this.ctx = this.el.getContext("2d");
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.canvas.width = window.innerWidth;
      this.generateBubbles();

      setInterval(_.bind(this.render, this), 1000/33);
    },

    render: function() {
      this.ctx.canvas.height = window.innerHeight;
      this.ctx.canvas.width = window.innerWidth;

      for (var i = 0; i < this.bubbles.length; i++) {
        this.bubbles[i].render();
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
      for (var i = 0; i < 40; i++) {
        var vel = {
          x: Math.floor(Math.random() * 5) + 1,
          y: Math.floor(Math.random() * 5) + 1
        };
        var y = Math.floor(Math.random() * this.ctx.canvas.height);
        var x = Math.floor(Math.random() * this.ctx.canvas.width);
        var rad = Math.floor(Math.random() * 50) + 5;

        this.bubbles.push(this.createBubble(x, y, rad, vel));
      }
    }
  });

  return BackgroundView;
});