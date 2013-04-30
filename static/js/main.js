require.config({

  paths: {
    jquery: 'lib/jquery-1-8-0-min',
    text: 'lib/text',
    handlebars: 'lib/handlebars',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore'
  },

  shim: {
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    'underscore': {
      exports: '_'
    }
  }

});

require(['modules/app'], function(AppView){
  var app = new AppView();
  app.initialize();
});