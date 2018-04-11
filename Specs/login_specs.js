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
//login_specs.js

var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');

describe('Login suite', function() {
    var EC = protractor.ExpectedConditions;
    tenant = 'playground';
    username = 'operator';
    employeeIdentifier = helper.getRandomString(6);

    afterAll(function() {
        //delete employee created by the test again
        browser.get("http://pilot.kuelap.io/index.html");
        browser.waitForAngularEnabled(false);
        Common.waitForThePageToFinishLoading();
        $(".mat-toolbar-row .mat-icon-button").click();
        //Login.logInWithTenantUserAndPassword(tenant, username, "init1@l");
        Employees.clickViewEmployeesFromQuickAccess();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(employeeIdentifier);
        Common.verifyFirstRowOfSearchResultHasTextAsId(employeeIdentifier);
        Common.clickLinkShowForFirstRowInTable();
        Employees.deleteEmployee();
    });

    it(' should be on the page Quick Access ', function() {
        browser.waitForAngularEnabled(false);
        Common.waitForThePageToFinishLoading();
        //verify browser title
        expect(browser.getTitle()).toEqual('Quick Access');
        //verify some other elements are present
    });
    it('should be logged in as user "operator"', function() {
        //verify logged in as user
        Login.clickButtonToOpenUserAccountMenu();
        Login.verifyUserIsLoggedIn(username);
        Login.closeOpenUserAccountMenu();
    });

    it('should be able to create a new employee', function() {
        //switch to the Employees tab
        Employees.goToManageEmployeesViaSidePanel();
        Employees.verifyCardHasTitleManageEmployees();
        //verify browser title changes to Manage Employees
        expect(browser.getTitle()).toEqual('Manage Employees');
        //create a new employee
        Employees.clickButtonOrLinkCreateNewEmployee();
        //verify form title is Create new employee
        Employees.verifyCardHasTitleCreateEmployee();
        //verify browser title changes to Create Employee
        expect(browser.getTitle()).toEqual('Create Employee');
        //enter only valid and required input
        Employees.enterTextIntoUsernameInputField(employeeIdentifier);
        Employees.enterTextIntoLastNameInputField("Angela");
        Employees.enterTextIntoFirstNameInputField("Carter");
        //selects role by index, should be by name
        Employees.selectRoleByName("Admin");
        Employees.enterTextIntoPasswordInputField("abc123!!");
        Employees.clickEnabledContinueButtonForEmployeeDetails();
        Employees.clickEnabledContinueButtonForAssignEmployeeToOffice();
        Employees.clickEnabledCreateEmployeeButton();
        Employees.verifyCardHasTitleManageEmployees();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(employeeIdentifier);
        Common.verifyFirstRowOfSearchResultHasTextAsId(employeeIdentifier);
    });
    it('should be able to log out and be brought back to the log-in page', function() {
        Login.clickButtonToOpenUserAccountMenu();
        Login.clickMenuItemSignOut();
        //user should be back on the log in page
        Login.enterTextInInputFieldForTenant(tenant);
    });
    it('should not be able to log in on entering the wrong tenant, username or password', function() {
        //wrong password
        Login.enterTextInInputFieldForUsername(employeeIdentifier);
        Login.enterTextInInputFieldForPassword("abc123!");
        Login.clickEnabledSignInOrChangePasswordButton();
        Login.verifyMessageForUnsuccessfulLoginIsDisplayed();
        //wrong username
        Login.enterTextInInputFieldForUsername(employeeIdentifier + "1");
        Login.enterTextInInputFieldForPassword("!");
        Login.clickEnabledSignInOrChangePasswordButton();
        Login.verifyMessageForUnsuccessfulLoginIsDisplayed();
        //wrong tenant
        Login.enterTextInInputFieldForTenant("client12345");
        Login.clearInputFieldForUsername();
        Login.enterTextInInputFieldForUsername(employeeIdentifier);
        Login.clickEnabledSignInOrChangePasswordButton();
        Login.verifyMessageForUnsuccessfulLoginIsDisplayed();
        Login.clearInputFieldForTenant();
    });
    it('should be able to log in as the new employee and initially set a new password', function() {
        Login.enterTextInInputFieldForTenant(tenant);
        Login.clickEnabledSignInOrChangePasswordButton();
        Login.verifyUserIsOnChangePasswordPage();
        Login.enterTextInInputFieldForNewPassword("xyz456?");
        Login.enterTextInInputFieldForConfirmNewPassword("xyz456?");
        Login.clickEnabledSignInOrChangePasswordButton();
        // sign in with password just created
        Login.enterTextInInputFieldForTenant(tenant);
        Login.enterTextInInputFieldForUsername(employeeIdentifier);
        Login.enterTextInInputFieldForPassword("xyz456?");
        Login.clickEnabledSignInOrChangePasswordButton();
        Login.clickButtonToOpenUserAccountMenu();
        Login.verifyUserIsLoggedIn(employeeIdentifier);
        Login.clickMenuItemSettings();
        Login.verifyUserIsOnChangePasswordPage();

    });
    it('should not be able to change password if input in new password and confirm new password fields does not match', function(){
        //new password and confirm password not matching
        Login.enterTextInInputFieldForNewPassword("abc123?!");
        Login.enterTextInInputFieldForConfirmNewPassword("abc123!?");
        Login.verifyMessageThatPasswordsMustMatchIsDisplayed();
        Login.verifySignInOrChangePasswordButtonIsDisabled();
    });
    it('should not be able to change password if password requirements are not met', function(){
        //new password not according to requirements (too short)
        Login.clearInputFieldForNewPassword();
        Login.enterTextInInputFieldForNewPassword("abc");
        Login.clearInputFieldForConfirmNewPassword();
        Login.enterTextInInputFieldForConfirmNewPassword("abc");
        //verify message that password has to have at least 8 chars is displayed
        Login.verifySignInOrChangePasswordButtonIsDisabled();
    });
    it('button Change Password should be disabled if required input missing and input field should be marked as required', function() {
        Login.enterTextInInputFieldForNewPassword("123!!");
        Login.enterTextInInputFieldForConfirmNewPassword("123!!");
        Login.verifySignInOrChangePasswordButtonIsEnabled();
        Login.clearInputFieldForNewPassword();
        Login.enterTextInInputFieldForNewPassword("");
        Login.verifySignInOrChangePasswordButtonIsDisabled();
        Login.verifyNewPasswordInputFieldMarkedAsRequired();
    });
    it('should be able to change password if all input is correct', function() {

    });


});

