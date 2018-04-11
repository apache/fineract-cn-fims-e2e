/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
//Payroll.js

//Actions specific to the everything relating to payrolls (Member > Payroll / Accounting > Payrolls)

var EC = protractor.ExpectedConditions;

var mainAccountSelect = $("mat-select[formcontrolname='mainAccountNumber'] .mat-select-trigger");
var amountInput = $$("fims-number-input[controlname='amount'] input");
var allocationAccountSelect = $$("mat-select[formcontrolname='accountNumber'] .mat-select-trigger");
var checkboxProportional = $$("mat-checkbox[formcontrolname='proportional']");

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
        browser.sleep(200);
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
    uncheckCheckboxProportionalForAllocation: function(allocationNumber){
        checkboxProportional.get(allocationNumber-1).click();
    },
    selectAllocationAccountForAllocation: function(accountIdentifier, allocationNumber){
        browser.wait(EC.elementToBeClickable(allocationAccountSelect.get(allocationNumber-1)), 3000);
        allocationAccountSelect.get(allocationNumber-1).click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },
    selectAllocationAccountFromOpenList: function(accountIdentifier){
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },
    verifyAccountNotOfferedForSelection: function(accountIdentifier, allocationNumber){
        browser.wait(EC.elementToBeClickable(allocationAccountSelect.get(allocationNumber-1)), 3000);
        allocationAccountSelect.get(allocationNumber-1).click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        expect(element(by.cssContainingText('.mat-option', accountIdentifier)).isPresent()).toBe(false);
    },
    selectMainAccount: function(accountIdentifier){
        browser.sleep(500);
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
        browser.wait(EC.textToBePresentInElement($$("mat-hint").get(1), "Invalid member or has no payroll created"), 2000);
        expect(memberInput.first().element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-hint").getText()).toEqual(errorMessage);
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
        expect($$(".mat-list-item .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === heading;
            }).$(p).getText().then(function (text) {
                return text === value;
            }).toBe(true);
        }));
    },
    verifyErrorIsDisplayedIfSameAccountSelectedTwice: function() {
        browser.wait(EC.textToBePresentInElement($(".tc-red-600"),"Allocation accounts can't use main account or overlap with other allocation accounts."), 2000);
        expect($(".tc-red-600").getText()).toMatch("Allocation accounts can't use main account or overlap with other allocation accounts.");
    },
};