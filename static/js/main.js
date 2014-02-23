require.config({

  paths: {
    jquery: 'lib/jquery-1-8-0-min',
    jquery_ui: 'lib/jquery-ui',
    jquery_touch: 'lib/jquery-ui-touch',
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
    },

    'jquery_touch': {
      deps: ['jquery_ui']
    }
  }

});

require(['modules/app', 'modules/theatre'], function(AppView, TheatreView){
  new AppView();
});