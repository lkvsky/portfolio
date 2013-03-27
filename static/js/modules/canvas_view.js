define(['jquery', 'modules/globals'], function($, globals) {
  var CanvasView = function() {
    var that = this;

    that.initialize = function() {
      globals.ctx.canvas.height = globals.height;
      globals.ctx.canvas.width = globals.width;
      setTimeout(that.fillCanvas, 255);
      that.canvasHover();
    };

    that.fillCanvas = function() {
      var imageData = globals.ctx.getImageData(0, 0, globals.width, globals.height);

      for (var i=0; i<globals.width; i++) {
        for (var j=0; j<globals.height; j++) {
          var shade = Math.floor(Math.random() * 255);

          index = (i + j * globals.width) * 4;
          imageData.data[index] = Math.floor(Math.random() * 255);//shade;
          imageData.data[index+1] = Math.floor(Math.random() * 255);//shade;
          imageData.data[index+2] = Math.floor(Math.random() * 255);//shade;
          imageData.data[index+3] = 255;
        }
      }

      globals.ctx.putImageData(imageData, 0, 0);
      that.drawText();
    };

    that.drawText = function() {
      globals.ctx.beginPath();
      globals.ctx.fillStyle = "#F8F8F8";
      globals.ctx.font = "bold 35pt Arvo";
      globals.ctx.fillText("KWL", 18, 100);
    };

    that.canvasHover = function() {
      $(globals.ctx.canvas).hover(function() {
        that.interval = setInterval(that.fillCanvas, 100/33);
      }, function() {
        clearInterval(that.interval);
      });
    };
  };

  return CanvasView;
});