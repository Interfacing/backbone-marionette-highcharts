fs = require('fs');
_ = require('underscore');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    clean: ['dist'],

    mince: {
      main: {
        options: {
          include: ["src/js"]
        },
        files: [{
          src: [
            "src/js/highcharts.js",
            "src/js/models/serie.js",
            "src/js/models/highcharts-options.js",
            "src/js/views/chart.js"
          ],
          dest: "dist/backbone-marionette-highcharts.js"
        }]
      }
    },

    uglify: {
      main: {
        options: {
          compress: true,
          mangle: true,
          screwIE8: true
        },
        files: {
          'dist/backbone-marionette-highcharts.min.js': [
            'dist/backbone-marionette-highcharts.js'
          ]
        }
      }
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        eqnull: true,
        browser: true
      },
      all: ['src/js/**/*.js']
    },

    karma: {
      all: {
        hostname: '127.0.0.1',
        client: { captureConsole: true },
        options: {
          logLevel: 'INFO',
          browsers: ['Firefox'],
          frameworks: ['jasmine'],
          reporters: ['progress'],
          singleRun: true,
          background: false,
          captureConsole: true,
          files: [
            "node_modules/jquery/dist/jquery.min.js",
            "node_modules/underscore/underscore-min.js",
            "node_modules/backbone/backbone-min.js",
            "node_modules/backbone.marionette/lib/backbone.marionette.min.js",
            "dist/backbone-marionette-highcharts.min.js",
            'test/unit/libs/jasmine-jquery.js',
            'test/unit/spec/**/*.js']
        }
      }
    },

    protractor: {
      all: {
        options: {
          configFile: 'test/e2e/config.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-mincer');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-protractor-runner');

  grunt.registerTask('default',  ['clean', 'jshint', 'mince', 'uglify']);
  grunt.registerTask('test',  ['karma']);
};