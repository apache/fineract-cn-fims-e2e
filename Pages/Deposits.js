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
var nameInput = $(".mat-input-infix input[formcontrolname='name']");
var descriptionInput = $(".mat-input-infix input[formcontrolname='description']");
var minimumBalanceInput = $("fims-number-input[controlname='minimumBalance'] input");
var currencySelect = $("md-select[formcontrolname='currencyCode']");
var radioGroupInterest = $("md-radio-group[formcontrolname='termInterestPayable']");
var radioMaturity = radioGroupInterest.$$("md-radio-button").get(0);
var radioAnnually = radioGroupInterest.$$("md-radio-button").get(1);
var radioQuarterly = radioGroupInterest.$$("md-radio-button").get(2);
var radioMonthly = radioGroupInterest.$$("md-radio-button").get(3);
var checkboxFlexibleInterest = $("md-checkbox[formcontrolname='flexible']")
var interestInput = $("fims-number-input[controlname='interest'] input");
var termPeriodInput = $(".mat-input-infix input[formcontrolname='termPeriod']");
var fixedTermEnabledToggle = $("md-slide-toggle[formcontrolname='fixedTermEnabled']");
var termTimeUnit = $("md-radio-group[formcontrolname='termTimeUnit']");
var radioMonth = termTimeUnit.$$("md-radio-button input").get(0);
var radioYear = termTimeUnit.$$("md-radio-button input").get(1);


var cashAccountInput = $("fims-account-select[formcontrolname='cashAccountIdentifier'] input");
var expenseAccountInput = $("fims-account-select[formcontrolname='expenseAccountIdentifier'] input");
var accrueAccountInput = $("fims-account-select[formcontrolname='accrueAccountIdentifier'] input");
var equityLedgerInput = $("fims-ledger-select[formcontrolname='equityLedgerIdentifier'] input");


module.exports = {
    goToDepositsViaSidePanel: function() {
        $("a[href='/deposits']").click();
    },
    verifyCardHasTitle: function(text) {
        browser.wait(EC.visibilityOf(titleRow), 5000);
        form_title = titleRow.getText();
        expect(form_title).toEqual(text);
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
        minimumBalanceInput.click().clear().sendKeys(text);
    },
    verifyRadioAnnuallyIsSelected: function(){
        expect(radioAnnually.getAttribute('class')).toMatch('mat-radio-checked');
    },
    verifyCheckboxFlexibleInterestNotChecked: function(){
       //expect(checkboxFlexibleInterest.getAttribute('class')).toNotMatch('mat-checkbox-checked');
        browser.wait(EC.not(EC.elementToBeSelected(checkboxFlexibleInterest)), 3000);
    },
    enterTextIntoInterestInputField: function(text) {
        interestInput.click().clear().sendKeys(text);
    },
    enterTextIntoTermPeriodInputField: function(text) {
        termPeriodInput.click().sendKeys(text);
    },
    verifyFixedTermToggleSetToOff: function(){
        toggleClass = fixedTermEnabledToggle.getAttribute('class');
        expect(toggleClass).not.toContain("mat-checked");
    },
    verifyFixedTermToggleSetToOn: function(){
        toggleClass = fixedTermEnabledToggle.getAttribute('class');
        expect(toggleClass).toContain("mat-checked");
    },
    toggleFixedTermToOn: function() {
        this.verifyFixedTermToggleSetToOff();
        $(".mat-slide-toggle-content").click();
        this.verifyFixedTermToggleSetToOn();
    },
    toggleFixedTermToOff: function() {
        this.verifyFixedTermToggleSetToOn();
        $(".mat-slide-toggle-content").click();
        this.verifyFixedTermToggleSetToOff();
    },
    verifyTermPeriodInputFieldIsDisabled: function(){
        expect(termPeriodInput.isEnabled()).toBe(false);
    },
    verifyTermPeriodInputFieldIsEnabled: function(){
        expect(termPeriodInput.isEnabled()).toBe(true);
    },
    verifyRadioButtonsMonthAndYearDisabled: function() {
        expect(radioMonth.isEnabled()).toBe(false);
        expect(radioYear.isEnabled()).toBe(false);
    },
    verifyRadioButtonsMonthAndYearEnabled: function() {
        expect(radioMonth.isEnabled()).toBe(true);
        expect(radioYear.isEnabled()).toBe(true);
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