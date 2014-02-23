define(['jquery', 'underscore', 'backbone', 'jquery_touch'],
  function($, _, Backbone) {
    var ShadeSelector = Backbone.View.extend({
      displayColor: 'rgb(90, 142, 152)',

      events: {
        'click #shade-canvas': 'moveSelector'
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
        self.shade_picker = $('.shade-picker');
      },

      render: function() {
        var self = this;

        self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
        self.initializeGradient();
        self.addColorStops();
        self.ctx.fillStyle = self.gradient;
        self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);
      },

      initializeDragger: function() {
        this.shade_picker.draggable({
          containment: 'parent',
          snapMode: 'inner',
          axis: 'x',
          cursorAt: {
            right: 25
          }
        });
      },

      initializeGradient: function() {
        var self = this;

        self.gradient = self.ctx.createLinearGradient(0,
                      self.canvas.width/2,
                      self.canvas.width,
                      self.canvas.width/2);
      },

      addColorStops: function() {
        var self = this;

        self.gradient.addColorStop(0, 'white');
        self.gradient.addColorStop(0.5, self.displayColor);
        self.gradient.addColorStop(1, 'black');
      },

      getColor: function(e) {
        var self = this,
            x = parseInt(self.shade_picker.position().left, 10) - self.ctx.canvas.offsetLeft || 0,
            y = 30,
            pp = self.ctx.getImageData(x, y, 1, 1).data;

        return 'rgba(' + pp[0] + ', ' + pp[1] + ', ' + pp[2] + ', ' + pp[3] + ')';
      },

      moveSelector: function(e) {
        var self = this,
            x = e.pageX - self.ctx.canvas.offsetLeft - 5;

        self.shade_picker.css('left', x);
      }
    });

    return ShadeSelector;
});
