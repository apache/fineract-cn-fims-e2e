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
//Login.js

var Common = require('./Common.js');

//actions specific to logging in, logging out, changing password

var EC = protractor.ExpectedConditions;
var inputTenant = $(".mat-input-element[formcontrolname='tenant']");
var inputUsername = $(".mat-input-element[formcontrolname='username']");
var inputPassword = $(".mat-input-element[formcontrolname='password']");
var inputNewPassword = $(".mat-input-element[formcontrolname='newPassword']");
var inputConfirmNewPassword = $(".mat-input-element[formcontrolname='confirmNewPassword']");
var userAccountButton =$$("mat-toolbar-row .mat-icon-button").get(1);
var buttonSignOut = $$(".mat-menu-panel .mat-menu-item").get(2);

module.exports = {

    enterTextInInputFieldForTenant: function(text){
        browser.wait(EC.visibilityOf(inputTenant), 5000);
        inputTenant.click().sendKeys(text);
    },
    enterTextInInputFieldForUsername: function(text){
        browser.wait(EC.visibilityOf(inputUsername), 5000);
        inputUsername.click().sendKeys(text);
    },
    enterTextInInputFieldForPassword: function(text) {
        browser.wait(EC.visibilityOf(inputPassword), 5000);
        inputPassword.click().sendKeys(text);
    },
    clickEnabledSignInOrChangePasswordButton: function(){
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
        browser.wait(EC.not(EC.presenceOf($('.td-loading'))), 10000);
    },
    verifyMessageForUnsuccessfulLoginIsDisplayed: function(){
        browser.wait(EC.visibilityOf($("div p.mat-caption")), 2000);
        message = $("div p.mat-caption").getText();
        expect(message).toEqual("Sorry, that login did not work.");
    },
    clearInputFieldForUsername: function(){
        inputUsername.clear();
    },
    clearInputFieldForTenant: function(){
        inputTenant.clear();
    },
    clearInputFieldForPassword: function(){
        inputPassword.clear();
    },
    verifyUserIsOnChangePasswordPage: function(){
        browser.wait(EC.visibilityOf($(".mat-card .mat-card-title")));
        expect($(".mat-card .mat-card-title").getText()).toEqual("Change password");
    },
    enterTextInInputFieldForNewPassword: function(text){
        browser.wait(EC.visibilityOf(inputNewPassword), 5000);
        inputNewPassword.click().sendKeys(text);
    },
    enterTextInInputFieldForConfirmNewPassword: function(text){
        inputConfirmNewPassword.click().sendKeys(text);
    },
    verifyMessageThatPasswordsMustMatchIsDisplayed: function(){
        browser.wait(EC.visibilityOf($(".tc-red-700")), 2000);
        message = $(".tc-red-700").getText();
        expect(message).toEqual("Passwords must match.");
    },
    clearInputFieldForNewPassword: function(){
        inputNewPassword.clear();
    },
    clearInputFieldForConfirmNewPassword: function(){
        inputConfirmNewPassword.clear();
    },
    verifySignInOrChangePasswordButtonIsDisabled: function(){
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeFalsy();
    },
    verifySignInOrChangePasswordButtonIsEnabled: function(){
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
    },
    clickButtonToOpenUserAccountMenu: function() {
        userAccountButton.click();
        browser.wait(EC.visibilityOf($$(".mat-menu-item span").first()), 5000);
    },
    verifyUserIsLoggedIn: function(text) {
        loggedInUser=$$(".mat-menu-item span").first().getText();
        expect(loggedInUser).toEqual(text);
    },
    closeOpenUserAccountMenu: function(){
        $$(".mat-menu-item span").first().click();
    },
    clickMenuItemSignOut: function() {
        browser.wait(EC.visibilityOf(buttonSignOut, 2000));
        buttonSignOut.click();
    },
    clickMenuItemSettings: function() {
        browser.wait(EC.visibilityOf($$(".mat-menu-panel .mat-menu-item").get(1), 2000));
        $$(".mat-menu-panel .mat-menu-item").get(1).click();
    },
    verifyNewPasswordInputFieldMarkedAsRequired: function(){
        expect(inputNewPassword.getAttribute('aria-invalid')).toEqual('true');
        expect($(".mat-input-error").getText()).toEqual("Required");
    },
    logInWithTenantUserAndPassword: function(tenant, user, password){
        this.enterTextInInputFieldForTenant(tenant);
        this.enterTextInInputFieldForUsername(user);
        this.enterTextInInputFieldForPassword(password);
        this.clickEnabledSignInOrChangePasswordButton();
        Common.waitForThePageToFinishLoading();
    },
    logInForFirstTimeWithTenantUserAndPassword: function(tenant, user, initialPassword, newPassword){
        this.enterTextInInputFieldForTenant(tenant);
        this.enterTextInInputFieldForUsername(user);
        this.enterTextInInputFieldForPassword(initialPassword);
        this.clickEnabledSignInOrChangePasswordButton();
        this.enterTextInInputFieldForNewPassword(newPassword);
        this.enterTextInInputFieldForConfirmNewPassword(newPassword);
        this.clickEnabledSignInOrChangePasswordButton();
        this.enterTextInInputFieldForTenant(tenant);
        this.enterTextInInputFieldForUsername(user);
        this.enterTextInInputFieldForPassword(newPassword);
        this.clickEnabledSignInOrChangePasswordButton();
        Common.waitForThePageToFinishLoading();
    },
    signOut: function(){
        this.clickButtonToOpenUserAccountMenu();
        this.clickMenuItemSignOut();
    }
};