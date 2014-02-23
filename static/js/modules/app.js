define(['jquery',
        'backbone',
        'modules/logo_view',
        'modules/background_view',
        'modules/about_view'],
  function($, Backbone, LogoView, BackgroundView, AboutView) {

    var AppView = Backbone.View.extend({

      events: {
        'click .nav > li': 'onNavClick',
        'preview .preview': 'onPreviewChange'
      },

      content: {},

      el: 'body',

      initialize: function() {
        var self = this;

        self.createElements();
        self.renderLogo();
        self.background_view = new BackgroundView({el: '#canvas-background'});

        self.active_view = 'about';
        self.active_module = new AboutView();
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

      getContent: function(location) {
        var self = this,
            stored_content = self.content[location];

        self.active_view = location;

        if (!stored_content) {
          $.get('/' + location, self.onContentReceived.bind(self));
        } else {
          self.initializeView(stored_content);
        }
      },

      initializeView: function(html) {
        var self = this;

        self.active_module.destroy();
        self.container.html(html);

        if (self.active_view === 'about') {
          self.active_module = new AboutView();
        }
      },

      onNavClick: function(e) {
        var self = this,
            target = $(e.target).closest('li'),
            location = target.find('a').attr('href').replace('#', '');

        e.preventDefault();

        self.storeContent();
        self.nav.removeClass('active');
        target.addClass('active');

        self.getContent(location);
      },

      onContentReceived: function(html) {
        this.initializeView(html);
      },

      onPreviewChange: function(e, color) {
        this.background_view.changeBubbleColor(color);
      }
    });

    return AppView;
  });