var Static = (function() {
  function PaintCanvas(height, width, el) {
    var that = this;

    that.canvas = el;

    that.ctx = that.canvas.getContext("2d");

    that.initialize = function() {
      that.canvas.height = height;
      that.canvas.width = width;
      that.fillCanvas();
      that.canvasHover();
    };

    that.generateShade = function() {
      var rand = Math.floor(Math.random() * 255);

      return "rgb(" + rand + ", " + rand + ", " + rand + ")";
    };

    that.fillCanvas = function() {
      that.ctx.clearRect(0, 0, 160, 160);
      that.ctx.beginPath();

      for (var i=0; i<width; i++) {
        for (var j=0; j<height; j++) {
          that.ctx.fillStyle = that.generateShade();

          that.ctx.fillRect(i, j, 1, 1);
        }
      }
      that.drawText();
    };

    that.drawText = function() {
      that.ctx.fillStyle = "white";
      that.ctx.font = "bold 35pt Arvo";
      that.ctx.fillText("{kwl}", 12, 100);
    };

    that.canvasHover = function() {
      $(that.canvas).hover(function() {
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
  var paintCanvas = new Static.PaintCanvas(160, 160, mainCanvas);
  paintCanvas.initialize();
})();