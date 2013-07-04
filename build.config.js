/*
 * This file/module contains all configuration for the build process.
*/
module.exports = {
	// The 'web_build_dir' folder is where our web project is compiled during development,
	// and the 'web_distro_dir' folder is where our web app resides once it's 
	// been completely built.
	build_dir: 'web/build',
	distro_dir: 'web/dist',

	app_files: {
		js: ['web/src/app/**/*.js', '!src/**/*.spec.js'],

		atpl: ['web/src/app/**/*.tpl.html'],

		html: ['web/src/app/index.html']
	},

	vendor_files: {
		js: [
			'web/src/public/js/components/unstable-angular-complete/angular.js',
			'web/src/public/js/components/unstable-angular-complete/angular-resource.js',
			'web/src/public/js/components/unstable-angular-complete/angular-cookies.js'
		]
	}
} 