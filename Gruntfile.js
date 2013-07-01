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
		mochaTest: {
			all: {
				options: {
					reporter: 'spec'
				},
				src: ['test/specs/server/**/*Spec.js']
			}
		},
		// Clean directories before running a build or test
		clean: {
			web: {
				src: ['web/build/*', 'web/dist/*']
			}
		},
		// RequireJS optimizer
		requirejs: {
			dist: {
				options: {
					// Base URL for referencing modules
					baseUrl: 'web/app/js',
					optimize: 'none',
					preserveLicenseComments: false,
					useStrict: true,
					wrap: true
				}
			}
		},
		// Reads html files for special <!-- build:js --> blocks which contain build configurations, and configures requirejs/concat/uglify tasks automatically.
		useminPrepare: {
			html: 'web/app/index.html',
			options: {
				// Specify destination for requirejs.
				dest: 'dist/app'
			}
		},
		// Replaces references to unoptimized files with references to optimized ones.
		usemin: {
			html: ['dist/app/{,*/}*.html'],
			options: {
				// Specify directories to search through.
				dirs: ['dist/app']
			}
		},
		// Minifiy HTML files.
		htmlmin: {
			dist: {
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
		},
		html2js: {
			app: {
				options: {
					base: 'web/app'
				},
				src: ['web/app/**/*.tpl.html'],
				dest: 'web/build/templates-app.js'
			}
		}
	});

	// Default task(s).
	// grunt.registerTask('default', ['jshint, build']);
	// grunt.registerTask('build', [
	// 	'clean:dist',
	// 	'useminPrepare',
	// 	'requirejs',
	// 	'htmlmin',
	// 	'concat',
	// 	'uglify',
	// 	'usemin'
	// ]);

	// Mocha tests
	grunt.registerTask('mocha', ['mocha_phantomjs']);
};