var webpack = require('webpack');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'static/styles/css/main.css': 'static/styles/sass/main.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'static/styles/css/*.css'
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass', 'postcss']
      },
      js: {
        files: '**/*.js',
        tasks: ['webpack']
      }
    },

    webpack: {
      portfolio: {
        entry: './static/js/modules/main.js',
        output: {
          path: './static/js',
          filename: 'bundle.js'
        },
        externals: {
          'jquery': 'jQuery'
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task.
  grunt.registerTask('default', ['sass', 'postcss', 'webpack']);
};