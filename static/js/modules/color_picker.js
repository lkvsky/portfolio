define(['jquery',
        'underscore',
        'backbone',
        'modules/color_selector',
        'modules/shade_selector'],
  function($, _, Backbone, ColorSelector, ShadeSelector) {
    var ColorPicker = Backbone.View.extend({
      events: {
        'click .color-canvas': 'changeColor',
        'click .shade-canvas': 'changeColor',
        'drag .color-picker': 'changeColor',
        'drag .shade-picker': 'changeColor'
      },

      el: '.color',

      initialize: function() {
        var self = this;

        self.color_selector = new ColorSelector({
          el: '.color-selector',
          height: 50,
          width: 300,
          orientation: 'horizontal',
          canvas: $('.color-canvas')[0]
        });

        self.shade_selector = new ShadeSelector({
          el: '.shade-selector',
          height: 50,
          width: 300,
          canvas: $('.shade-canvas')[0]
        });

        self.color_selector.render();
        self.shade_selector.render();
        self.changeColor();
      },

      createElements: function() {
        var self = this;

        self.color_selector = new ColorSelector({
          el: '.color-selector',
          height: 50,
          width: 300,
          orientation: 'horizontal',
          canvas: $('#color-canvas')[0]
        });

        self.shade_selector = new ShadeSelector({
          el: '.shade-selector',
          height: 50,
          width: 300,
          canvas: $('#shade-canvas')[0]
        });
      },

      changeColor: function(e) {
        var self = this;

        self.shade_selector.displayColor = self.color_selector.getColor(e);
        self.shade_selector.render();
        self.changePreview();
      },

      changePreview: function() {
        var self = this,
            color = self.shade_selector.getColor(),
            color_hash;

        if (color == 'rgba(0, 0, 0, 0)') {
          color = 'rgba(255, 255, 255, 1)';
        }

        color = color.replace('rgba(', '').replace(')', '').split(', ').slice(0, 3);
        color_hash = {
          r: color[0],
          g: color[1],
          b: color[2]
        };
        $('.preview').trigger('preview', color_hash);
      },

      destroy: function() {
        var self = this;

        self.color_selector.undelegateEvents();
        self.shade_selector.undelegateEvents();
      }

    });

    return ColorPicker;
  });