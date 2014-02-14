define(['jquery',
        'backbone',
        'modules/logo_view',
        'modules/background_view',
        'modules/theatre'],
  function($, Backbone, LogoView, BackgroundView, TheatreView) {

    var AppView = Backbone.View.extend({

      events: {
        'click .nav > li': 'onNavClick'
      },

      content: {},

      el: 'body',

      initialize: function() {
        var self = this;

        self.createElements();
        self.renderLogo();
        new BackgroundView({el: '#canvas-background'});
        new TheatreView();
      },

      createElements: function() {
        var self = this;

        self.container = $('.container');
        self.nav = $('.nav li');
      },

      renderLogo: function() {
        new LogoView({el: '.logo'});
      },

      storeContent: function() {
          var self = this;

          self.content[self.nav.filter('.active').attr('data-content')] = self.container.html();
      },

      onNavClick: function(e) {
        var self = this,
            target = $(e.target).closest('li'),
            location = target.find('a').attr('href').replace('#', '');

        e.preventDefault();

        self.storeContent();
        self.nav.removeClass('active');
        target.addClass('active');

        if (!self.content[location]) {
          $.get('/' + location, self.onContentReceived.bind(self));
        } else {
          self.container.html(self.content[location]);
        }
      },

      onContentReceived: function(html) {
        this.container.html(html);
      }
    });

    return AppView;
  });