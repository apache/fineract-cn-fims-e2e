//Offices.js

var officeIdentifierInput = $(".mat-input-infix input[placeholder='Identifier']");
var officeNameInput = $(".mat-input-infix input[formcontrolname='name']");
var officeDescriptionInput = $(".mat-input-infix input[formcontrolname='description']");
var streetInput = $(".mat-input-infix input[formcontrolname='street']");
var numberInput = $(".mat-input-infix input[placeholder='Number']");
var passwordInput = $(".mat-input-infix input[formcontrolname='password']");
var withdrawalLimitInput = $(".mat-input-infix input[formcontrolname='cashdrawLimit']");
var tellerAccountInput = $(".mat-input-infix input[placeholder='Teller account(Asset accounts only)']");
var vaultAccountInput = $(".mat-input-infix input[placeholder='Vault account(Asset accounts only)']");

//Actions specific to the Offices section, including Teller management

var EC = protractor.ExpectedConditions;

module.exports = {
    goToManageOfficesViaSidePanel: function() {
        $$("a[href='/offices']").first().click();
    },
    clickViewOfficesFromQuickAccess: function() {
        browser.wait(EC.visibilityOf($$("a[href='/offices']").get(1)), 5000);
        $$("a[href='/offices']").get(1).click();
    },
    verifyCardHasTitleCreateOffice: function () {
        form_title = $("fims-layout-card-over .mat-toolbar-row div").getText();
        expect(form_title).toEqual("Create new office");
    },
    clickButtonCreateNewOffice: function(){
        browser.wait(EC.visibilityOf($("a[title='Create branch office']")), 5000);
        $("a[title='Create branch office']").click();
    },

    goToManageTellersForOfficeByIdentifier: function(identifier){
        link = '/offices/detail/' + identifier + '/tellers';
        browser.wait(EC.visibilityOf($('a[href="' + link +'"]')), 5000);
        $('a[href="' + link +'"]').click();
    },
    enterTextIntoOfficeIdentifierInputField: function(text) {
        officeIdentifierInput.click().sendKeys(text);
    },
    enterTextIntoOfficeNameInputField: function(text) {
        officeNameInput.click().sendKeys(text);
    },
    enterTextIntoOfficeDescriptionInputField: function(text){
        officeDescriptionInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForOfficeDetails: function(){
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    clickEnabledCreateOfficeButton: function(){
        browser.wait(EC.visibilityOf($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    clickCreateTellerForOfficeByIdentifier: function(identifier){
        link = '/offices/detail/' + identifier + '/tellers/create';
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    enterTextIntoTellerNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(numberInput), 5000);
        numberInput.click().sendKeys(text);
    },
    enterTextIntoPasswordInputField: function(text) {
        passwordInput.click().sendKeys(text);
    },
    enterTextIntoCashWithdrawalLimitInputField: function(text) {
        withdrawalLimitInput.click().sendKeys(text);
    },
    enterTextIntoTellerAccountInputField: function(text) {
        tellerAccountInput.click().sendKeys(text);
    },
    enterTextIntoVaultAccountInputField: function(text) {
        vaultAccountInput.click().sendKeys(text);
    },
    clickEnabledCreateTellerButton: function(){
        browser.wait(EC.visibilityOf($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },





}
