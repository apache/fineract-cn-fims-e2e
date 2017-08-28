//Loans.js

//Actions specific to the Loan Products section

var EC = protractor.ExpectedConditions;
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var createLoan = $("a[href='/loans/create']");
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $(".mat-input-infix input[formcontrolname='name']");
var descriptionInput = $(".mat-input-infix input[formcontrolname='description']");
var minimumPrincipalInput = $("fims-min-max[mincontrolname='minimumBalance']");
var maximumPrincipalInput = $("fims-min-max[maxcontrolname='maximumBalance']");
var currencySelect = $("md-select[formcontrolname='currencyCode']");
var termInput = $(".mat-input-infix input[formcontrolname='term']");
var radioWeeks = $$("md-radio-group .mat-radio-button").first();
var radioMonths =  $$("md-radio-group .mat-radio-button").get(1);
var radioYears =  $$("md-radio-group .mat-radio-button").get(2);

var cashAccountInput = $("fims-account-select[formcontrolname='loanFundAccount'] input");
var loanInProcessLedgerInput = $("fims-ledger-select[formcontrolname='loansPayableLedger'] input");
var customerLoanLedgerInput = $("fims-ledger-select[formcontrolname='customerLoanLedger'] input");
var pendingDisbursalAccountInput = $("fims-account-select[formcontrolname='pendingDisbursal'] input");

var interestMinimumInput = $("fims-number-input[formcontrolname='minimum'] input");
var incomeAccountInput = $("fims-account-select[formcontrolname='incomeAccount'] input");
var accrualAccountInput = $("fims-account-select[formcontrolname='accrualAccount'] input");


module.exports = {
    goToLoanProductsViaSidePanel: function() {
        $("a[href='/loans']").click();
    },
    verifyCardHasTitle: function() {
        form_title = titleRow.getText();
        expect(form_title).toEqual("Manage loan products");
    },
    clickButtonCreateLoanProduct: function(){
        browser.wait(EC.visibilityOf(createLoan), 5000);
        createLoan.click();
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
    enterTextIntoMinimumPrincipalInputField: function(text) {
        minimumPrincipalInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        minimumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        minimumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        minimumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        minimumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        minimumPrincipalInput.sendKeys(text);
    },
    enterTextIntoMaximumPrincipalInputField: function(text) {
        maximumPrincipalInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        maximumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        maximumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        maximumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        maximumPrincipalInput.sendKeys(protractor.Key.ARROW_LEFT);
        maximumPrincipalInput.sendKeys(text);
    },
    enterTextIntoTermInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", termInput.getWebElement());
        termInput.click().sendKeys(text);
    },
    enterTextIntoCashAccountInputField: function(text) {
        browser.wait(EC.visibilityOf(shortNameInput), 5000);
        browser.executeScript("arguments[0].scrollIntoView();", cashAccountInput.getWebElement());
        cashAccountInput.click().sendKeys(text);
    },
    enterTextIntoLoanInProcessLedgerInputField: function(text) {
        loanInProcessLedgerInput.click().sendKeys(text);
    },
    enterTextIntoCustomerLoanLedgerInputField: function(text) {
       customerLoanLedgerInput.click().sendKeys(text);
    },
    enterTextIntoPendingDisbursalAccountInputField: function(text) {
        pendingDisbursalAccountInput.click().sendKeys(text);
    },
    enterTextIntoInterestMinimumInputField: function(text) {
        browser.wait(EC.visibilityOf(interestMinimumInput), 5000);
        interestMinimumInput.click().clear().sendKeys(text);
    },
    enterTextIntoIncomeAccountAccountInputField: function(text) {
        incomeAccountInput.click().sendKeys(text);
    },
    enterTextIntoAccrualAccountInputField: function(text) {
        accrualAccountInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForProductDetails: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(0).getWebElement());
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    clickEnabledContinueButtonForLedgerAndAccountSettings: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(1).getWebElement());
        expect($$(".mat-raised-button").get(1).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(1).click();
    },
    clickEnabledContinueButtonForInterestSettings: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(2).getWebElement());
        expect($$(".mat-raised-button").get(2).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(2).click();
    }
};