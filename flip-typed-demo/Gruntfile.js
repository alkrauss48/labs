var ngrok = require('ngrok');

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        bower : {
          install : {
            options : {
              targetDir : 'vendor/bower_components',
              layout : 'byComponent',
              verbose: true,
              cleanup: true
            }
          }
        },
        browserify : {
          app : {
            files : {
              'build/app.js' : ['src/js/app.js']
            }
          },
          beforeBody : {
            files: {
              'build/beforeBody.js' : ['src/js/beforeBody.js']
            }
          },
          ie : {
            files : {
              'build/app.ie.js' : ['src/js/ie/app.js']
            }
          }
        },
        uglify: {
            options: {
              sourceMap: true
            },
            app: {
              files: {
                'dist/js/app.js': [ 'build/app.js' ],
              },
            },
            beforeBody: {
              files: {
                'dist/js/beforeBody.js': [ 'build/beforeBody.js' ],
              },
            },
            ie: {
              files: { 'dist/js/app.ie.js': [ 'build/app.ie.js' ] },
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    bundleExec: true,
                    compass: true,
                    sourcemap: 'none',
                    lineNumbers: true,
                    require: ['susy']
                },
                files: {
                    'dist/css/app.css': [ 'src/sass/app.scss' ]
                }
            }
        },
        imagemin: {
          dynamic: {
            files: [{
              expand: true,               // Enable dynamic expansion
              cwd: 'src/images/',         // Src matches are relative to this path
              src: ['*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'dist/images/'        // Destination path prefix
            }]
          }
        },
        pagespeed: {
          options: {
            nokey: true
          },
          desktop: {
            options: {
              strategy: "desktop",
              locale: "en",
              threshold: 80
            }
          },
          mobile: {
            options: {
              strategy: "mobile",
              locale: "en",
              threshold: 80
            }
          }
        },
        concurrent: {
          browserify: [ 'browserify:app', 'browserify:beforeBody' ],
          uglify:     [ 'uglify:app', 'uglify:beforeBody' ],
        },
        watch: {
            options: {
              livereload: true
            },
            sass: {
              files: [ 'src/sass/*.scss', 'src/sass/**/*.scss' ],
              tasks: [ 'sass' ]
            },
            images: {
              files: [ 'src/images/*' ],
              tasks: [ 'newer:imagemin' ]
            },
            uglify_dist: {
              files: [ 'src/js/*.js', 'src/js/lib/*.js' ],
              tasks: [ 'concurrent:browserify', 'concurrent:uglify' ]
            },
            uglify_ie: {
              files: [ 'src/js/ie/*.js' ],
              tasks: [ 'browserify:ie', 'uglify:ie' ]
            }
        },
    });

    // Register task for ngrok-pagespeed
    grunt.registerTask('ngrok-pagespeed', 'Run pagespeed with ngrok', function() {
      var done = this.async();
      var port = 8000;

      ngrok.connect(port, function(err, url) {
        if (err !== null) {
          grunt.fail.fatal(err);
          return done();
        }
        grunt.config.set('pagespeed.options.url', url);
        grunt.task.run('pagespeed');
        done();
      });
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-pagespeed');
    grunt.loadNpmTasks('grunt-concurrent');

    // Default task(s).
    grunt.registerTask('default', [
      'browserify',
      'uglify',
      'sass',
      'watch'
    ]);

    grunt.registerTask( 'init',     [ 'bower:install'] );
    grunt.registerTask( 'images',   [ 'newer:imagemin'] );
    grunt.registerTask( 'analyze',  [ 'ngrok-pagespeed'] );
};
