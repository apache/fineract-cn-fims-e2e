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
//Offices.js
var Common = require('./Common.js');

//office creation
var officeIdentifierInput = $(".mat-input-infix input[placeholder='Identifier']");
var officeNameInput = $("fims-text-input[controlname='name'] input");
var officeDescriptionInput = $("fims-text-input[controlname='description'] input");
var streetInput = $("fims-text-input[controlname='street'] input");
var cityInput = $("fims-text-input[controlname='city'] input");
var postalCodeInput = $("fims-text-input[controlname='postalCode'] input");
var regionInput = $("fims-text-input[controlname='region'] input");
var countryInput = $("input[formcontrolname='country']");

//teller creation
var numberInput = $(".mat-input-infix input[placeholder='Number']");
var passwordInput = $("input[formcontrolname='password']");
var withdrawalLimitInput = $("fims-text-input[controlname='cashdrawLimit'] input");
var tellerAccountInput = $("fims-account-select[formcontrolname='tellerAccountIdentifier'] input");
var vaultAccountInput = $("fims-account-select[formcontrolname='vaultAccountIdentifier'] input");
var chequesReceivableAccountInput = $("fims-account-select[formcontrolname='chequesReceivableAccount'] input");
var cashOverShortAccountInput = $("fims-account-select[formcontrolname='cashOverShortAccount'] input");
var checkboxDenominationRequired = $("mat-checkbox[formcontrolname='denominationRequired'] label");

//open teller
var assignedEmployeeInput = $("fims-employee-auto-complete[formcontrolname='assignedEmployeeIdentifier'] input");
var amountInput = $("fims-text-input[controlname='amount'] input");
var radioNone = $$("mat-radio-group[formcontrolname='adjustment'] mat-radio-button").first();
var radioCashIn = $$("mat-radio-group[formcontrolname='adjustment'] mat-radio-button").last();
var radioCashOut = $$("mat-radio-group[formcontrolname='adjustment'] mat-radio-button").last();

//general elements
var primaryButton = $$(".mat-raised-button.mat-primary");
var createOfficeButton = $$(".mat-raised-button.mat-primary").first();
var buttons = $$(".mat-button");


//Actions specific to the Offices section, including Teller management

var EC = protractor.ExpectedConditions;

