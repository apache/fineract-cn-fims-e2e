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
var buttons = $$(".mat-button");
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
        browser.wait(EC.elementToBeClickable(allocationAccountSelect.get(allocationNumber-1)), 3000);
        allocationAccountSelect.get(allocationNumber-1).click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
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
    verifyMemberInputFieldHasError: function(errorMessage) {
        browser.wait(EC.textToBePresentInElement($$("md-hint").get(1), "Invalid member or has no payroll created"), 2000);
        expect(memberInput.first().element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("md-hint").getText()).toEqual(errorMessage);
    },
    enterTextIntoEmployerInputFieldForPayment: function(text, paymentNumber) {
        browser.wait(EC.elementToBeClickable(employerInput.get(paymentNumber-1)), 5000);
        employerInput.get(paymentNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoSalaryInputFieldForPayment: function(text, paymentNumber) {
        browser.wait(EC.elementToBeClickable(salaryInput.get(paymentNumber-1)), 5000);
        salaryInput.get(paymentNumber-1).click().clear().sendKeys(text);
    },
    verifyMemberIDForPaymentInRow: function(memberID, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        browser.sleep(1000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(0).getText()).toEqual(memberID);
    },
    verifyEmployerForPaymentInRow: function(employer, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(employer);
    },
    verifySalaryForPaymentInRow: function(salary, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(salary);
    },
    verifyCreatedByForPayrollInRow: function(createdBy, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(0).getText()).toEqual(createdBy);
    },
    verifyAccountNumberForPayrollInRow: function(accountNumber, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(accountNumber);
    },
    verifyPayrollInfo: function(heading, value) {
        expect($$(".md-list-item .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === heading;
            }).$(p).getText().then(function (text) {
                return text === value;
            }).toBe(true);
        }));
    },
};