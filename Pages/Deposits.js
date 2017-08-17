//Deposits.js

//Actions specific to the Deposit Account Management section

var EC = protractor.ExpectedConditions;
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var createDeposit = $("a[href='/deposits/create']");
var radioGroupType = $("md-radio-group[formcontrolname='type']")
var radioChecking = $$("md-radio-group md-radio-button").get(0);
var radioSavings = $$("md-radio-group md-radio-button").get(1);
var radioShare = $$("md-radio-group md-radio-button").get(2);
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $(".mat-input-infix input[controlname='name']");
var descriptionInput = $(".mat-input-infix input[controlname='description']");
var minimumBalanceInput = $("fims-number-input[controlname='minimumBalance'] input");
var currencySelect = $("md-select[formcontrolname='currencyCode']");
var interestInput = $("fims-number-input[controlname='interest'] input");
var termPeriodInput = $(".mat-input-infix input[formcontrolname='termPeriod']");
var fixedTermEnabledToggle = $("md-slide-toggle[formcontrolname='fixedTermEnabled']");
var termTimeUnit = $("md-radio-group[formcontrolname='fixedTermEnabled']");
var cashAccountInput = $("fims-account-select[formcontrolname='cashAccountIdentifier'] input");
var expenseAccountInput = $("fims-account-select[formcontrolname='expenseAccountIdentifier'] input");
var accrueAccountInput = $("fims-account-select[formcontrolname='accrueAccountIdentifier'] input");
var equityLedgerInput = $("fims-ledger-select[formcontrolname='equityLedgerIdentifier'] input");


module.exports = {
    goToDepositsViaSidePanel: function() {
        $("a[href='/deposits']").click();
    },
    verifyCardHasTitle: function() {
        form_title = titleRow.getText();
        expect(form_title).toEqual("Manage Deposit Products");
    },
    clickButtonCreateDepositAccount: function(){
        browser.wait(EC.visibilityOf(createDeposit), 5000);
        createDeposit.click();
    },
    verifyRadioCheckingIsSelected: function(element){
        expect(radioChecking.getAttribute('class')).toMatch('mat-radio-checked')
    },
    verifyRadioSavingsIsSelected: function(element){
        expect(radioSavings.getAttribute('class')).toMatch('mat-radio-checked')
    },
    verifyRadioShareIsSelected: function(element){
        expect(radioShare.getAttribute('class')).toMatch('mat-radio-checked')
    },
    selectRadioButtonSavings: function(){
        radioSavings.click();
    },
    selectRadioButtonShare: function(){
        radioShare.click();
    },
    selectRadioButtonChecking: function(){
        radioChecking.click();
    },
    enterTextIntoShortNameInputField: function(text) {
        browser.wait(EC.visibilityOf(shortNameInput), 5000);
        shortNameInput.click().sendKeys(text);
    },
    enterTextIntoNameInputField: function(text) {
        nameInput.click().sendKeys(text);
    },
    enterTextIntoDescriptionInputField: function(text) {
        descriptionInput.click().sendKeys(text);
    },
    enterTextIntoMinimumBalanceInputField: function(text) {
        minimumBalanceInput.click().sendKeys(text);
    },
    enterTextIntoInterestInputField: function(text) {
        interestInput.click().sendKeys(text);
    },
    enterTextIntoTermPeriodInputField: function(text) {
        termPeriodInput.click().sendKeys(text);
    },
    verifyFixedTermToggleSetToOff: function(){
        //
    },
    verifyTermPeriodInputFieldIsDisabled: function(){
        //
    },
    verifyRadioButtonsMonthAndYearDisabled: function(){
        //
    },
    enterTextIntoCashAccountInputField: function(text) {
        cashAccountInput.click().sendKeys(text);
    },
    enterTextIntoExpenseAccountInputField: function(text) {
        expenseAccountInput.click().sendKeys(text);
    },
    enterTextIntoAccrueAccountInputField: function(text) {
        accrueAccountInput.click().sendKeys(text);
    },
    enterTextIntoEquityLedgerInputField: function(text) {
        equityLedgerInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForProductDetails: function(){
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    }
};