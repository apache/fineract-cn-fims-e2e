/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
// conf.js

var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {

  framework: 'jasmine',
  specs: [
      'Specs/loans1_creation&assignment.js'
  ],
    directConnect: true,
    allScriptsTimeout: 45000,
    jasmineNodeOpts: {defaultTimeoutInterval: 500000},
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
        //browser.driver.get(' https://sandbox.kuelap.io/index.html');

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
