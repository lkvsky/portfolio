define(['jquery',
        'handlebars',
        'modules/logo_view',
        'modules/background_view',
        'text!templates/about_me.html',
        'text!templates/projects.html',
        'text!templates/professional.html'],
  function($, Handlbars, LogoView, BackgroundView, aboutTpl, projectsTpl, professionalTpl) {
    var AppView = function() {
      var that = this;

      that.initialize = function() {
        that.renderLogo();
        $(".content").html(that.renderSection(aboutTpl));
        that.installListeners();
        setTimeout(that.growContentBox, 50);

        new BackgroundView().initialize();
      };

      that.renderSection = function(tpl) {
        var compiled = Handlebars.compile(tpl);
        return compiled();
      };

      that.renderLogo = function() {
        var logo = new LogoView();
        logo.initialize();
      };

      that.growContentBox = function() {
        var grow = $('#grow');
        var content = $('.content');
        var contentHeight = content.outerHeight();

        grow[0].style.height = contentHeight + "px";
      };

      that.installListeners = function() {
        that.toggle($("#about-me"), that.renderSection(aboutTpl));
        that.toggle($("#projects"), that.renderSection(projectsTpl));
        that.toggle($("#professional"), that.renderSection(professionalTpl));
        $(window).resize(that.growContentBox);
      };

      that.toggle = function(section, content) {
        section.click(function() {
          $(".nav li").removeClass("active");

          if (content) {
            $(".content").html(content);
            $(this).addClass("active");
          }

          setTimeout(that.growContentBox, 50);
        });
      };
    };

    return AppView;
  });