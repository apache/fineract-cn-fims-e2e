//Cheques.js

//Actions specific to the teller transaction Cash cheque and the Accounting section Cheque clearance

var EC = protractor.ExpectedConditions;

var chequeNumberInput = $("input[formcontrolname='chequeNumber']");
var branchSortCodeInput = $("input[formcontrolname='branchSortCode']");
var accountNumberInput =  $("input[formcontrolname='accountNumber']");
var issuingBankInput = $("input[formcontrolname='drawee']");
var issuerInput = $("input[formcontrolname='drawer']");
var payeeInput = $("input[formcontrolname='payee']");
var dateIssuedInput = $("input[formcontrolname='dateIssued']");
var checkboxIsChequeOpen = $("md-checkbox[formcontrolname='openCheque']");
var warningIssuingBankIssuerCouldNotBeDetermined = $("td-message[label='Issuing Bank/Issuer could not be determined in our system from the MICR your entered.']");
var warningToCheckCustomerID = $("td-message[label='Please check identification card of customer']");
var amountInput = $("input[formcontrolname='amount']");
var accountSelect = $("md-select[formcontrolname='productInstance'] .mat-select-trigger");
// three buttons (DETERMINE FROM MICR, CREATE TRANSACTION, CONFIRM TRANSACTION
var primaryButtons = $$(".mat-raised-button.mat-primary");

