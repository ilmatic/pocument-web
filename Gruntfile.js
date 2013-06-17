'use strict';

// Wrapper function -- do all grunt-related things here.
module.exports = function(grunt) {
	// Load all grunt tasks.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Configure paths.
	var appConfig = {
		app: 'app',
		dist: 'dist'
	};

	// Project configuration.
	grunt.initConfig({
		app: appConfig,
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			// Define the files to lint.
			all: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			
			// Configure JSHint (documented at http://www.jshint.com/docs/).
			options: {
				// Specify .jshintrc file for more options.
				jshintrc: '.jshintrc'
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint']
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		},
		mocha_phantomjs: {
			all: {
				options: {
					urls: ['http://localhost:4711/test/index.html'],

					// Bail means if a test fails, grunt will abort. False by default.
					bail: false,

					// Pipe output console.log from JS to grunt. False by default.
					log: true,

					// Mocha options
					mocha: {
						ignoreLeaks: false,
						grep: 'food'
					},

					// Select Mocha reporter
					// http://visionmedia.github.com/mocha/#reporters
					reporter: 'Spec',

					// Indicates whether 'mocha.run()' should be executed in 'bridge.js'.
					// If you include 'mocha.run()' in your html spec, check if environment is PhantomJS.
					// See example/test/test2.html
					run: true
				}
			}
		},
		mochaTest: {
			all: {
				options: {
					reporter: 'spec'
				},
				src: ['test/specs/server/**/*Spec.js']
			}
		},
		requirejs: {
			dist: {
				options: {
					baseUrl: 'web/app/js',
					optimize: 'none',
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true
				}
			}
		},
		useminPrepare: {
			html: 'web/app/index.html',
			options: {
				dest: 'dist/app'
			}
		},
		usemin: {
			html: ['dist/app/{,*/}*.html'],
			options: {
				dirs: ['dist/app']
			}
		},
		htmlmin: {
			dist: {
				options: {

				},
				files: [{
					expand: true,
					cwd: 'web/app',
					src: '*.html',
					dest: 'dist/app'
				}]
			}
		},
		bower: {
			all: {
				rjsConfig: './web/app/js/config.js'
			}
		}
	});

	// Default task(s).
	grunt.registerTask('default', ['uglify']);
	grunt.registerTask('build', [
		'useminPrepare',
		'requirejs',
		'htmlmin'
	]);

	// Mocha tests
	grunt.registerTask('mocha', ['mocha_phantomjs']);
};