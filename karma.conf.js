// Karma configuration
// Generated on Thu Jun 13 2013 22:06:46 GMT-0700 (PDT)


// base path, that will be used to resolve files and exclude
basePath = 'test/';

// plugins = [
//     'karma-html2js-preprocessor'
// ];

// // Preprocessors
// preprocessors = {
//   '**/*.html': 'html2js'
// };

// list of files / patterns to load in the browser
files = [
    REQUIRE,
    REQUIRE_ADAPTER,
    MOCHA,
    MOCHA_ADAPTER,
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    // 'index.html'
    'test-karma.js',
    'hello.html',
    'specs/client/welcomeSpec.js',
    // 'specs/apple.js',
    {pattern: '../web/app/js/components/**/*.js', included: false},
    // {pattern: '../web/app/js/**/*.js', included: false},
    //{pattern: 'specs/**/*.js', included: false},
    // {pattern: 'js/*.js', included: false}
];

// list of files to exclude
exclude = [
  '../web/app/js/main.js'
];


// test results reporter to use
// possible values: 'dots', 'progress', 'junit'
reporters = ['progress'];


// web server port
port = 9876;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari (only Mac)
// - PhantomJS
// - IE (only Windows)
browsers = ['Chrome'];


// If browser does not capture in given timeout [ms], kill it
captureTimeout = 60000;


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;