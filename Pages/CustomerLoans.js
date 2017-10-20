//Customers.js

//Actions specific to the Customers section

var Common = require('./Common.js');
var EC = protractor.ExpectedConditions;

//loan details
var productSelect = $("mat-select[formcontrolname='productIdentifier'] .mat-select-trigger");
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var principalAmountInput = $("fims-number-input[controlname='principalAmount'] input");
var interestRateInput = $("fims-number-input[controlname='interest'] input");
var termInput = $("fims-text-input[controlname='term'] input");
var termSelect = $("mat-select[formcontrolname='termTemporalUnit'] .mat-select-trigger");
var paymentPeriod = $("fims-text-input[controlname='paymentPeriod'] input");
var paymentPeriodSelect = $("mat-select[formcontrolname='termTemporalUnit'] .mat-select-trigger");
var depositAccountSelect = $("mat-select[formcontrolname='depositAccountIdentifier'] .mat-select-trigger");
//if "Repay every" is set to "months"
var radioMonthSetting1 = $$("mat-radio-group[formcontrolname='monthSetting'] mat-radio-button").get(0);
var dayForMonthlyRepaySelect = $("mat-select[formcontrolname='monthSettingDay'] .mat-select-trigger");
var radioMonthSetting2 = $$("mat-radio-group[formcontrolname='monthSetting'] mat-radio-button").get(1);
var numberDaySelectMonthlyRepayment = $("mat-select[formcontrolname='monthSettingWeek'] .mat-select-trigger");
var weekdaySelectMonthlyRepayment = $("mat-select[formcontrolname='monthSettingDayInWeek'] .mat-select-trigger");
//if "Repay every" is set to "weeks"
var dayInWeekSelect = $("mat-select[formcontrolname='dayInWeek'] .mat-select-trigger");
//if "Repay every" is set to "years"
var dayForYearlyRepaySelect = $("mat-select[formcontrolname='monthSettingDay'] .mat-select-trigger");
var numberDaySelectYearlyRepayment = $("mat-select[formcontrolname='monthSettingWeek'] .mat-select-trigger");
var weekdaySelectYearlyRepayment = $("mat-select[formcontrolname='monthSettingDayInWeek'] .mat-select-trigger");
var monthSelectYearlyRepayment = $("mat-select[formcontrolname='month'] .mat-select-trigger");

//Debt to income ratio
var descriptionInputsDebt = $$("fims-case-credit-factor-form").get(0).$$("fims-text-input[controlname='description'] input");
var amountInputsDebt = $$("fims-case-credit-factor-form").get(0).$$("fims-text-input[controlname='amount'] input");
var descriptionInputsIncome = $$("fims-case-credit-factor-form").get(1).$$("fims-text-input[controlname='description'] input");
var amountInputsIncome = $$("fims-case-credit-factor-form").get(1).$$("fims-text-input[controlname='amount'] input");
var debtsTotal = $$("fims-case-debt-to-income-form h4").get(0);
var incomeTotal = $$("fims-case-debt-to-income-form h4").get(1);
var ratio = $("fims-case-debt-to-income-form");

//Co-signer
var memberSelect = $("fims-customer-select[formcontrolname='customerIdentifier'] input");

//Documents
var descriptionInputsDocs = $$("fims-case-documents-form fims-text-input[controlname='description'] input");


//general elements
var primaryButton =  $$(".mat-raised-button.mat-primary");
var continueButton = $$(".mat-raised-button.mat-accent");
var buttons = $$(".mat-button");

