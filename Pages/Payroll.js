//Payroll.js

//Actions specific to the everything relating to payrolls (Member > Payroll / Accounting > Payrolls)

var EC = protractor.ExpectedConditions;

var mainAccountSelect = $("md-select[formcontrolname='mainAccountNumber'] .mat-select-trigger");
var amountInput = $$("fims-number-input[controlname='amount'] input");
var allocationAccountSelect = $$("md-select[formcontrolname='accountNumber'] .mat-select-trigger");
var checkboxProportional = $$("md-checkbox[formcontrolname='proportional']");

var fromAccountInput = $("fims-account-select[formcontrolname='sourceAccountNumber'] input");
var memberInput = $$("fims-customer-select[formcontrolname='customerIdentifier'] input");
var employerInput = $$("fims-text-input[controlname='employer'] input");
var salaryInput = $$("fims-number-input[controlname='salary'] input");

var primaryButtons = $$(".mat-raised-button.mat-primary");
var removeAllocationButtons = $$("fims-customer-payroll-form .mat-button");
var removePaymentButtons = $$("fims-payroll-form .mat-button");

module.exports = {
    clickButtonEditPayrollDistribution: function(customer){
        link = "/customers/detail/" + customer + "/payroll/edit";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    enterTextIntoAmountInputFieldForAllocation: function(text, allocationNumber) {
        browser.wait(EC.elementToBeClickable(amountInput.get(allocationNumber-1)), 5000);
        amountInput.get(allocationNumber-1).click().clear().sendKeys(text);
    },
    clickButtonAddAllocations: function(){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add allocation";
            });
        }).click();
    },
    clickButtonRemoveAllocation: function(allocationNumber){
        removeAllocationButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Remove";
            });
        }).get(allocationNumber-1).click();
    },
    clickButtonUpdateAllocations: function(){
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE ALLOCATIONS";
            });
        }).click();
    },
    verifyButtonUpdateAllocationsDisabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE ALLOCATIONS";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonUpdateAllocationsEnabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE ALLOCATIONS";
            });
        }).first().isEnabled()).toBe(true);
    },
    checkCheckboxProportionalForAllocation: function(allocationNumber){
       checkboxProportional.get(allocationNumber-1).click();
    },
    selectAllocationAccountForAllocation: function(accountIdentifier, allocationNumber){
        browser.executeScript("arguments[0].scrollIntoView();", allocationAccountSelect.get(allocationNumber-1).getWebElement());
        browser.wait(EC.elementToBeClickable(allocationAccountSelect).get(allocationNumber-1), 3000);
        allocationAccountSelect.get(allocationNumber-1).click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        //browser.executeScript("arguments[0].scrollIntoView();", element(by.cssContainingText('.mat-option', accountIdentifier)).getWebElement());
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },
    selectMainAccount: function(accountIdentifier){
        browser.executeScript("arguments[0].scrollIntoView();", mainAccountSelect.getWebElement());
        browser.wait(EC.elementToBeClickable(mainAccountSelect), 3000);
        mainAccountSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        //browser.executeScript("arguments[0].scrollIntoView();", element(by.cssContainingText('.mat-option', accountIdentifier)).getWebElement());
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },

    //Accounting > Payrolls

    clickButtonCreatePayroll: function(){
        link = "/accounting/payrolls/create";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },

    clickCreatePaymentsButton: function(){
        browser.wait(EC.elementToBeClickable(primaryButtons.get(0)), 5000);
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE PAYMENTS";
            });
        }).click();
    },
    verifyCreatePaymentsButtonIsDisabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE PAYMENTS";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyCreatePaymentsButtonIsEnabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE PAYMENTS";
            });
        }).first().isEnabled()).toBe(true);
    },
    clickButtonAddPayment: function(){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add payment";
            });
        }).click();
    },
    clickButtonRemovePayment: function(paymentNumber){
        removePaymentButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Remove";
            });
        }).get(paymentNumber-1).click();
    },
    enterTextIntoFromAccountInputFieldForPayment: function(text) {
        browser.wait(EC.elementToBeClickable(fromAccountInput), 5000);
        fromAccountInput.click().clear().sendKeys(text);
    },
    enterTextIntoMemberInputFieldForPayment: function(text, paymentNumber) {
        browser.wait(EC.elementToBeClickable(memberInput.get(paymentNumber-1)), 5000);
        memberInput.get(paymentNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoEmployerInputFieldForPayment: function(text, paymentNumber) {
        browser.wait(EC.elementToBeClickable(employerInput.get(paymentNumber-1)), 5000);
        employerInput.get(paymentNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoSalaryInputFieldForPayment: function(text, paymentNumber) {
        browser.wait(EC.elementToBeClickable(salaryInput.get(paymentNumber-1)), 5000);
        salaryInput.get(paymentNumber-1).click().clear().sendKeys(text);
    },
};