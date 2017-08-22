//Teller.js

//Actions specific to the Teller section

var EC = protractor.ExpectedConditions;
var tellerNumberInput = $(".mat-input-infix input[formcontrolname='tellerCode']");
var passwordInput = $(".mat-input-infix input[formcontrolname='password']");
var accountSelect =  $("md-select[formcontrolname='productInstance'] .mat-select-trigger");
var amountInput = $("input[formcontrolname='amount']");
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
        browser.wait(EC.visibilityOf(primaryButton.first()), 5000);
        expect(primaryButton.first().isEnabled()).toBeTruthy();
        primaryButton.first().click();
    },
    enterTextIntoSearchInputField: function(text){
        browser.wait(EC.visibilityOf($("td-search-input input")), 5000);
        $("td-search-input input").click().sendKeys(text);
        //not good, need other way to prevent test from clicking too fast
        browser.sleep(2000);
    },
    clickButtonShowAtIndex: function(i){
        $$("button[title='SHOW']").get(i).click();
    },
    verifyCardTitleHasNameOfCustomer: function (text) {
        browser.wait(EC.presenceOf($('fims-portrait')), 10000);
        form_title = $("fims-layout-card-over .mat-toolbar-row div").getText();
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
    clickOnCloseAccountForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCC";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    clickOnTransferAccountForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=ACCT";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    clickOnCashDepositForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CDPT";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    clickOnCashWithdrawalForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/deposit?transactionType=CWDL";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    clickOnRepayLoanForCustomer: function(customerAccount){
        link = "/teller/customers/detail/" + customerAccount + "/transaction/loan?transactionType=PPAY";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.elementToBeClickable(a), 3000);
        a.click();
        browser.wait(EC.visibilityOf($("fims-teller-transaction-form")), 2000);
    },
    selectAccountToBeOpened: function(accountIdentifier){
        browser.wait(EC.elementToBeClickable(accountSelect), 3000);
        accountSelect.click();
        browser.wait(EC.elementToBeClickable($(".mat-option")), 5000);
        browser.executeScript("arguments[0].scrollIntoView();", element(by.cssContainingText('.mat-option', accountIdentifier)).getWebElement());
        element(by.cssContainingText('.mat-option', accountIdentifier)).click();
    },
    enterTextIntoAmountInputField: function(text) {
        browser.wait(EC.elementToBeClickable(amountInput), 5000);
        amountInput.click().sendKeys(text);
    },
    clickEnabledCreateTransactionButton: function(){
        browser.wait(EC.visibilityOf(primaryButton.first()), 5000);
        expect(primaryButton.first().isEnabled()).toBeTruthy();
        primaryButton.first().click();
    },
    clickEnabledConfirmTransactionButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(1).getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.get(1)), 5000);
        expect(primaryButton.get(1).isEnabled()).toBeTruthy();
        browser.wait(EC.elementToBeClickable(primaryButton.get(1)), 5000);
        primaryButton.get(1).click();
    },
    verifyChargesPayedInCashCheckboxChecked: function(){
        classCB = checkboxChargesInCash.getAttribute("class");
        expect(classCB).toMatch("mat-checkbox-checked");
    },
    verifyChargesPayedInCashCheckboxNotChecked: function(){
        classCB = checkboxChargesInCash.getAttribute("class");
        expect(classCB).not.toMatch("mat-checkbox-checked");
    },

};