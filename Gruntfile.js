module.exports = function(grunt) {
 
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
 
    concat: {
      'myproject': {
        src: [ 'static/js/lib/handlbars.js',
               'static/js/lib/jquery-1-8-0-min.js',
               'static/js/lib/require.js',
               'static/js/lib/text.js',
               'static/js/main.js',
               'static/js/modules/app.js',
               'static/js/modules/background_view.js',
               'static/js/modules/bubble.js',
               'static/js/modules/logo_view.js' ],
        dest: 'static/build/all.js'
      }
    },
 
    uglify: {
      'myproject': {
        src: 'static/build/all.js',
        dest: 'static/build/all.min.js'
      }
    },
 
    mincss: {
      'myproject': {
        files: {
          'static/build/main.min.css': [ 'static/css/main.css']
        }
      }
    }
  });
 
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-mincss');
 
  // Default task.
  grunt.registerTask('default', ['concat:myproject', 'uglify:myproject', 'mincss:myproject']);
};