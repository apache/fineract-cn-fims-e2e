//Loans.js

//Actions specific to the Loan Products section

var EC = protractor.ExpectedConditions;
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var createLoan = $("a[href='/loans/create']");
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $(".mat-input-infix input[formcontrolname='name']");
var descriptionInput = $(".mat-input-infix input[formcontrolname='description']");
var minimumPrincipalAmoung = $(".mat-input-infix[placeholder='Minimum principal amount']");
var maximumPrincipalAmoung = $(".mat-input-infix[placeholder='Maximum principal amount']");
var currencySelect = $("md-select[formcontrolname='currencyCode']");
var termInput = $(".mat-input-infix input[formcontrolname='term']");
var radioWeeks = $$("md-radio-group .mat-radio-button").first();
var radioMonths =  $$("md-radio-group .mat-radio-button").get(1);
var radioYears =  $$("md-radio-group .mat-radio-button").get(2);

var cashFundAccountInput = $("fims-account-select[formcontrolname='loanFundAccount'] input");
var customerLoanLedgerInput = $("fims-ledger-select[formcontrolname='customerLoanLedger'] input");

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
    enterTextIntoshortNameInputField: function(text) {
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
        minimumPrincipalInput.click().sendKeys(text);
    },
    enterTextIntoMaximumPrincipalInputField: function(text) {
        maximumPrincipalInput.click().sendKeys(text);
    },
    enterTextIntoTermInputField: function(text) {
        termInput.click().sendKeys(text);
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