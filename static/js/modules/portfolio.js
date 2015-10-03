function Portfolio() { }

Portfolio.prototype.init = function () {
    document.addEventListener('DOMContentLoaded', this.attachEvents.bind(this))
}

Portfolio.prototype.attachEvents = function () {
    var icons = document.getElementsByClassName('app-icon'),
        close = document.getElementsByClassName('app-info-close')[0];

    for (i = 0; i < icons.length; i++) {
        icons[i].addEventListener('click', this.openAppInfo.bind(this));
    }

    close.addEventListener('click', this.closeAppInfo.bind(this));
}

Portfolio.prototype.openAppInfo = function (evt) {
    var appInfo = document.getElementsByClassName('app-info')[0];

    appInfo.classList.remove('collapsed');
}

Portfolio.prototype.closeAppInfo = function (evt) {
    var appInfo = document.getElementsByClassName('app-info')[0];

    appInfo.classList.add('collapsed');
}

module.exports = Portfolio;