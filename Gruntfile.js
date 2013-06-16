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
		concat: {
			options: {
				// Define a string to put between each file in the concatenated output
				separator: ';'
				//banner: '/*! <%= pkg.name %> concatenated -- <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				// Define files to concatenate
				src: ['src/**/*.js'],

				// Define location of resulting JS file
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},
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
					baseUrl: '/Users/altusllc/Git/backbone/pocumentapp/web/app/js',
					optimize: 'none',
					mainConfigFile: 'web/app/js/config.js',
					name: 'main',
					out: 'dist/out.js'
				}
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

	// Mocha tests
	grunt.registerTask('mocha', ['mocha_phantomjs']);
};