module.exports = {

    clickCreateLoanAccountForMember: function (customer) {
        link = "/customers/detail/" + customer + "/loans/create";
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')));
        $('a[href="' + link + '"]').click();
    },
    selectProduct: function (productName) {
        browser.sleep(2000);
        browser.wait(EC.elementToBeClickable(productSelect), 3000);
        productSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', productName));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        browser.wait(EC.invisibilityOf($("mat-tooltip-component")), 4000);
    },
    selectProductFromOpenList: function (productName) {
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', productName));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        browser.wait(EC.invisibilityOf($("mat-tooltip-component")), 4000);
    },
    verifyStateOfLoanAccountWithIdIs: function (identifier, expectedState) {
        browser.wait(EC.visibilityOf($("tbody tr")), 5000);
        //if > page of entries, need to implement way to page in order to find correct row
        actualState = $$('tbody tr').filter(function (elem, index) {
            return elem.$(".td-data-table-cell").getText().then(function (text) {
                return text === identifier;
            });
        }).$$(".td-data-table-cell").get(3).getText();
        expect(actualState).toEqual(expectedState);
    },
    enterTextIntoShortNameInputField: function (text) {
        browser.wait(EC.elementToBeClickable(shortNameInput), 5000);
        shortNameInput.click().sendKeys(text);
    },
    enterTextIntoPrincipalAmountInputField: function (text) {
        principalAmountInput.click().sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(text);
    },
    enterTextIntoInterestRateInputField: function (text) {
        interestRateInput.click().sendKeys(protractor.Key.BACK_SPACE);
        interestRateInput.sendKeys(protractor.Key.BACK_SPACE);
        interestRateInput.sendKeys(protractor.Key.BACK_SPACE);
        interestRateInput.sendKeys(protractor.Key.BACK_SPACE);
        interestRateInput.sendKeys(text);
    },
    verifyLoanAccountNotOfferedForSelection: function(accountIdentifier){
        browser.wait(EC.elementToBeClickable(productSelect), 3000);
        productSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        expect(element(by.cssContainingText('.mat-option', accountIdentifier)).isPresent()).toBe(false);
    },
    verifyDepositAccountNotOfferedForSelection: function(accountIdentifier){
        browser.executeScript("arguments[0].scrollIntoView();", depositAccountSelect.getWebElement());
        browser.wait(EC.elementToBeClickable(depositAccountSelect), 3000);
        depositAccountSelect.click();
        expect($(".mat-option").isPresent()).toBe(true);
        expect(element(by.cssContainingText('.mat-option', accountIdentifier)).isPresent()).toBe(false);
    },
    enterTextIntoTermInputField: function (text) {
        termInput.click().clear().sendKeys(text);
    },
    selectTemporalUnitForTerm: function (temporalUnit) {
        browser.executeScript("arguments[0].scrollIntoView();", termSelect.getWebElement());
        browser.wait(EC.visibilityOf(termSelect), 2000);
        termSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', temporalUnit));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    enterTextIntoPaymentPeriodInputField: function (text) {
        paymentPeriod.click().clear().sendKeys(text);
    },
    selectPaymentPeriod: function (paymentPeriod) {
        browser.executeScript("arguments[0].scrollIntoView();", paymentPeriodSelect.getWebElement());
        browser.wait(EC.visibilityOf(paymentPeriodSelect), 2000);
        paymentPeriodSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', paymentPeriod));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    selectDayForMonthlyRepayment: function (day) {
        browser.executeScript("arguments[0].scrollIntoView();", dayForMonthlyRepaySelect.getWebElement());
        browser.wait(EC.visibilityOf(dayForMonthlyRepaySelect), 2000);
        dayForMonthlyRepaySelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', day));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    selectSecondRadioOptionForMonthlyRepayment: function(){
        radioMonthSetting2.click();
    },
    selectWeekdayForMonthlyRepayment: function (ordinaryNumber, weekday) {
        browser.executeScript("arguments[0].scrollIntoView();", numberDaySelectMonthlyRepayment.getWebElement());
        browser.wait(EC.visibilityOf(numberDaySelectMonthlyRepayment), 2000);
        numberDaySelectMonthlyRepayment.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', ordinaryNumber));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        weekdaySelectMonthlyRepayment.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', weekday));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    selectDepositAccount: function (depositAccount) {
        browser.executeScript("arguments[0].scrollIntoView();", depositAccountSelect.getWebElement());
        browser.wait(EC.visibilityOf(depositAccountSelect), 2000);
        depositAccountSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', depositAccount));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    clickEnabledCreateMemberLoanButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE MEMBER LOAN";
            });
        }).click();
    },
    clickEnabledUpdateMemberLoanButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE MEMBER LOAN";
            });
        }).click();
    },
    verifyTransactionCharge: function(chargeName, chargeAmount){
        browser.sleep(1000);
        browser.wait(EC.visibilityOf($("fims-case-command-confirmation-form table tbody")), 3000);
        expect($$("fims-case-command-confirmation-form table tbody .td-data-table-row").filter(function(elem, index){
            return elem.$(".td-data-table-cell").getText().then(function(text){
                return text === chargeName;
            });
        }).$$(".td-data-table-cell").last().getText().then(function(text){
            return text === chargeAmount;
        })).toBe(true);
    },
    clickButtonForTransaction: function (transaction) {
        $$('.mat-raised-button.mat-primary').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === transaction;
            });
        }).click();
    },
    verifyLoanHasStatus: function (expectedStatus) {
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual(expectedStatus);
    },
    goToStepDebtToIncomeRatio: function(){
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable($$(".td-step-label").get(1)), 3000);
        $$(".td-step-label").get(1).click();
    },
    goToStepCoSigner: function(){
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable($$(".td-step-label").get(2)), 3000);
        $$(".td-step-label").get(2).click();
    },
    goToStepDocuments: function(){
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable($$(".td-step-label").get(3)), 3000);
        $$(".td-step-label").get(3).click();
    },
    verifyButtonCreateMemberLoanDisabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE MEMBER LOAN";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonCreateMemberLoanEnabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE MEMBER LOAN";
            });
        }).first().isEnabled()).toBe(true);
    },
    verifyButtonUpdateMemberLoanDisabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE MEMBER LOAN";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonUpdateMemberLoanEnabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE MEMBER LOAN";
            });
        }).first().isEnabled()).toBe(true);
    },
    clickButtonAddDebt: function(){
        browser.sleep(200);
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "ADD DEBT";
            });
        }).click();
    },
    clickButtonAddIncome: function(){
        browser.sleep(200);
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "ADD INCOME";
            });
        }).click();
    },
    removeDebtAtPosition: function(position){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "REMOVE DEBT";
            });
        }).get(position-1).click();
    },
    removeIncomeAtPosition: function(position){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "REMOVE INCOME";
            });
        }).get(position-1).click();
    },
    enterTextDescriptionInputFieldForDebt: function(text, number) {
        browser.wait(EC.visibilityOf(descriptionInputsDebt.get(number-1)), 2000)
        descriptionInputsDebt.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoAmountInputFieldForDebt: function(text, number) {
        browser.wait(EC.visibilityOf(amountInputsDebt.get(number-1)), 2000)
        amountInputsDebt.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoDescriptionInputFieldForIncome: function(text, number) {
        browser.wait(EC.visibilityOf(descriptionInputsIncome.get(number-1)), 2000)
        descriptionInputsIncome.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoAmountInputFieldForIncome: function(text, number) {
        browser.wait(EC.visibilityOf(amountInputsIncome.get(number-1)), 2000)
        amountInputsIncome.get(number-1).clear().click().sendKeys(text);
    },
    verifyDebtTotalIs: function(amount) {
        expect(debtsTotal.getText()).toMatch(amount);
    },
    verifyIncomeTotalIs: function(amount) {
        expect(incomeTotal.getText()).toMatch(amount);
    },
    verifyDebtIncomeRatioIs: function(amount) {
        expect(ratio.getText()).toMatch(amount);
    },
    enterTextIntoMemberInputField: function(text) {
        browser.wait(EC.elementToBeClickable(memberSelect), 5000);
        memberSelect.click().clear().sendKeys(text);
    },
    clickButtonAddDocument: function(){
        browser.sleep(200);
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "ADD DOCUMENT";
            });
        }).click();
    },
    removeDocumentAtPosition: function(position){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "REMOVE DOCUMENT";
            });
        }).get(position-1).click();
    },
    viewPlannedPaymentForCustomerLoan: function(customer, loanProduct, loanAccount){
        link = "/customers/detail/" + customer + "/loans/products/" + loanProduct + "/detail/" + loanAccount + "/payments";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    viewDebtIncomeReportForCustomerLoan: function(customer, loanProduct, loanAccount){
        link = "/customers/detail/" + customer + "/loans/products/" + loanProduct + "/detail/" + loanAccount + "/debtIncome";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    }
};
