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
        src: 'public/stylesheets/*.css'
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

    cssmin: {
      minify: {
          src: 'static/styles/css/main.css',
          dest:'static/build/css/main.min.css'
      }
    },

    webpack: {
      portfolio: {
          entry: './static/js/modules/main.js',
          output: {
            path: './static/js',
            filename: 'bundle.js'
          }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-webpack');

  // Default task.
  grunt.registerTask('default', ['cssmin']);
};