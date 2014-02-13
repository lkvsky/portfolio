define(['jquery',
        'handlebars',
        'modules/logo_view',
        'modules/background_view',
        'text!templates/about_me.html',
        'text!templates/projects.html',
        'text!templates/professional.html'],
  function($, Handlbars, LogoView, BackgroundView, aboutTpl, projectsTpl, professionalTpl) {

    var AppView = Backbone.View.extend({

      compiledHtml: {},

      initialize: function() {
        var self = this;

        self.createElements();
        self.attachEvents();
        self.renderLogo();
        new BackgroundView({el: '#canvas-background'});

        self.container.addClass('loaded');
      },

      createElements: function() {
        var self = this;

        self.container = $('.container');
        self.menu = $('.nav li');
        self.grow = $('#grow');
        self.content = $('.content');
        self.about_me = $('#about-me');
        self.projects = $('#projects');
        self.professional = $('#professional');
      },

      attachEvents: function() {
        var self = this;

        self.toggle(self.about_me, aboutTpl);
        self.toggle(self.projects, projectsTpl);
        self.toggle(self.professional,  professionalTpl);
        $(window).resize(_.bind(self.growContentBox, self));
      },

      compileSection: function(tpl) {
        var compiled = Handlebars.compile(tpl);

        return compiled();
      },

      renderLogo: function() {
        new LogoView({el: '.logo'});
      },

      growContentBox: function() {
        var self = this,
            grow = self.grow,
            contentHeight = self.content.outerHeight();

        grow[0].style.height = contentHeight + 'px';
      },

      toggle: function(toggle, template) {
        var self = this;

        toggle.click(self.onShowSection.bind(self, toggle, template));
      },

      onShowSection: function(toggle, template) {
        var self = this,
            key = toggle.attr('id');

        self.menu.removeClass('active');
        toggle.addClass('active');

        if (!self.compiledHtml[key]) {
          self.compiledHtml[key] = self.compileSection(template);
        }

        self.content.html(self.compiledHtml[key]);
        setTimeout(_.bind(self.growContentBox, self), 50);
      }
    });

    return AppView;
  });