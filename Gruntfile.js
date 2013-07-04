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

	var userConfig = require('./build.config.js');

	// Project configuration.
	var taskConfig = {
		app: appConfig,
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			'build': {
				cmd: 'node build/server'
			},
			'test-unit': {
				// cmd: 'karma start karma-unit.conf.js'
				cmd: 'testem -f'
			}
		},
		copy: {
			build_app: {
				files: [
					{
						src: ['<%= app_files.js %>'],
						dest: '<%= build_dir %>/app/',
						cwd: 'src/app/',
						expand: true
					}
				]
			},
			build_vendor: {
				files: [
					{
						src: ['<%= vendor_files.js %>'],
						dest: '<%= build_dir %>/public/',
						cwd: 'src/public', 
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
			'build': {
				src: ['build/*']
			}
		},
		// Minifiy HTML files.
		htmlmin: {
			dist: {
				files: [{
					expand: true,
					cwd: 'app',
					src: '*.html',
					dest: 'dist/app'
				}]
			}
		},
		bower: {
			all: {
				rjsConfig: './app/js/config.js'
			}
		},
		html2js: {
			app: {
				options: {
					base: 'src/app'
				},
				src: ['src/app/**/*.tpl.html'],
				dest: 'build/app/templates-app.js'
			}
		},
		server: {
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
					'src/**/*.js'
				],
				tasks: [
					'build'
				]
			}
		},
		index: {
			build: {
				// dir: '<%= build_dir %>',
				src: [
					// '<%= vendor_files.js %>',
					'<%= build_dir %>/public/js/components/unstable-angular-complete/angular.js',
					'<%= build_dir %>/public/js/**/*.js',
					'<%= html2js.app.dest %>',
					'<%= build_dir %>/app/**/*.js'
				]
			}
		}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	grunt.registerTask('build', [
		'clean:build',
		'copy:build_app',
		'copy:build_vendor',
		'html2js:app',
		'server',
		'index:build'
	]);

	grunt.registerTask('watch-build', [
		'build',
		'watch'
	]);

	// Mocha tests
	grunt.registerTask('mocha', ['mocha_phantomjs']);

	function filterForJS(files) {
		return files.filter(function(file) {
			return file.match(/\.js$/);
		});
	}

	grunt.registerMultiTask('index', 'Process index.html template', function() {
		console.log(this.filesSrc);
		var dirRE = new RegExp('^('+grunt.config('build_dir')+'\/public|build)\/', 'g');

		var jsFiles = filterForJS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '/');
		});

		console.log('jsFiles');

		console.log(jsFiles);

		grunt.file.copy('src/app/index.html', 'build/app/index.html', {
			process: function(contents, path) {
				return grunt.template.process(contents,
				{
					data: {
						scripts: jsFiles
					}
				})
			}
		});
	});

	grunt.registerMultiTask('server', 'Process server/index.js template', function() {
		console.log(this.filesSrc);
		grunt.file.copy('src/server/index.js', 'build/server/index.js', {
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
};