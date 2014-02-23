define(['jquery', 'underscore', 'backbone', 'jquery_touch'],
  function($, _, Backbone) {
    var ColorSelector = Backbone.View.extend({
      events: {
        'click #color-canvas': 'moveSelector'
      },

      initialize: function() {
        var self = this;

        self.createElements();
        self.initializeDragger();
      },

      createElements: function() {
        var self = this;

        self.canvas = self.options.canvas;
        self.canvas.width = self.options.width;
        self.canvas.height = self.options.height;
        self.ctx = self.canvas.getContext('2d');
        self.orientation = self.options.orientation;
        self.color_picker = $('.color-picker');
      },

      render: function() {
        var self = this;

        self.initializeGradient();
        self.addColorStops();
        self.ctx.fillStyle = self.gradient;
        self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
      },

      initializeGradient: function() {
        var self = this;

        if (self.orientation == 'horizontal') {
          self.gradient = self.ctx.createLinearGradient(0,
                              self.canvas.width/2,
                              self.canvas.width,
                              self.canvas.width/2);
        } else {
          self.gradient = self.ctx.createLinearGradient(0,
                              self.canvas.width/2,
                              0,
                              self.canvas.height);
        }
      },

      initializeDragger: function() {
        this.color_picker.draggable({
          containment: 'parent',
          snapMode: 'inner',
          axis: 'x',
          cursorAt: {
            right: 25
          }
        });
      },

      addColorStops: function() {
        var self = this;

        self.gradient.addColorStop(0, 'black');
        self.gradient.addColorStop(1/8, 'red');
        self.gradient.addColorStop(2/8, 'orange');
        self.gradient.addColorStop(3/8, 'yellow');
        self.gradient.addColorStop(4/8, 'green');
        self.gradient.addColorStop(5/8, 'blue');
        self.gradient.addColorStop(6/8, 'indigo');
        self.gradient.addColorStop(7/8, 'violet');
        self.gradient.addColorStop(1, 'black');
      },

      getColor: function(e) {
        var self = this,
            x = parseInt($('.color-picker').position().left, 10) - self.ctx.canvas.offsetLeft || 0,
            y = 30,
            pp = self.ctx.getImageData(x, y, 1, 1).data;

        return 'rgba(' + pp[0] + ', ' + pp[1] + ', ' + pp[2] + ', ' + pp[3] + ')';
      },

      moveSelector: function(e) {
        var self = this,
            x = e.pageX - self.ctx.canvas.offsetLeft - 5;

        self.color_picker.css('left', x);
      }
    });

    return ColorSelector;
  });