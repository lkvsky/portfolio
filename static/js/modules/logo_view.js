define(['jquery'], function($) {
  var LogoView = function() {
    var that = this;

    that.ctx = document.getElementById('logo-static').getContext("2d");
    that.height = 160;
    that.width = 160;

    that.initialize = function() {
      that.ctx.canvas.height = that.height;
      that.ctx.canvas.width = that.width;
      setTimeout(that.fillCanvas, 255);
      that.canvasHover();
    };

    that.fillCanvas = function() {
      var imageData = that.ctx.getImageData(0, 0, that.width, that.height);

      for (var i=0; i<that.width; i++) {
        for (var j=0; j<that.height; j++) {
          var shade = Math.floor(Math.random() * 255);

          index = (i + j * that.width) * 4;
          imageData.data[index] = shade;
          imageData.data[index+1] = shade;
          imageData.data[index+2] = shade;
          imageData.data[index+3] = 255;
        }
      }

      that.ctx.putImageData(imageData, 0, 0);
      that.drawText();
    };

    that.drawText = function() {
      that.ctx.beginPath();
      that.ctx.fillStyle = "#F8F8F8";
      that.ctx.font = "bold 35pt Arvo";
      that.ctx.fillText("KWL", 18, 100);
    };

    that.canvasHover = function() {
      $(that.ctx.canvas).hover(function() {
        that.interval = setInterval(that.fillCanvas, 100/33);
      }, function() {
        clearInterval(that.interval);
      });
    };
  };

  return LogoView;
});