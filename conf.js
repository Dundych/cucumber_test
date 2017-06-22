'use strict';

let dateFormat = require('dateformat');

let _async = require('asyncawait/async');
let _await = require('asyncawait/await');

let chai = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    expect = chai.expect;

chai.use(chaiAsPromised);

let { defineSupportCode } = require('cucumber');

exports.config = {

    //disable control flow
    SELENIUM_PROMISE_MANAGER: false,

    /**
   * If set, Protractor will ignore uncaught exceptions instead of exiting
   * without an error code. The exceptions will still be logged as warnings.
   */
    //ignoreUncaughtExceptions: true,

    //seleniumAddress: 'http://localhost:4444/wd/hub',
    directConnect: true,

    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                //'start-maximized',
                //'incognito',
                "--test-type",
                '--disable-extensions',
                '--enable-crash-reporter-for-testing',
                '--no-sandbox',
                '--disable-infobars',
                '--disable-gpu'
            ]
        },
        loggingPrefs: {
            browser: 'ALL'
        }
    },

    framework: 'custom', //We use the cucumber framework

    frameworkPath: require.resolve('protractor-cucumber-framework'),

    specs: [
        './features/*.feature'
    ],

    resultJsonOutputFile: './report/report.json',

    cucumberOpts: {
        tags: [
            "~@dev",
            //"@cur"
        ],
        strict: true,
        format: ['pretty', 'json:./report/results.json'],
        require: ['./step_definitions/*.steps.js']
    },

    baseUrl: 'http://computer-database.herokuapp.com/computers',

    onCleanUp: function () {

        //report1
        let reporter = require('cucumber-html-reporter');

        let options = {
            theme: 'bootstrap',
            jsonFile: 'report/results.json',
            output: 'report/cucumber_report.html',
            reportSuiteAsScenarios: true,
            launchReport: false,
            metadata: {
                "App Version": "0.3.2",
                "Test Environment": "STAGING",
                "Browser": "Chrome  54.0.2840.98",
                "Platform": "Windows 10",
                "Parallel": "Scenarios",
                "Executed": "Remote"
            }
        };

        reporter.generate(options);

        //report2
        let CucumberHtmlReport = require('cucumber-html-report');

        return CucumberHtmlReport.create({
            source: './report/results.json',
            dest: './report',
            title: 'OptiRoute - Protractor Test Run',
            component: new Date().toString()
        }).then(console.log).catch(console.log);
    },

    onPrepare: function () {

        // non Ang app
        browser.ignoreSynchronization = true;
        //browser.manage().timeouts().implicitlyWait(10 * 1000);

        // timeout for cucumber
        defineSupportCode(({ setDefaultTimeout }) => {
            setDefaultTimeout(15 * 1000);
        });

    }

};