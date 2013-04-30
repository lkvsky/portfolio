define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
  var LogoView = Backbone.View.extend({
    events: {
      'mouseenter #logo-static': 'onHover',
      'mouseleave #logo-static': 'offHover'
    },

    initialize: function() {
      var canvas = $("#logo-static")[0];

      this.ctx = canvas.getContext("2d");
      this.ctx.canvas.height = 160;
      this.ctx.canvas.width = 160;

      setTimeout(_.bind(this.render, this), 255);
    },

    render: function() {
      var imageData = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      for (var i=0; i<this.ctx.canvas.width; i++) {
        for (var j=0; j<this.ctx.canvas.height; j++) {
          var shade = Math.floor(Math.random() * 255);

          index = (i + j * this.ctx.canvas.width) * 4;
          imageData.data[index] = shade;
          imageData.data[index+1] = shade;
          imageData.data[index+2] = shade;
          imageData.data[index+3] = 255;
        }
      }

      this.ctx.putImageData(imageData, 0, 0);
      this.drawText();
    },

    drawText: function() {
      this.ctx.beginPath();
      this.ctx.fillStyle = "#F8F8F8";
      this.ctx.font = "bold 35pt Arvo";
      this.ctx.fillText("KWL", 18, 100);
    },

    onHover: function() {
      this.interval = setInterval(_.bind(this.render, this), 100/33);
    },

    offHover: function() {
      var that = this;

      clearInterval(that.interval);
    }
  });

  return LogoView;
});