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
		exec: {
			'web-build': {
				cmd: 'node web/build/server'
			},
			'web-test-unit': {
				// cmd: 'karma start karma-unit.conf.js'
				cmd: 'testem -f'
			}
		},
		copy: {
			'web-build': {
				files: [
					{
						src: ['**'],
						dest: 'web/build/public/',
						cwd: 'web/src/public',
						expand: true
					},
					{
						src: ['**'],
						dest: 'web/build/app/',
						cwd: 'web/src/app',
						expand: true
					}
				]
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
		karma: {
			unit: {
				configFile: 'karma-unit.conf.js'
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
			'web-build': {
				src: ['web/build/*']
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
			'web-build': {
				options: {
					base: 'web/app'
				},
				src: ['web/app/**/*.tpl.html'],
				dest: 'web/build/app/templates-app.js'
			}
		},
		'web-server': {
			all: {

			}
		},
		testem: {
			options: {
				launch_in_dev: [
					'chrome'
				]
			},
			unit: {
				src: [
					"testem.json"
				]
			}
		},
		watch: {
			scripts: {
				files: [
					'web/src/**/*.js'
				],
				tasks: [
					'build'
				]
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

	grunt.registerMultiTask('web-server', 'Process server/index.js template', function() {
		grunt.file.copy('web/src/server/index.js', 'web/build/server/index.js', {
			process: function(contents, path)  {
				return grunt.template.process(contents, {
					data: {
						static: {
							target: 'build'
						}
					}
				});
			}
		})
	});

	grunt.registerTask('build', [
		'clean:web-build',
		'copy:web-build',
		'html2js:web-build',
		'web-server',
		// 'exec:web-build'
	]);

	// grunt.registerTask('test-unit', [
	// 	'clean:web-build',
	// 	'copy:web-build',
	// 	'html2js:web-build',
	// 	// 'karma:unit'
	// 	'exec:web-test-unit'
	// ]);

	grunt.registerTask('test-unit', [
		'build',
		'exec:web-test-unit'
	]);

	grunt.registerTask('watch-web-build', [
		'build',
		'watch'
	]);

	// Mocha tests
	grunt.registerTask('mocha', ['mocha_phantomjs']);
};