module.exports = {
    enterTextIntoChequeNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(chequeNumberInput), 5000);
        chequeNumberInput.click().sendKeys(text);
    },
    verifyCheckNumberInputHasErrorIfInputNoNumber: function(text) {
        expect(chequeNumberInput.getAttribute("class")).toMatch("ng-invalid");
        expect(chequeNumberInput.parent().parent().parent().$("md-error").getText()).toEqual("Must be a number");
    },
    enterTextIntoBranchSortCodeInputField: function(text) {
        browser.wait(EC.visibilityOf(branchSortCodeInput), 1000);
        branchSortCodeInput.click().sendKeys(text);
    },
    verifyBranchSortCodeInputHasErrorIfCharacterLimitExceeded: function(text) {
        expect(branchSortCodeInput.getAttribute("class")).toMatch("ng-invalid");
        expect(branchSortCodeInput.parent().parent().parent().$("md-error").getText()).toEqual("Only 11 characters allowed");
    },
    enterTextIntoAccountNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(accountNumberInput), 1000);
        accountNumberInput.click().sendKeys(text);
    },
    enterTextIntoIssuingBankInputField: function(text) {
        issuingBankInput.click().sendKeys(text);
    },
    enterTextIntoIssuerInputField: function(text) {
        issuerInput.click().sendKeys(text);
    },
    clickButtonDetermineFromMICR: function(){
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "DETERMINE FROM MICR";
            });
        }).click();
    },
    verifyButtonDetermineFromMICRDisabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "DETERMINE FROM MICR";
            });
        }).isEnabled()).toBe(false);
    },
    verifyButtonDetermineFromMICREnabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "DETERMINE FROM MICR";
            });
        }).isEnabled()).toBe(true);
    },
    verifyWarningIsDisplayedIfIssuingBankCouldNotBeDetermined: function(){
        browser.wait(EC.visibilityOf(warningIssuingBankIssuerCouldNotBeDetermined), 2000);
    },
    verifyPayeeHasTextAndCannotBeChanged: function(customerName){
        expect(payeeInput.getAttribute("value")).toEqual(customerName);
        expect(payeeInput.isEnabled()).toBe(false);
    },
    enterTextIntoDateIssuedInputField: function (date) {
        dateIssuedInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        dateIssuedInput.sendKeys(protractor.Key.ARROW_LEFT);
        dateIssuedInput.sendKeys(date);
    },
    checkCheckboxIsChequeOpen: function(){
       checkboxIsChequeOpen.click();
    },
    enterTextIntoAmountInputField: function(text) {
        amount.click().sendKeys(text);
    },
    verifyWarningIsDisplayedIfChequeIsNotOpen: function(){
        browser.wait(EC.visibilityOf(warningToCheckCustomerID), 2000);
    },
    verifyWarningIsNotDisplayedIfChequeIsOpen: function(){
        browser.wait(EC.invisibilityOf(warningToCheckCustomerID), 2000);
    },
    selectAccountToTransferTo: function(accountIdentifier){
        browser.executeScript("arguments[0].scrollIntoView();", accountSelect.getWebElement());
        browser.wait(EC.elementToBeClickable(accountSelect), 3000);
        accountSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        //browser.executeScript("arguments[0].scrollIntoView();", element(by.cssContainingText('.mat-option', accountIdentifier)).getWebElement());
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },
    enterTextIntoAmountInputField: function(text) {
        browser.wait(EC.elementToBeClickable(amountInput), 5000);
        amountInput.click().clear().sendKeys(text);
    },
    clickCreateTransactionButton: function(){
        browser.wait(EC.elementToBeClickable(primaryButtons.get(1)), 5000);
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).click();
    },
    verifyCreateTransactionButtonIsDisabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).isEnabled()).toBe(false);
    },
    verifyCreateTransactionButtonIsEnabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).isEnabled()).toBe(true);
    },
    clickConfirmTransactionButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButtons.get(2).getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButtons.get(2)), 3000);
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CONFIRM TRANSACTION";
            });
        }).click();
    },
    verifyChargesPayedInCashCheckboxChecked: function(){
        classCB = checkboxChargesInCash.getAttribute("class");
        expect(classCB).toMatch("mat-checkbox-checked");
    },
    uncheckChargesPayedInCashCheckbox: function(){
       this.verifyChargesPayedInCashCheckboxChecked();
       checkboxChargesInCash.click();
    },
    verifyChargesPayedInCashCheckboxNotChecked: function(){
        classCB = checkboxChargesInCash.getAttribute("class");
        expect(classCB).not.toMatch("mat-checkbox-checked");
    },
    verifyTransactionAmount: function(amount){
        browser.wait(EC.visibilityOf($("fims-teller-transaction-cost table tbody")), 2000);
        expect($$("fims-teller-transaction-cost table tbody .td-data-table-row").filter(function(elem, index){
            return elem.$$(".td-data-table-cell").first().getText().then(function(text){
                return text === "Transaction amount";
            });
        }).$$(".td-data-table-cell").last().getText().then(function(text){
            return text === amount;
        })).toBe(true);
    },
    verifyTransactionCharge: function(chargeName, chargeAmount){
        expect($$("fims-teller-transaction-cost table tbody .td-data-table-row").filter(function(elem, index){
            return elem.$(".td-data-table-cell").getText().then(function(text){
                return text === chargeName;
            });
        }).$$(".td-data-table-cell").last().getText().then(function(text){
            return text === chargeAmount;
        })).toBe(true);
    },
    clickButtonCancelForChequeWithIdentifier: function(id) {
        browser.sleep(1000);
        browser.wait(EC.invisibilityOf($("div[class='md-padding'] h3")), 5000);
        browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "CANCEL"), 3000);
        $$('tbody tr').filter(function(elem, index) {
            return elem.$$(".td-data-table-cell").first().getText().then(function(text) {
                return text === id;
            });
        }).$$(".td-data-table-cell").last().click();
    },
    clickButtonApproveForChequeWithIdentifier: function(id) {
        browser.sleep(1000);
        browser.wait(EC.invisibilityOf($("div[class='md-padding'] h3")), 5000);
        browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "CANCEL"), 3000);
        $$('tbody tr').filter(function(elem, index) {
            return elem.$$(".td-data-table-cell").first().getText().then(function(text) {
                return text === id;
            });
        }).$$(".td-data-table-cell").get(7).click();
    },
    confirmAction: function(){
        browser.wait(EC.visibilityOf($("td-dialog-actions")), 5000);
        $("td-dialog-actions .mat-button.mat-accent").click();
    },
    cancelAction: function(){
        $("td-dialog-actions button").get(0).click();
    },
    verifyStateForChequeInRow: function(state, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(6).getText()).toEqual(state);
    },
    verifyDateIssuedForChequeInRow: function(date, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(5).getText()).toEqual(date);
    },
    verifyAmountForChequeInRow: function(amount, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(4).getText()).toEqual(amount);
    },
    verifyPayeeForChequeInRow: function(payee, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(3).getText()).toEqual(payee);
    },
    verifyDrawerForChequeInRow: function(drawer, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(drawer);
    },
    verifyDraweeForChequeInRow: function(drawee, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(drawee);
    },
};