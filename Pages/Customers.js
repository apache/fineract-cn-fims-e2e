//Customers.js

//Actions specific to the Customers section

var EC = protractor.ExpectedConditions;
var accountInput = $(".mat-input-infix input[placeholder='Account']");
var firstNameInput = $(".mat-input-infix input[formcontrolname='firstName']");
var middleNameInput = $(".mat-input-infix input[formcontrolname='middleName']");
var lastNameInput = $(".mat-input-infix input[formcontrolname='lastName']");
var birthDayInput = $(".mat-input-infix input[formcontrolname='dayOfBirth']");
var memberCheckbox = $(".mat-input-infix input[formcontrolname='member']");
var streetInput = $(".mat-input-infix input[formcontrolname='street']");
var cityInput = $(".mat-input-infix input[formcontrolname='city']");
var countrySelect = $(".mat-input-infix input[formcontrolname='country']");
var emailInput = $(".mat-input-infix input[formcontrolname='email']");
var phoneInput = $(".mat-input-infix input[formcontrolname='phone']");
var mobileInput = $(".mat-input-infix input[formcontrolname='mobile']");
var linkCustomers = $$("a[href='/customers']");
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var depositProductSelect = $("md-select[formcontrolname='productIdentifier']");
var beneficiaryInput = $("td-chips[formcontrolname='beneficiaries'] input");

module.exports = {
    verifyCardHasTitleManageCustomers: function() {
        browser.wait(EC.textToBePresentInElement(titleRow, 'Manage customers'), 5000);
    },
    verifyCardHasTitleCreateCustomer: function() {
        form_title=$("fims-layout-card-over .mat-toolbar-row div").getText();
        expect(form_title).toEqual("Create new customer");
    },
    enterTextIntoAccountInputField: function(text) {
        accountInput.click().sendKeys(text);
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
   enterTextIntoDayOfBirthInputField: function(){
        birthDayInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys("991978");

    },
    enterTextIntoStreetInputField: function(text) {
        browser.wait(EC.elementToBeClickable(streetInput),3000);
        streetInput.click().sendKeys(text);
    },
    enterTextIntoCityInputField: function(text) {
        cityInput.click().sendKeys(text);
    },
    enterTextIntoEmailInputField: function(text) {
        emailInput.click().sendKeys(text);
    },
    enterTextIntoPhoneInputField: function(text) {
        phoneInput.click().sendKeys(text);
    },
    enterTextIntoMobileInputField: function(text) {
        mobileInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForCustomerDetails: function(){
        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(0)), 5000);
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    clickEnabledContinueButtonForCustomerAddress: function(){
        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(1)), 5000);
        expect($$(".mat-raised-button").get(1).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(1).click();
    },
    clickEnabledContinueButtonForCustomerContact: function(){

        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(2)), 5000);
        expect($$(".mat-raised-button").get(2).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(2).click();
    },
    clickEnabledCreateCustomerButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $(".mat-raised-button.mat-primary").getWebElement());
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    clickButtonOrLinkCreateNewCustomer: function(){
        browser.wait(EC.visibilityOf($("a[href='/customers/create']")), 5000);
        $("a[href='/customers/create']").click();
    },
    selectCountryByIndex: function(i){
        countrySelect.click();
        element.all(by.css('.mat-option')).get(i).click();
    },
    selectCountryByName: function(name){
        countrySelect.click();
        element(by.cssContainingText('.mat-option',name)).click();
    },
    goToManageCustomersViaSidePanel: function() {
        browser.wait(EC.visibilityOf(linkCustomers.first()), 5000);
        linkCustomers.first().click();
    },
    clickViewCustomersFromQuickAccess: function() {
        browser.wait(EC.visibilityOf(linkCustomers.get(1)), 5000);
        linkCustomer.get(1).click();
    },
    verifyCustomerHasStatusInactive: function(){
        browser.wait(EC.visibilityOf($("td-message")), 2000);
        color = $("td-message").getAttribute("color");
        message = $("td-message .td-message-label").getText();
        expect(color).toEqual("warn");
        expect(message).toContain("Customer not active");
    },
    clickButtonGoToTasks: function(){
        browser.wait(EC.elementToBeClickable($("td-message button")), 2000);
        $("td-message button").click();
    },
    clickButtonActivate: function(){
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-accent")), 2000);
        $(".mat-raised-button.mat-accent").click();
    },
    verifyCustomerHasStatusActive: function(){
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual("ACTIVE");
    },
    clickManageDepositAccountsForCustomer: function(customer){
        link = "/customers/details/" + customer + "/deposits";
        browser.wait(EC.elementToBeClickable($("a[href=link]")));
        $("a[href=link]").click();
    },
    clickCreateDepositAccountForCustomer: function(customer){
        link = "/customers/details/" + customer + "/deposits/create";
        browser.wait(EC.elementToBeClickable($("a[href=link]")));
        $("a[href=link]").click();
    },
    selectDepositProduct: function(depositProductName){
        depositProductSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', text)).click();
    },
    clickEnabledButtonCreateDepositAccount: function(){
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    }
};