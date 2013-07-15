'use strict';

/**
 * Wrapper function -- do all grunt-related things here.
 */
module.exports = function(grunt) {
	/**
	 * Parse through dependencies, filter for those starting with 
	 * "grunt-", and loadNpmTasks for each.
	 */
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	/**
	 * Configuration object for holding paths.
	 * TODO: factor this out into separate module
	 */
	var appConfig = {
		app: 'app',
		dist: 'dist'
	};

	var userConfig = require('./build.config.js');

	/**
	 * Configuration object for grunt tasks.
	 */
	var taskConfig = {
		app: appConfig,
		pkg: grunt.file.readJSON('package.json'),
		exec: {
			'web-server': {
				cmd: 'node build/server'
			},
			'test-unit': {
				// cmd: 'karma start karma-unit.conf.js'
				cmd: 'testem -f'
			}
		},

		/**
		 * @name grunt-contrib-copy
		 * @desc Copy files from /src to /build.
		 */
		copy: {
			/**
			 * App files.
			 */
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
			/**
			 * Third-party libraries.
			 */
			build_vendor: {
				files: [
					{
						src: ['<%= vendor_files.js %>'],
						dest: '<%= build_dir %>/public/',
						cwd: 'src/public', 
						expand: true
					}
				]
			},
			/**
			 * Stylesheets.
			 */
			build_css: {
				files: [
					{
						src: ['<%= app_files.css %>'],
						dest: '<%= build_dir %>/public',
						cwd: 'src/public',
						expand: true
					}
				]
			}
		},

		/**
		 * @name grunt-contrib-jshint
		 * @desc Lint files during build process.
		 */
		jshint: {
			// Define the files to lint.
			all: ['gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
			
			// Configure JSHint (documented at http://www.jshint.com/docs/).
			options: {
				// Specify .jshintrc file for more options.
				jshintrc: '.jshintrc'
			}
		},

		/**
		 * @name grunt-contrib-clean
		 * @desc Clean directories before running a build.
		 */
		clean: {
			'build': {
				src: ['build/*']
			}
		},

		/**
		 * @name grunt-html2js
		 * @desc Write AngularJS templates directly to cache so they can
		 * be deployed with app script in one request.
		 */
		html2js: {
			app: {
				options: {
					base: 'src/app'
				},
				src: ['src/app/**/*.tpl.html'],
				dest: 'build/app/templates-app.js'
			}
		},

		/**
		 * @name grunt-contrib-watch
		 * @desc Watch for file changes and perform tasks when they occur.
		 */
		watch: {
			scripts: {
				files: [
					'src/**/*.js'
				],
				tasks: [
					'build'
				]
			},
			templates: {
				files: [
					'src/app/index.html',
					'src/**/*.tpl.html'
				],
				tasks: [
					'build'
				]
			},
			stylesheets: {
				files: [
					'src/public/scss/**/*.scss'
				],
				tasks: [
					'copy:build_css'
				]
			}
		},

		/**
		 * @name index [** CUSTOM **]
		 * @desc Automatically add JS and CSS tags into index.html.
		 */
		index: {
			build: {
				// dir: '<%= build_dir %>',
				src: [
					// '<%= vendor_files.js %>',
					'<%= build_dir %>/public/js/components/foundation/js/vendor/zepto.js',
					'<%= build_dir %>/public/js/components/foundation/js/vendor/jquery.js',
					'<%= build_dir %>/public/js/components/unstable-angular-complete/angular.js',
					'<%= build_dir %>/public/js/**/*.js',
					'<%= build_dir %>/public/css/**/*.css',
					'<%= html2js.app.dest %>',
					'<%= build_dir %>/app/**/*.js'
				]
			}
		},

		/**
		 * @name start [** CUSTOM **]
		 * @desc Start web development.
		 */
		start: {
			dev: {
				tasks: [
					'build',
					'exec:web-server'
				]
			}
		},

		/**
		 * @name grunt-plato
		 * @desc Analyze code for complexity, maintainability and quality.
		 */
		plato: {
			dev: {
				options: {
					jshint: grunt.file.readJSON('.jshintrc')
				},
				files: {
					'.plato': ['src/app/**/*.js']
				}
			}
		},

		/**
		 * @grunt-open
		 * @desc Automatically launch browser at specified location.
		 */
		open: {
			plato: {
				path: 'file://localhost/Users/altusllc/Git/pocument/pocument-web/.plato/index.html'
			}
		}
	};

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	/**
	 * @name build [** CUSTOM **]
	 * @desc Build app to /build from /src.
	 */

	grunt.registerTask('build', [
		'clean:build',
		'copy:build_app',
		'copy:build_vendor',
		'copy:build_css',
		'html2js:app',
		'server',
		'index:build'
	]);

	grunt.registerTask('start', [
		'build',
		'watch'
	]);

	grunt.registerTask('analyze', [
		'plato:dev',
		'open:plato'
	]);

	function filterForJS(files) {
		return files.filter(function(file) {
			return file.match(/\.js$/);
		});
	}

	function filterForCSS(files) {
		return files.filter(function(file) {
			return file.match(/\.css$/);
		});
	}

	grunt.registerMultiTask('index', 'Process index.html template', function() {
		console.log(this.filesSrc);
		var dirRE = new RegExp('^('+grunt.config('build_dir')+'\/public|build)\/', 'g');

		var jsFiles = filterForJS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '/');
		});

		var cssFiles = filterForCSS(this.filesSrc).map(function(file) {
			return file.replace(dirRE, '/');
		});

		console.log('jsFiles: %j, cssFiles: %j', jsFiles, cssFiles);

		grunt.file.copy('src/app/index.html', 'build/app/index.html', {
			process: function(contents, path) {
				return grunt.template.process(contents,
				{
					data: {
						scripts: jsFiles,
						stylesheets: cssFiles
					}
				});
			}
		});
	});

	grunt.registerTask('server', 'Process server/index.js template', function() {
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
		});
	});

	// grunt.registerMultiTask('start', 'Start up environment for web development', function() {
	// 	grunt.task.run(this.data.tasks);
	// });
};