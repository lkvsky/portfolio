require.config({

  paths: {
    jquery: 'lib/jquery-1-8-0-min'
  }

});

require(['modules/canvas_view'], function(CanvasView){
  var logo = new CanvasView();
  logo.initialize();
});