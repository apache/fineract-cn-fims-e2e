//Employees.js

//Actions specific to the Employees section
var Common = require('./Common.js');

var EC = protractor.ExpectedConditions;
var usernameInput = $(".mat-input-infix input[placeholder='Username']");
var firstNameInput = $(".mat-input-infix input[formcontrolname='firstName']");
var lastNameInput = $(".mat-input-infix input[formcontrolname='lastName']");
var passwordInput = $(".mat-input-infix input[formcontrolname='password']");
var middleNameInput = $(".mat-input-infix input[formcontrolname='middleName']");
var emailInput = $(".mat-input-infix input[formcontrolname='email']");
var phoneInput = $(".mat-input-infix input[formcontrolname='phone']");
var mobileInput = $(".mat-input-infix input[formcontrolname='mobile']");
var createEmployee = $("a[href='/employees/create']");
var primaryButton = $$(".mat-raised-button.mat-primary");

module.exports = {
    verifyCardHasTitleManageEmployees: function() {
        browser.wait(EC.visibilityOf($("fims-employee md-toolbar-row span")), 5000);
        expect($("fims-employee md-toolbar-row div").getText()).toEqual("Manage employees");
    },
    verifyCardHasTitleCreateEmployee: function() {
        form_title=$("fims-layout-card-over .mat-toolbar-row span").getText();
        expect(form_title).toEqual("Create new employee");
    },
    enterTextIntoUsernameInputField: function(text) {
        browser.wait(EC.visibilityOf(usernameInput), 5000);
        usernameInput.click().sendKeys(text);
    },
    enterTextIntoFirstNameInputField: function(text) {
        firstNameInput.click().sendKeys(text);
    },
    enterTextIntoMiddleNameInputField: function(text){
        middleNameInput.click().sendKeys(text);
    },
    enterTextIntoLastNameInputField: function(text) {
        lastNameInput.click().sendKeys(text);
    },
    enterTextIntoPasswordInputField: function(text) {
        passwordInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForEmployeeDetails: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(0).getWebElement());
        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(0)),2000);
        $$(".mat-raised-button").get(0).click();
    },
    clickEnabledContinueButtonForAssignEmployeeToOffice: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(1).getWebElement());
        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(1)),2000);
        $$(".mat-raised-button").get(1).click();
    },
    clickEnabledCreateEmployeeButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$("td-step-body").last().getWebElement());
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE EMPLOYEE";
            });
        }).click();
    },
    clickButtonOrLinkCreateNewEmployee: function(){
        browser.wait(EC.visibilityOf(createEmployee), 5000);
        createEmployee.click();
    },
    selectRoleByName: function(name){
        roleSelection = $(".mat-select-trigger");
        browser.wait(EC.elementToBeClickable(roleSelection), 2000);
        roleSelection.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option',name)).click();
    },
    goToManageEmployeesViaSidePanel: function() {
        browser.wait(EC.elementToBeClickable($$("a[href='/employees']").first()), 5000);
        $$("a[href='/employees']").first().click();
    },
    clickViewEmployeesFromQuickAccess: function() {
        browser.wait(EC.visibilityOf($$("a[href='/employees']").get(1)), 5000);
        $$("a[href='/employees']").get(1).click();
    },
    createEmployee: function(username, firstName, lastName, role, password){
        this.clickButtonOrLinkCreateNewEmployee();
        this.enterTextIntoUsernameInputField(username);
        this.enterTextIntoFirstNameInputField(firstName);
        this.enterTextIntoLastNameInputField(lastName);
        this.selectRoleByName(role);
        this.enterTextIntoPasswordInputField(password);
        this.clickEnabledContinueButtonForEmployeeDetails();
        this.clickEnabledContinueButtonForAssignEmployeeToOffice();
        this.clickEnabledCreateEmployeeButton();
        Common.verifyMessagePopupIsDisplayed("Employee is going to be saved");
    },
    deleteEmployee: function() {
        browser.wait(EC.visibilityOf($("button[title='Delete this employee']")), 3000);
        $("button[title='Delete this employee']").click();
        browser.wait(EC.visibilityOf($(".mat-button.mat-accent")), 5000);
        $(".mat-button.mat-accent").click();
    }
};