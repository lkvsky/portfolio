module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        files: {
          'static/styles/css/main.css' : 'static/styles/sass/main.scss'
        }
      }
    },

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    minify: {
      'myproject': {
        files: {
          'static/build/main.min.css': [ 'static/styles/css//main.css']
        }
      }
    },

    requirejs: {
      'myproject': {
        options: {
          name: 'main',
          baseUrl: 'static/js',
          mainConfigFile: 'static/js/main.js',
          optimize: 'uglify',
          out: 'static/js/optimized-main.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['minify:myproject', 'requirejs:myproject']);
};