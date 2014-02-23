define(['jquery',
        'backbone',
        'modules/theatre',
        'modules/color_picker'],
  function($, Backbone, TheatreView, ColorPicker) {

    var AboutView = Backbone.View.extend({

      el: '.container',

      initialize: function() {
        this.theatre_view = new TheatreView();
        this.color_picker = new ColorPicker();
      },

      destroy: function() {
        this.theatre_view.destroy();
        this.color_picker.destroy();
      }

    });

    return AboutView;
  });