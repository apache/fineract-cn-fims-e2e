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
var paymentPeriodSelect = $("mat-select[formcontrolname='paymentTemporalUnit'] .mat-select-trigger");
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
var descriptionInputsDebtCosigner = $$("fims-case-credit-factor-form").get(2).$$("fims-text-input[controlname='description'] input");
var amountInputsDebtCosigner = $$("fims-case-credit-factor-form").get(2).$$("fims-text-input[controlname='amount'] input");
var descriptionInputsIncomeCosigner = $$("fims-case-credit-factor-form").get(3).$$("fims-text-input[controlname='description'] input");
var amountInputsIncomeCosigner = $$("fims-case-credit-factor-form").get(3).$$("fims-text-input[controlname='amount'] input");

//Documents
var descriptionInput = $("textarea[formcontrolname='description']");

//Tasks
var checkboxExecuteTask = $$("mat-checkbox[title='Execute task']");


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
    clickUpdateLoanAccountForMember: function (customer,loanProduct, loanAccount) {
        link = "/customers/detail/" + customer + "/loans/products/" + loanProduct + "/detail/" + loanAccount + "/edit";
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
    verifyInterestRateInputFieldIsDisabledAndHasText: function (text) {
        expect(interestRateInput.isEnabled()).toBe(false);
        expect(interestRateInput.getAttribute("value")).toEqual(text);
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
        browser.executeScript("arguments[0].scrollIntoView();", paymentPeriod.getWebElement());
        browser.wait(EC.visibilityOf(paymentPeriod), 2000);
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
    clickEnabledCreateDocumentButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE DOCUMENT";
            });
        }).click();
    },
    clickEnabledUpdateDocumentButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE DOCUMENT";
            });
        }).click();
        //no message pop-up to wait for
        browser.sleep(2000);
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
    verifyTransactionChargeTotal: function(chargeAmount){
        browser.wait(EC.visibilityOf($("fims-case-command-confirmation-form table tbody")), 3000);
        expect($$("fims-case-command-confirmation-form table tbody .td-data-table-row").filter(function(elem, index){
            return elem.$(".td-data-table-cell").getText().then(function(text){
                return text === "Total";
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
    goToStepLoanDetails: function(){
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable($$(".td-step-label").get(0)), 3000);
        $$(".td-step-label").get(0).click();
        browser.sleep(1000);
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
        browser.sleep(1000);
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
        }).first().click();
    },
    clickButtonAddIncome: function(){
        browser.sleep(200);
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "ADD INCOME";
            });
        }).first().click();
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
    enterTextDescriptionInputFieldForDebtCosigner: function(text, number) {
        browser.wait(EC.visibilityOf(descriptionInputsDebtCosigner.get(number-1)), 2000)
        descriptionInputsDebtCosigner.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoAmountInputFieldForDebtCosigner: function(text, number) {
        browser.wait(EC.visibilityOf(amountInputsDebtCosigner.get(number-1)), 2000)
        amountInputsDebtCosigner.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoDescriptionInputFieldForIncomeCosigner: function(text, number) {
        browser.wait(EC.visibilityOf(descriptionInputsIncomeCosigner.get(number-1)), 2000)
        descriptionInputsIncomeCosigner.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoAmountInputFieldForIncomeCosigner: function(text, number) {
        browser.wait(EC.visibilityOf(amountInputsIncomeCosigner.get(number-1)), 2000)
        amountInputsIncomeCosigner.get(number-1).clear().click().sendKeys(text);
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
    goToTasksForCustomerLoan: function (customer, productIdentifier, accountIdentifier) {
        link = "/customers/detail/" + customer + "/loans/products/" + productIdentifier + "/detail/" + accountIdentifier + "/tasks";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
        browser.sleep(1000);
    },
    viewDebtIncomeReportForCustomerLoan: function(customer, productIdentifier, accountIdentifier){
        link = "/customers/detail/" + customer + "/loans/products/" + productIdentifier + "/detail/" + accountIdentifier + "/debtIncome";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
        browser.wait(EC.visibilityOf($("fims-layout-card-over")), 2000);
    },
    viewLoanDocumentsForCustomerLoan: function(customer, loanProduct, loanAccount){
        link = "/customers/detail/" + customer + "/loans/products/" + loanProduct + "/detail/" + loanAccount + "/documents";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    //table loan accounts
    verifyPrincipalForLoanAccountInRow: function(principalAmount, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(principalAmount);
    },
    verifyInterestForLoanAccountInRow: function(interest, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(3).getText()).toEqual(interest);
    },
    verifyCurrentStatusForLoanAccountInRow: function(status, row){
        browser.wait(EC.visibilityOf($("table tbody tr")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(4).getText()).toEqual(status);
    },
    //details single loan
    verifyLoanStatusIs: function(expectedStatus){
        browser.wait(EC.visibilityOf($("fims-state-display")), 5000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual(expectedStatus);
    },
    verifyPrincipalAmountForLoan: function(principalAmount) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Principal amount";
            });
        }).first().$("p").getText().then(function (text) {
            return text === principalAmount;
        })).toBe(true);
    },
    verifyInterestForLoan: function(interest) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Interest";
            });
        }).first().$("p").getText().then(function (text) {
            return text === interest;
        })).toBe(true);
    },
    verifyPaymentCycleForLoan: function(cycle, cycle2) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Payment cycle";
            });
        }).first().$("p").getText().then(function (text) {
            return text === cycle;
        })).toBe(true);
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Payment cycle";
            });
        }).first().$$("p").get(1).getText().then(function (text) {
            return text === cycle2;
        })).toBe(true);
    },
    verifyTermForLoan: function(term) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Term";
            });
        }).first().$("p").getText().then(function (text) {
            return text === term;
        })).toBe(true);
    },
    verifyMemberDepositAccountForLoan: function(account) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Member deposit account";
            });
        }).first().$("p").getText().then(function (text) {
            return text === account;
        })).toBe(true);
    },
    verifyCreatedByForLoanIs: function(createdBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Created by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(createdBy) >= 0;
        })).toBe(true);
    },
    verifyLastModifiedByForLoanIs: function(modifiedBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Last modified by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(modifiedBy) >= 0;
        })).toBe(true);
    },

    verifyMemberRatioIs:function (text){
        expect($$("mat-tab-header div[role='tab']").get(0).getText()).toEqual("Member(Ratio: " + text + ")");
    },
    verifyCoSignerRatioIs:function (text){
        expect($$("mat-tab-header div[role='tab']").get(1).getText()).toEqual("Co-signer(Ratio: " + text + ")");
    },
    verifyPrincipalInputFieldHasError: function(errorMessage) {
        $("fims-case-detail-form").click();
        browser.wait(EC.textToBePresentInElement($("mat-error"), errorMessage), 2000);
        expect(principalAmountInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toMatch(errorMessage);
    },
    verifyInterestRateInputFieldHasError: function(errorMessage) {
        $("fims-case-detail-form").click();
        browser.wait(EC.textToBePresentInElement($("mat-error"), errorMessage), 2000);
        expect(interestRateInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("div div mat-error").getText()).toEqual(errorMessage);
    },
    verifyTermInputFieldHasErrorForInvalidTerm: function(errorMessage) {
        $("fims-case-detail-form").click();
        browser.wait(EC.textToBePresentInElement($(".tc-red-600"), errorMessage), 2000);
    },
    verifyTermInputFieldHasError: function(errorMessage) {
        $("fims-case-detail-form").click();
        browser.wait(EC.textToBePresentInElement($("mat-error"), errorMessage), 2000);
        expect(termInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toEqual(errorMessage);
    },
    verifyRepayEveryFieldHasErrorForInvalidTerm: function(errorMessage) {
        $("fims-case-detail-form").click();
        browser.wait(EC.textToBePresentInElement($(".tc-red-600"), errorMessage), 2000);
    },
    verifyCreateLoanButtonIsNotDisplayed: function(){
        expect($("a[title='Create new loan for member ']").isPresent()).toBe(false);
    },
    verifyEditLoanButtonIsNotDisplayed: function(){
        expect($("a[title='Edit member loan']").isPresent()).toBe(false);
    },
    verifyEditLoanButtonIsDisplayed: function(){
        expect($("a[title='Edit member loan']").isPresent()).toBe(true);
    },
    verifyMessageDisplayed: function(message){
        expect($("td-message .td-message-label").getText()).toEqual(message);
    },
    verifyMessagesAreDisplayed: function(message, message2){
        browser.wait(EC.visibilityOf($("td-message")), 2500);
        expect($("td-message .td-message-label").getText()).toEqual(message);
        expect($("td-message .td-message-sublabel").getText()).toEqual(message2);
    },
    //planned payments
    verifyDateForPlannedPaymentsInRow: function(date, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(0).getText()).toEqual(date);
    },
    verifyBalanceForPlannedPaymentsInRow: function(balance, row){
        browser.wait(EC.visibilityOf($("table tbody tr")), 4000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(4).getText()).toEqual(balance);
    },
    verifyPaymentForPlannedPaymentsInRow: function(payment, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(payment);
    },
    verifyInterestForPlannedPaymentsInRow: function(interest, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(interest);
    },
    verifyPrincipalForPlannedPaymentsInRow: function(principal, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(3).getText()).toEqual(principal);
    },
    //tasks
    selectExecuteTaskCheckboxForTaskAtPosition: function(taskNumber){
        browser.wait(EC.visibilityOf(checkboxExecuteTask.first()), 3000);
        checkboxExecuteTask.get(taskNumber - 1).click();
    },
    deselectExecuteTaskCheckboxForTaskAtPosition: function(taskNumber){
        browser.wait(EC.visibilityOf($("mat-checkbox[title='Execute task']")), 3000);
        $$("mat-checkbox[title='Execute task']").get(taskNumber - 1).click();
        expect($$("mat-checkbox[title='Execute task']").get(taskNumber - 1).getAttribute("class")).not.toMatch("mat-checkbox-checked");
    },
    verifyExecuteTaskCheckboxSelectedAtPosition: function(taskNumber){
        expect($$("mat-checkbox[title='Execute task']").get(taskNumber - 1).getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    verifyExecuteTaskCheckboxDisabledAtPosition: function(taskNumber){
        expect($$("mat-checkbox[title='Execute task']").get(taskNumber - 1).isEnabled()).toBe(false);
    },
    verifyExecuteTaskCheckboxNotSelectedAtPosition: function(taskNumber){
        expect($$("mat-checkbox[title='Execute task']").get(taskNumber - 1).getAttribute("class")).not.toMatch("mat-checkbox-checked");
    },
    clickButtonForTask: function (action) {
        browser.sleep(1000);
        $$('button').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === action;
            });
        }).click();
    },
    verifyButtonForTaskDisabled: function (action) {
        browser.sleep(500);
        expect($$('button').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === action;
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonForTaskEnabled: function (action) {
        browser.sleep(500);
        expect($$('button').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === action;
            });
        }).first().isEnabled()).toBe(true);
    },
    createDocumentForLoanAccount: function(customer, loanProduct, loanAccount){
        link = "/customers/detail/" + customer + "/loans/products/" + loanProduct + "/detail/" + loanAccount + "/documents/create";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    enterTextIntoDescriptionInputField: function(text) {
        browser.wait(EC.visibilityOf(descriptionInput), 2000)
        descriptionInput.clear().click().sendKeys(text);
    },
    verifyCreatedByForDocumentIs: function(createdBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Created by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(createdBy) >= 0;
        })).toBe(true);
    },
    verifyDescriptionForDocumentIs: function(descr) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Description";
            });
        }).first().$("p").getText().then(function (text) {
            return text === descr;
        })).toBe(true);
    },
    verifyDocumentCanBeEdited: function(){
        expect($("a[title='Edit document']").isPresent()).toBe(true);
    },
    verifyDocumentCannotBeEdited: function(){
        expect($("a[title='Edit document']").isPresent()).toBe(false);
    },
    verifyDocumentCanBeDeleted: function(){
        expect($("button[title='Delete document']").isPresent()).toBe(true);
    },
    verifyDocumentCannotBeDeleted: function(){
        expect($("button[title='Delete document']").isPresent()).toBe(false);
    },
    clickButtonEditDocument: function(){
        $("a[title='Edit document']").click();
    },
    clickButtonDeleteDocument: function(){
        $("button[title='Delete document']").click();
    },
    clickButtonLock: function(){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "LOCK";
            });
        }).click();
    },
    verifyMandatoryTaskIsPresentAtPosition: function(task, taskDescription, position){
        expect($$("fims-case-tasks mat-list .mat-subheader").get(0).getText()).toEqual("Mandatory tasks(These tasks must be executed)");
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text h3").getText()).toEqual(task);
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text h4").getText()).toEqual(taskDescription);
    },
    verifyOptionalTaskIsPresent: function(task, taskDescription, position){
        expect($$("fims-case-tasks mat-list .mat-subheader").get(1).getText()).toEqual("Optional tasks");
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text h3").getText()).toEqual(task);
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text h4").getText()).toEqual(taskDescription);
    },
    verifyTaskAtPositionExecutedBy: function(position, executedBy){
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text p").getText()).toMatch(executedBy);
    },
    verifyTaskAtPositionReversedBy: function(position, executedBy){
        expect($$("fims-case-tasks mat-list fims-case-task").get(position - 1).$(".mat-list-item .mat-list-text p").getText()).toEqual(executedBy + ",");
    },
};
