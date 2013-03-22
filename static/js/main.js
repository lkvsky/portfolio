var Static = (function() {
  function PaintCanvas(height, width, ctx) {
    var that = this;


    that.initialize = function() {
      ctx.canvas.height = height;
      ctx.canvas.width = width;
      setTimeout(that.fillCanvas, 255);
      that.canvasHover();
    };

    that.fillCanvas = function() {
      var imageData = ctx.getImageData(0, 0, width, height);

      for (var i=0; i<width; i++) {
        for (var j=0; j<height; j++) {
          var shade = Math.floor(Math.random() * 255);

          index = (i + j * width) * 4;
          imageData.data[index] = shade;
          imageData.data[index+1] = shade;
          imageData.data[index+2] = shade;
          imageData.data[index+3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      that.drawText();
    };

    that.drawText = function() {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.font = "bold 35pt Arvo";
      ctx.fillText("{kwl}", 12, 100);
    };

    that.canvasHover = function() {
      $(ctx.canvas).hover(function() {
        that.interval = setInterval(that.fillCanvas, 100/33);
      }, function() {
        clearInterval(that.interval);
      });
    };
  }

  return {
    PaintCanvas: PaintCanvas
  };
})();

(function() {
  var mainCanvas = document.getElementsByClassName("logo")[0];
  var ctx = mainCanvas.getContext("2d");
  var paintCanvas = new Static.PaintCanvas(160, 160, ctx);
  paintCanvas.initialize();
})();