require.config({

  paths: {
    jquery: 'lib/jquery-1-8-0-min',
    text: 'lib/text',
    handlebars: 'lib/handlebars'
  }

});

require(['modules/app'], function(AppView){
  var app = new AppView();
  app.initialize();
});