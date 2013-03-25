define(['jquery',
        'handlebars',
        'modules/canvas_view',
        'text!templates/about_me.html',
        'text!templates/projects.html',
        'text!templates/professional.html'],
  function($, Handlbars, CanvasView, aboutTpl, projectsTpl, professionalTpl) {
    var AppView = function() {
      var that = this;

      that.initialize = function() {
        that.renderLogo();
        $(".content").html(that.renderSection(aboutTpl));
        that.growContentBox();
        that.installListeners();
      };

      that.renderSection = function(tpl) {
        var compiled = Handlebars.compile(tpl);
        return compiled();
      };

      that.renderLogo = function() {
        var logo = new CanvasView();
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
      };

      that.toggle = function(section, content) {
        section.click(function() {
          $(".nav li").removeClass("active");

          if (content) {
            $(".content").html(content);
            that.growContentBox();
            $(this).addClass("active");
          }
        });
      };
    };

    return AppView;
  });