module.exports = {
    goToManageOfficesViaSidePanel: function() {
        browser.wait(EC.visibilityOf($$("a[href='/offices']").get(0)), 5000);
        $$("a[href='/offices']").first().click();
    },
    clickViewOfficesFromQuickAccess: function() {
        browser.wait(EC.visibilityOf($$("a[href='/offices']").get(1)), 5000);
        $$("a[href='/offices']").get(1).click();
    },
    clickButtonCreateNewOffice: function(){
        browser.wait(EC.visibilityOf($("a[title='Create branch office']")), 5000);
        $("a[title='Create branch office']").click();
    },
    enterTextIntoOfficeIdentifierInputField: function(text) {
        officeIdentifierInput.click().sendKeys(text);
    },
    enterTextIntoOfficeNameInputField: function(text) {
        officeNameInput.click().sendKeys(text);
    },
    enterTextIntoOfficeDescriptionInputField: function(text){
        officeDescriptionInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForOfficeDetails: function(){
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    clickCreateOfficeButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", createOfficeButton.getWebElement());
        browser.wait(EC.elementToBeClickable(createOfficeButton), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE OFFICE";
            });
        }).click();
    },
    clickButtonCreateHeadquarter: function(){
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    verifyNoHeadquarterExistingYet: function(){
        browser.wait(EC.visibilityOf($(".mat-card-title .material-icons")), 5000);
        title = $(".mat-card .mat-card-title span").getText();
        expect(title).toEqual("No Headquarter found");
    },

    //teller creation, updating, opening and closing
    goToManageTellersForOfficeByIdentifier: function(identifier){
        link = '/offices/detail/' + identifier + '/tellers';
        browser.wait(EC.visibilityOf($('a[href="' + link +'"]')), 5000);
        $('a[href="' + link +'"]').click();
    },

    clickCreateTellerForOfficeByIdentifier: function(identifier){
        link = '/offices/detail/' + identifier + '/tellers/create';
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    enterTextIntoTellerNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(numberInput), 5000);
        numberInput.click().sendKeys(text);
    },
    enterTextIntoPasswordInputField: function(text) {
        browser.wait(EC.visibilityOf(passwordInput), 5000);
        passwordInput.click().clear().sendKeys(text);
    },
    enterTextIntoCashWithdrawalLimitInputField: function(text) {
        withdrawalLimitInput.click().clear().sendKeys(text);
    },
    verifyCashWithdrawalLimitInputFieldHasError: function(text) {
        expect(withdrawalLimitInput.getAttribute("class")).toMatch("ng-invalid");
        expect(withdrawalLimitInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toEqual(text);
    },
    enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry: function(text) {
        tellerAccountInput.click().clear().sendKeys(text);
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        $$(".mat-option").first().click();
    },
    enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry: function(text) {
        vaultAccountInput.click().clear().sendKeys(text);
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        $$(".mat-option").first().click();
    },
    enterTextIntoCashOverShortInputFieldAndSelectMatchingEntry: function(text) {
        cashOverShortAccountInput.click().clear().sendKeys(text);
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        $$(".mat-option").first().click();
    },
    enterTextIntoVaultAccountInputField: function(text) {
        vaultAccountInput.click().clear().sendKeys(text);
    },
    verifyVaultAccountInputFieldHasError: function(text) {
        expect(vaultAccountInput.getAttribute("class")).toMatch("ng-invalid");
        expect(vaultAccountInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toEqual(text);
    },
    enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry: function(text) {
        chequesReceivableAccountInput.click().clear().sendKeys(text);
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        $$(".mat-option").first().click();
    },
    enterTextIntoChequesReceivableAccountInputField: function(text) {
        chequesReceivableAccountInput.click().clear().sendKeys(text);
    },
    verifyChequesReceivableAccountInputFieldHasError: function(text) {
        browser.wait(EC.presenceOf($("mat-hint")), 2500);
        expect(chequesReceivableAccountInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-hint").getText()).toEqual(text);
    },
    verifyCheckboxDenominationRequiredChecked: function () {
        expect(checkboxDenominationRequired.getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    checkCheckboxDenominationRequired: function () {
        checkboxDenominationRequired.click();
    },
    //open teller
    verifyRadioNoneSelected: function(){
        expect(radioNone.getAttribute('class')).toMatch("mat-radio-checked");
    },
    selectRadioCashIn: function(){
        radioCashIn.click();
    },
    selectRadioCashOut: function(){
        browser.wait(EC.elementToBeClickable(radioCashOut), 2500);
        radioCashOut.click();
    },
    verifyAmountInputDisabledIfNoneSelected: function(){
        expect(amountInput.isEnabled()).toBe(false);
    },
    verifyAmountInputEnabledIfCashInSelected: function(){
        expect(amountInput.isEnabled()).toBe(true);
    },
    enterTextIntoAmountInputField: function(text) {
        amountInput.click().sendKeys(text);
    },
    enterTextIntoAssignedEmployeeInputField: function(text) {
        assignedEmployeeInput.click().sendKeys(text);
    },
    selectOptionInListByName: function(name){
        browser.wait(EC.visibilityOf($(".mat-option")), 3000);
        element(by.cssContainingText('.mat-option', name)).click();
    },
    clickCreateTellerButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(0).getWebElement());
        browser.sleep(1000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TELLER";
            });
        }).click();
    },
    verifyCreateTellerButtonIsDisabled: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(0).getWebElement());
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TELLER";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyCreateTellerButtonIsEnabled: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(0).getWebElement());
        browser.sleep(1000);
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TELLER";
            });
        }).first().isEnabled()).toBe(true);
    },
    clickUpdateTellerButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(0).getWebElement());
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE TELLER";
            });
        }).click();
    },
    clickActionOpenForTellerOfOffice: function(teller, office){
        link = '/offices/detail/' + office + '/tellers/detail/' + teller + '/command?action=OPEN';
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    clickActionCloseForTellerOfOffice: function(teller, office){
        link = '/offices/detail/' + office + '/tellers/detail/' + teller + '/command?action=CLOSE';
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    clickButtonEditForTellerInOffice: function(teller, office){
        link = '/offices/detail/' + office + '/tellers/detail/' + teller + '/edit';
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    clickEnabledOpenTellerButton: function(){
        browser.wait(EC.visibilityOf($(".mat-raised-button.mat-primary")), 5000);
        browser.sleep(1000);
        //expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    clickCloseTellerButton: function(){
        browser.wait(EC.visibilityOf($(".mat-raised-button.mat-primary")), 5000);
        browser.sleep(1000);
        //expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    verifyTellerStatusIs: function(expectedStatus){
        browser.wait(EC.visibilityOf($("fims-state-display")), 5000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual(expectedStatus);
    },
    verifyMessageDisplayed: function(message){
        expect($("td-message .td-message-label").getText()).toEqual(message);
    },
    verifyMessagesAreDisplayed: function(message, message2){
        expect($("td-message .td-message-label").getText()).toEqual(message);
        expect($("td-message .td-message-sublabel").getText()).toEqual(message2);
    },
    verifyNumberForTellerIs: function(tellerNumber) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Number";
            });
        }).first().$("p").getText().then(function (text) {
            return text === tellerNumber;
        })).toBe(true);
    },
    verifyCashWithdrawalLimitIs: function(limit) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Cash withdrawal limit";
            });
        }).first().$("p").getText().then(function (text) {
            return text === limit;
        })).toBe(true);
    },
    verifyTellerAccountIs: function(account) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Teller account";
            });
        }).first().$("p").getText().then(function (text) {
            return text === account;
        })).toBe(true);
    },
    verifyVaultAccountIs: function(account) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Vault account";
            });
        }).first().$("p").getText().then(function (text) {
            return text === account;
        })).toBe(true);
    },
    verifyChequesReceivableAccountIs: function(account) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Cheques receivable account";
            });
        }).first().$("p").getText().then(function (text) {
            return text === account;
        })).toBe(true);
    },
    verifyCashOverShortAccountIs: function(account) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Cash over short account";
            });
        }).first().$("p").getText().then(function (text) {
            return text === account;
        })).toBe(true);
    },
    verifyDenominationRequiredIs: function(expText) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Denomination required?";
            });
        }).first().$("p").getText().then(function (text) {
            return text === expText;
        })).toBe(true);
    },
    verifyAssignedEmployeeForTellerIs: function(assignedEmployee) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Assigned employee";
            });
        }).first().$("p").getText().then(function (text) {
            return text === assignedEmployee;
        })).toBe(true);
    },
    verifyCreatedByForTellerIs: function(createdBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Created by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(createdBy) >= 0;
        })).toBe(true);
    },
    verifyLastModifiedByForTellerIs: function(modifiedBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Last modified by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(modifiedBy) >= 0;
        })).toBe(true);
    },
    verifyLastOpenedByForTellerIs: function(openedBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Last opened by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(openedBy) >= 0;
        })).toBe(true);
    },
    viewTellerBalanceForTellerInOffice: function(tellerIdentifier, officeIdentifier){
        link = "/offices/detail/" + officeIdentifier + "/tellers/detail/" + tellerIdentifier + "/balance";
        browser.wait(EC.visibilityOf($("a[href='"+link+"']")), 2000);
        $("a[href='"+link+"']").click();
        browser.wait(EC.textToBePresentInElement($$("fims-layout-card-over .mat-toolbar-row span").get(1), "Teller balance"), 2000);
    },
    goToDenominationsForTellerInOffice: function(tellerIdentifier, officeIdentifier){
        link = "/offices/detail/" + officeIdentifier + "/tellers/detail/" + tellerIdentifier + "/denominations";
        browser.wait(EC.visibilityOf($("a[href='"+link+"']")), 2000);
        $("a[href='"+link+"']").click();
        browser.wait(EC.textToBePresentInElement($$("fims-layout-card-over .mat-toolbar-row span").get(1), "Manage denominations"), 2000);
    },
    clickButtonCreateDenominationsForTellerInOffice: function(tellerIdentifier, officeIdentifier){
        link = "/offices/detail/" + officeIdentifier + "/tellers/detail/" + tellerIdentifier + "/denominations/create";
        browser.wait(EC.visibilityOf($("a[href='"+link+"']")), 2000);
        $("a[href='"+link+"']").click();
        browser.wait(EC.textToBePresentInElement($$("fims-layout-card-over .mat-toolbar-row span").get(0), "Create new denomination"), 2000);
    },
    verifyTellerTransactionMessageForRow: function(message, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        browser.wait(EC.textToBePresentInElement($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1), message));
    },
    verifyTellerCashDisbursedAmountForRow: function(amount, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(3).getText()).toEqual(amount);
    },
    verifyTellerCashReceivedAmountForRow: function(amount, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(amount);
    },
    verifyTotalCashOnHand: function(amount) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr b").get(5).getText()).toEqual(amount);
    },
    clickButtonCancel: function(){
        $$(".mat-button span").filter(function(elem, index){
            return elem.getText().then(function(text){
                return text == "CANCEL";
            })
        }).click();
    },
    verifyDeleteOfficeIconIsNotDisplayed: function(){
        expect($("button[title='Delete this office']").isPresent()).toBe(false);
    }
}
