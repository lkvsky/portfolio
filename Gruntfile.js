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

    watch: {
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },

    cssmin: {
      minify: {
          src: 'static/styles/css/main.css',
          dest:'static/build/main.min.css'
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
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-requirejs');

  // Default task.
  grunt.registerTask('default', ['cssmin', 'requirejs:myproject']);
};