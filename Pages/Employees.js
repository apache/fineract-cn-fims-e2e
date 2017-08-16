//Employees.js

//Actions specific to the Employees section

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


module.exports = {
    verifyCardHasTitleManageEmployees: function() {
        browser.wait(EC.visibilityOf($("fims-employee md-toolbar-row div")), 5000);
        expect($("fims-employee md-toolbar-row div").getText()).toEqual("Manage employees");
    },
    verifyCardHasTitleCreateEmployee: function() {
        form_title=$("fims-layout-card-over .mat-toolbar-row div").getText();
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
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    clickEnabledContinueButtonForAssignEmployeeToOffice: function(){
        browser.wait(EC.visibilityOf($$(".mat-raised-button").get(1)), 5000);
        expect($$(".mat-raised-button").get(1).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(1).click();
    },
    clickEnabledCreateEmployeeButton: function(){
        browser.wait(EC.visibilityOf($$(".mat-raised-button").get(2)), 5000);
        expect($$(".mat-raised-button").get(2).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(2).click();
    },
    clickButtonOrLinkCreateNewEmployee: function(){
        browser.wait(EC.visibilityOf(createEmployee), 5000);
        createEmployee.click();
    },
    selectRoleByIndex: function(i){
        roleSelection = $(".mat-select-trigger").click();
        element.all(by.css('.mat-option')).get(i).click();
    },
    selectRoleByName: function(name){
        roleSelection = $(".mat-select-trigger").click();
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
    },
    deleteEmployee: function() {
        browser.wait(EC.visibilityOf($("button[title='Delete this employee']")), 3000);
        $("button[title='Delete this employee']").click();
        browser.wait(EC.visibilityOf($(".mat-button.mat-accent")), 5000);
        $(".mat-button.mat-accent").click();
    }
};