//Teller.js

//Actions specific to the Teller section

var EC = protractor.ExpectedConditions;
var tellerNumberInput = $("input[placeholder='Teller number']");
var passwordInput = $("input[formcontrolname='password']");
var accountSelect =  $("md-select[formcontrolname='productInstance'] .mat-select-trigger");
var amountInput = $("fims-text-input[controlname='amount'] input");
var primaryButton = $$(".mat-raised-button.mat-primary");
var checkboxChargesInCash = $("md-checkbox");

module.exports = {
    goToTellerManagementViaSidePanel: function() {
        browser.wait(EC.elementToBeClickable($("a[href='/teller']")), 5000);
        $("a[href='/teller']").click();
    },
    enterTextIntoTellerNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(tellerNumberInput), 5000);
        tellerNumberInput.click().sendKeys(text);
    },
    enterTextIntoPasswordInputField: function(text) {
        passwordInput.click().sendKeys(text);
    },
    clickEnabledUnlockTellerButton: function(){
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UNLOCK";
            });
        }).click();
    },
    enterTextIntoSearchInputField: function(text){
        browser.wait(EC.visibilityOf($("td-search-input input")), 5000);
        $("td-search-input input").click().sendKeys(text);
        //not good, need other way to prevent test from clicking too fast
        browser.sleep(2000);
    },
    clickButtonShowAtIndex: function(i){
        browser.wait(EC.visibilityOf($$("button[title='SHOW']").get(i)), 5000);
        $$("button[title='SHOW']").get(i).click();
    },
    verifyCardTitleHasNameOfCustomer: function (text) {
        browser.wait(EC.presenceOf($('fims-portrait')), 10000);
        form_title = $$("fims-layout-card-over .mat-toolbar-row span").get(1).getText();
        expect(form_title).toMatch(text);
    },
     pauseTeller: function(){
        $("a[title='Pause']").click();
    },
    verifyTellerIsLocked: function(){
        browser.wait(EC.visibilityOf(tellerNumberInput), 3000);
    },
    clickOnOpenAccountForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCO";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 5000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionOpenAccountNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCO";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.invisibilityOf(a), 5000);
        expect(a.isPresent()).toBe(false);
    },
    clickOnCloseAccountForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCC";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionCloseAccountNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCC";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    verifyActionCloseAccountOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCC";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(true);
    },
    clickOnTransferAccountForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCT";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionAccountTransferNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCT";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    clickOnCashDepositForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CDPT";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionCashDepositNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CDPT";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    clickOnCashWithdrawalForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CWDL";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 5000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionCashWithdrawalNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CWDL";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    clickOnCashChequeForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/cheque?transactionType=CCHQ";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.visibilityOf(a), 5000);
        browser.executeScript("arguments[0].scrollIntoView();", a.getWebElement());
        a.click();
        browser.wait(EC.presenceOf($("fims-cheque-transaction-form")), 4000);
    },
    verifyActionCashChequeNotDisplayedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/cheque?transactionType=CCHQ";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    clickOnRepayLoanForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/loan?transactionType=PPAY";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    verifyActionRepayLoanNotOfferedForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=PPAY";
        a = $('a[href= "' + link +'"]');
        expect(a.isPresent()).toBe(false);
    },
    selectAccountToBeAffected: function(accountIdentifier){
        browser.sleep(2000);
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
    verifyAmountInputFieldHasError: function(text) {
        $(".text-md").click();
        expect(amountInput.getAttribute("class")).toMatch("ng-invalid");
        expect(amountInput.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("md-error").getText()).toEqual(text);
    },
    clickEnabledCreateTransactionButton: function(){
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).click();
    },
    verifyCreateTransactionButtonIsDisabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyCreateTransactionButtonIsEnabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE TRANSACTION";
            });
        }).isEnabled()).toBe(true);
    },
    clickEnabledConfirmTransactionButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(1).getWebElement());
        browser.sleep(1000);
        browser.wait(EC.elementToBeClickable(primaryButton.get(1)), 4000);
        primaryButton.filter(function(elem, index) {
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
    verifyCashdrawLimitHintIsDisplayed: function(text){
      browser.wait(EC.textToBePresentInElement($(".text-md"), text), 2000);
    },

};