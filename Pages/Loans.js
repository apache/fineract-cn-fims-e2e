//Loans.js

//Actions specific to the Loan Products section

var EC = protractor.ExpectedConditions;
var createLoan = $("a[href='/loans/create']");
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $("fims-text-input[controlname='name'] input");
var descriptionInput = $(".mat-input-infix textarea[formcontrolname='description']");
var minimumPrincipalInput = $("fims-min-max input[placeholder='Minimum principal amount']");
var maximumPrincipalInput = $("fims-min-max input[placeholder='Maximum principal amount']");
var currencySelect = $("mat-select[formcontrolname='currencyCode']");
var termInput = $("fims-text-input[controlname='term'] input");
var radioWeeks = $$("mat-radio-group .mat-radio-button").first();
var radioMonths =  $$("mat-radio-group .mat-radio-button").get(1);
var radioYears =  $$("mat-radio-group[formcontrolname='temporalUnit'] .mat-radio-button").get(2);

var cashAccountInput = $("fims-account-select[formcontrolname='loanFundAccount'] input");
var loanInProcessLedgerInput = $("fims-ledger-select[formcontrolname='loansPayableLedger'] input");
var customerLoanLedgerInput = $("fims-ledger-select[formcontrolname='customerLoanLedger'] input");
var pendingDisbursalAccountInput = $("fims-account-select[formcontrolname='pendingDisbursal'] input");

var interestRateInput = $("fims-number-input[controlname='minimum'] input");
var interestRangeMinimumInput = $("input[placeholder='Minimum interest rate']");
var interestRangeMaximumInput = $("input[placeholder='Maximum interest rate']");
var interestRangeToggle = $("mat-slide-toggle[formcontrolname='interestRangeEnabled']");
var incomeAccountInput = $("fims-account-select[formcontrolname='incomeAccount'] input");
var accrualAccountInput = $("fims-account-select[formcontrolname='accrualAccount'] input");

var processingFeeIncomeAccountInput = $("fims-account-select[formcontrolname='processingFeeAccount'] input");
var originationFeeIncomeAccountInput = $("fims-account-select[formcontrolname='originationFeeAccount'] input");
var disbursementFeeIncomeAccountInput = $("fims-account-select[formcontrolname='disbursementFeeAccount'] input");
var lateFeeIncomeAccountInput = $("fims-account-select[formcontrolname='lateFeeIncomeAccount'] input");
var lateFeeAccrualAccountInput = $("fims-account-select[formcontrolname='lateFeeAccrualAccount'] input");

var arrearsAllowanceAccountInput = $("fims-account-select[formcontrolname='account'] input");

var primaryButton = $$(".mat-raised-button.mat-primary");

var feeAmountInput = $("fims-text-input[controlname='amount'] input");
var feeProportionalToSelect = $("mat-select[formcontrolname='proportionalTo'] .mat-select-trigger");
var radioFixed = $$("mat-radio-group[formcontrolname='chargeMethod'] mat-radio-button").get(0);
var radioProportional = $$("mat-radio-group[formcontrolname='chargeMethod'] mat-radio-button").get(1);

var taskIdentifierInput = $("fims-id-input[controlname='identifier'] input");
var taskNameInput = $("fims-text-input[controlname='name'] input");
var taskDescriptionInput = $(".mat-input-infix textarea[formcontrolname='description']");
var mandatoryCheckbox = $("mat-checkbox[formcontrolname='mandatory']");
var fourEyesCheckbox = $("mat-checkbox[formcontrolname='fourEyes']");
var actionSelect1 = $("mat-select[formcontrolname='action'] .mat-select-trigger");
var actionSelect2 = $$("mat-select[formcontrolname='action'] .mat-select-trigger").get(1);

