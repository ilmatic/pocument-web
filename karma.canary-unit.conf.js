// Karma configuration
// Generated on Thu Jun 13 2013 22:06:46 GMT-0700 (PDT)
module.exports = function(config) {
	config.set({
		basePath: './',

		frameworks: [
			'mocha'
		],

		files: [
			'web/build/public/js/components/unstable-angular-complete/angular.min.js',
		    'web/build/public/js/components/unstable-angular-complete/angular-mocks.js',
		    'test/public/js/lib/chai.js',
		    'web/build/app/**/*.js'
		],

		browsers: ['Chrome'],

		reporters: ['progress'],

		port: 9876,
		runnerPort: 9100,
		colors: true,
		autoWatch: true,
		captureTimeout: 60000,
		singleRun: false
	});
};