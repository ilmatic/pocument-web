module.exports = function(karma) {
    karma.configure({
        basePath: 'test',
        port: 9876,
        runnerPort: 9100,
        colors: true,
        logLevel: karma.LOG_INFO,
        autoWatch: true,
        frameworks: [''],
        preprocessors: ['html2js'],
        files: [
            'test-karma.js',
            'hello.html',
            'specs/client/welcomeSpec.js'
        ],
        reporters: ['progress'],
        browsers: ['Chrome'],
        plugins: ['karma-html2js-preprocessor']
    });
};