module.exports = {
    goToLoanProductsViaSidePanel: function() {
        $("a[href='/loans']").click();
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
        browser.executeScript("arguments[0].scrollIntoView();", minimumPrincipalInput.getWebElement());
        minimumPrincipalInput.click().sendKeys(protractor.Key.BACK_SPACE);
        minimumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        minimumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        minimumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        minimumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        minimumPrincipalInput.sendKeys(text);
    },
    enterTextIntoMaximumPrincipalInputField: function(text) {
        maximumPrincipalInput.click().sendKeys(protractor.Key.BACK_SPACE);
        maximumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        maximumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        maximumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        maximumPrincipalInput.sendKeys(protractor.Key.BACK_SPACE);
        maximumPrincipalInput.sendKeys(text);
    },
    verifyPrincipalAmountInputFieldsHaveError: function(text) {
        expect($("fims-min-max mat-error").getText()).toEqual(text);
    },
    verifyInterestRangeInputFieldsHaveError: function(text) {
        expect($("fims-min-max mat-error").getText()).toEqual(text);
    },
    enterTextIntoTermInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", termInput.getWebElement());
        termInput.click().clear().sendKeys(text);
    },
    enterTextIntoCashAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", cashAccountInput.getWebElement());
        browser.wait(EC.elementToBeClickable(cashAccountInput), 5000);
        cashAccountInput.click().sendKeys(text);
    },
    enterTextIntoCustomerLoanLedgerInputField: function(text) {
       customerLoanLedgerInput.click().sendKeys(text);
    },
    verifyInterestRangeToggleSetToOff: function(){
        toggleClass = interestRangeToggle.getAttribute('class');
        expect(toggleClass).not.toContain("mat-checked");
    },
    verifyInterestRangeToggleSetToOn: function(){
        toggleClass = interestRangeToggle.getAttribute('class');
        expect(toggleClass).toContain("mat-checked");
    },
    toggleInterestRangeToOn: function() {
        this.verifyInterestRangeToggleSetToOff();
        $(".mat-slide-toggle-content").click();
        this.verifyInterestRangeToggleSetToOn();
    },
    toggleInterestRangeToOff: function() {
        this.verifyInterestRangeToggleSetToOn();
        $(".mat-slide-toggle-content").click();
        this.verifyInterestRangeToggleSetToOff();
    },
    enterTextIntoInterestRateInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", interestRateInput.getWebElement());
        browser.wait(EC.elementToBeClickable(interestRateInput), 5000);
        interestRateInput.click().clear().sendKeys(text);
    },
    enterTextIntoInterestRangeMinInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", interestRangeMinimumInput.getWebElement());
        browser.wait(EC.elementToBeClickable(interestRangeMinimumInput), 5000);
        interestRangeMinimumInput.click().clear().sendKeys(text);
    },
    enterTextIntoInterestRangeMaxInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", interestRangeMaximumInput.getWebElement());
        browser.wait(EC.elementToBeClickable(interestRangeMaximumInput), 5000);
        interestRangeMaximumInput.click().clear().sendKeys(text);
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
        browser.sleep(1000);
    },
    clickEnabledContinueButtonForInterestSettings: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(2).getWebElement());
        expect($$(".mat-raised-button").get(2).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(2).click();
    },
    clickEnabledContinueButtonForFeeIncomeAccounts: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(3).getWebElement());
        expect($$(".mat-raised-button").get(3).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(3).click();
    },
    enterTextIntoProcessingFeeIncomeAccountInputField: function(text) {
        browser.sleep(100);
        browser.executeScript("arguments[0].scrollIntoView();", processingFeeIncomeAccountInput.getWebElement());
        browser.wait(EC.elementToBeClickable(processingFeeIncomeAccountInput), 2000);
        processingFeeIncomeAccountInput.click().sendKeys(text);
    },
    enterTextIntoOriginatingFeeIncomeAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", originationFeeIncomeAccountInput.getWebElement());
        originationFeeIncomeAccountInput.click().sendKeys(text);
    },
    enterTextIntoDisbursementFeeIncomeAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", disbursementFeeIncomeAccountInput.getWebElement());
        disbursementFeeIncomeAccountInput.click().sendKeys(text);
    },
    enterTextIntoLateFeeIncomeAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", lateFeeIncomeAccountInput.getWebElement());
        lateFeeIncomeAccountInput.click().sendKeys(text);
    },
    enterTextIntoLateFeeAccrualAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", lateFeeAccrualAccountInput.getWebElement());
        lateFeeAccrualAccountInput.click().sendKeys(text);
    },
    enterTextIntoArrearsAllowanceAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", arrearsAllowanceAccountInput.getWebElement());
        browser.wait(EC.elementToBeClickable(arrearsAllowanceAccountInput), 3000);
        arrearsAllowanceAccountInput.click().sendKeys(text);
    },
    clickEnabledCreateProductButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE PRODUCT";
            });
        }).click();
    },
    clickLinkManageFeesForLoanProduct: function(identifier){
        link = "/loans/detail/" + identifier + "/charges";
        browser.wait(EC.visibilityOf($('a[href="'+ link + '"]')));
        $('a[href="'+ link + '"]').click();
    },
    clickButtonEditProcessingFeeForLoanProduct: function(identifier){
        link = "/loans/detail/" + identifier + "/charges/detail/processing-fee/edit";
        browser.wait(EC.visibilityOf($('a[href="'+ link + '"]')));
        $('a[href="'+ link + '"]').click();
    },
    clickLinkManageTasksForLoanProduct: function(identifier){
        link = "/loans/detail/" + identifier + "/tasks";
        browser.wait(EC.visibilityOf($('a[href="'+ link + '"]')));
        $('a[href="'+ link + '"]').click();
    },
    clickButtonCreateTaskForLoanProduct: function(identifier){
        link = "/loans/detail/" + identifier + "/tasks/create";
        browser.wait(EC.visibilityOf($('a[href="'+ link + '"]')));
        $('a[href="'+ link + '"]').click();
    },
    enterTextIntoFeeAmountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", feeAmountInput.getWebElement());
        browser.wait(EC.visibilityOf(feeAmountInput), 5000);
        feeAmountInput.click().clear().sendKeys(text);
    },
    clickEnabledUpdateChargeButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE FEE";
            });
        }).click();
    },
    enterTextIntoTaskIdentifierInputField: function(text) {
        browser.wait(EC.visibilityOf(taskIdentifierInput), 5000);
        taskIdentifierInput.click().sendKeys(text);
    },
    enterTextIntoTaskNameInputField: function(text) {
        taskNameInput.click().sendKeys(text);
    },
    enterTextIntoTaskDescriptionInputField: function(text) {
        taskDescriptionInput.click().sendKeys(text);
    },
    checkMandatoryCheckbox: function(){
        mandatoryCheckbox.click();
    },
    checkFourEyesCheckbox: function(){
        fourEyesCheckbox.click();
    },
    clickButtonAddAction: function(){
        $$("fims-layout-card-over button.mat-button").filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add action";
            });
        }).click();
    },
    clickButtonCancel: function(){
        $$("fims-layout-card-over button.mat-button").filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Cancel";
            });
        }).click();
    },
    clickFirstRemoveButton: function(){
        $$("fims-layout-card-over button.mat-button").filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Remove";
            });
        }).click();
    },
    clickEnabledCreateTaskButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TASK";
            });
        }).click();
    },
    selectFirstAction: function(action){
        actionSelect1.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', action)).click();
    },
    selectSecondAction: function(action){
            actionSelect2.click();
            browser.wait(EC.visibilityOf($(".mat-option")), 5000);
            element(by.cssContainingText('.mat-option', action)).click();
    },
    clickButtonEnableProduct: function(){
        browser.wait(EC.elementToBeClickable($("td-message button")), 2000);
        $("td-message button").click();
    },
    selectRadioButtonYears: function(){
        radioYears.click();
    },
};