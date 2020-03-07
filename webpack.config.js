const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: './static/js/modules/index.js'
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'static/dist'),
        filename: 'main.js'
    }
};