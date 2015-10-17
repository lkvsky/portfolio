function Portfolio() { }

Portfolio.prototype.init = function () {
    this.attachEvents();
}

Portfolio.prototype.attachEvents = function () {
    var icons = $('.js_app-icon'),
        close = $('.app-info-close'),
        navLinks = $('.js_nav-link');

    icons.on('click', this.openAppInfo.bind(this));
    close.on('click', this.closeAppInfo.bind(this));
    navLinks.on('click', this.onNavLinkClick.bind(this));

}

Portfolio.prototype.openAppInfo = function (evt) {
    var appIconInfoString = $(evt.currentTarget).closest('.js_app-icon').data('info'),
        appInfoWrapper = $('.app-info'),
        appInfoTexts = $('.js_app-info-text'),
        iphoneSvg = $('.iphone-svg').closest('div');

    appInfoTexts.filter('[data-info="' + appIconInfoString + '"]').removeClass('hide');
    appInfoWrapper.removeClass('collapsed');
    iphoneSvg.addClass('shake');
}

Portfolio.prototype.closeAppInfo = function (evt) {
    var appInfo = $('.app-info'),
        appInfoTexts = $('.js_app-info-text'),
        iphoneSvg = $('.iphone-svg').closest('div');

    appInfoTexts.addClass('hide');
    appInfo.addClass('collapsed');
    iphoneSvg.removeClass('shake');
}

Portfolio.prototype.onNavLinkClick = function (evt) {
    var icon = $(evt.currentTarget),
        targetSection = $('.' + icon.data('scroll'));

    $('html, body').animate({
        scrollTop: targetSection.offset().top - 50
    }, 300);
}

module.exports = Portfolio;