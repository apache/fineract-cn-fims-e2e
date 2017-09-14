// conf.js

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

  framework: 'jasmine',
  specs: [
      'Specs/cheque_management_from_scratch.js'
  ],
    directConnect: true,
    allScriptsTimeout: 25000,
    capabilities: {
        browserName: 'chrome',
        chromeOptions: {
            args: [
                '--start-maximized'
            ]
        }
    },
    onPrepare: function() {

        jasmine.getEnv().addReporter(
            new Jasmine2HtmlReporter({
                savePath: './target/screenshots',
                takeScreenshots: true,
                takeScreenshotsOnlyOnFailures: true
            })
        );
        browser.ignoreSynchronization = true;
        //browser.driver.get('https://pilot.kuelap.io/index.html');
        browser.driver.get('http://localhost:4200');

        browser.driver.findElement(by.css(".mat-input-element[formcontrolname='tenant']")).sendKeys('playground');
        browser.driver.findElement(by.css(".mat-input-element[formcontrolname='username']")).sendKeys('operator');
        browser.driver.findElement(by.css(".mat-input-element[formcontrolname='password']")).sendKeys('init1@l');
        browser.driver.findElement(by.css('.mat-raised-button.mat-primary')).click();

        // Login takes some time, so wait until it's done.
        // For the test app's login, we know it's done when it redirects to
        // index.html.
        return browser.driver.wait(function() {
            return browser.driver.getCurrentUrl().then(function(url) {
                return /quickAccess/.test(url);
            });
        }, 10000);
    },
    useAllAngular2AppRoots: true

};
