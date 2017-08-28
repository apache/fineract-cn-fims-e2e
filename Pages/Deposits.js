//Deposits.js

//Actions specific to the Deposit Account Management section

var EC = protractor.ExpectedConditions;
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var createDeposit = $("a[href='/deposits/create']");
var radioGroupType = $("md-radio-group[formcontrolname='type']")
var radioChecking = $$("md-radio-group md-radio-button").get(0);
var radioSavings = $$("md-radio-group md-radio-button").get(1);
var radioShare = $$("md-radio-group md-radio-button").get(2);
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $(".mat-input-infix input[formcontrolname='name']");
var descriptionInput = $(".mat-input-infix input[formcontrolname='description']");
var minimumBalanceInput = $("fims-number-input[controlname='minimumBalance'] input");
var currencySelect = $("md-select[formcontrolname='currencyCode']");
var radioGroupInterest = $("md-radio-group[formcontrolname='termInterestPayable']");
var radioMaturity = radioGroupInterest.$$("md-radio-button").get(0);
var radioAnnually = radioGroupInterest.$$("md-radio-button").get(1);
var radioQuarterly = radioGroupInterest.$$("md-radio-button").get(2);
var radioMonthly = radioGroupInterest.$$("md-radio-button").get(3);
var checkboxFlexibleInterest = $("md-checkbox[formcontrolname='flexible']")
var interestInput = $("fims-number-input[controlname='interest'] input");
var termPeriodInput = $(".mat-input-infix input[formcontrolname='termPeriod']");
var fixedTermEnabledToggle = $("md-slide-toggle[formcontrolname='fixedTermEnabled']");
var termTimeUnit = $("md-radio-group[formcontrolname='termTimeUnit']");
var radioMonth = termTimeUnit.$$("md-radio-button").get(0);
var radioYear = termTimeUnit.$$("md-radio-button").get(1);

var cashAccountInput = $("fims-account-select[formcontrolname='cashAccountIdentifier'] input");
var expenseAccountInput = $("fims-account-select[formcontrolname='expenseAccountIdentifier'] input");
var accrueAccountInput = $("fims-account-select[formcontrolname='accrueAccountIdentifier'] input");
var equityLedgerInput = $("fims-ledger-select[formcontrolname='equityLedgerIdentifier'] input");

var chargeNameInput1 = $$("fims-deposit-product-charges-form input[formcontrolname='name']").get(0);
var chargeNameInput2 = $$("fims-deposit-product-charges-form input[formcontrolname='name']").get(1);
var chargeDescriptionInput = $("input[formcontrolname='description']");
var chargeAmountInput1 = $$("fims-number-input[controlname='amount'] input").get(0);
var chargeAmountInput2 = $$("fims-number-input[controlname='amount'] input").get(1);
var chargeTypeSelect1 = $$("md-select[formcontrolname='actionIdentifier']").get(0);
var chargeTypeSelect2 = $$("md-select[formcontrolname='actionIdentifier']").get(1);
var incomeAccountInput1 = $$("fims-account-select[formcontrolname='incomeAccountIdentifier'] input").get(0);
var incomeAccountInput2 = $$("fims-account-select[formcontrolname='incomeAccountIdentifier'] input").get(1);
var checkboxProportional1 = $$("md-checkbox[formcontrolname='proportional']").get(0);
var checkboxProportional2 = $$("md-checkbox[formcontrolname='proportional'] label").get(1);
var primaryButton = $$(".mat-raised-button.mat-primary");

module.exports = {
    goToDepositsViaSidePanel: function() {
        $("a[href='/deposits']").click();
    },
    verifyCardHasTitle: function(text) {
        browser.wait(EC.textToBePresentInElement(titleRow, text), 5000);
    },
    clickButtonCreateDepositAccount: function(){
        browser.wait(EC.visibilityOf(createDeposit), 5000);
        createDeposit.click();
    },
    clickButtonEditDepositProduct: function(identifier){
        link = "/deposits/detail/" + identifier + "/edit";
        browser.wait(EC.visibilityOf($('a[href="'+ link + '"]')));
        $('a[href="'+ link + '"]').click();
    },
    verifyRadioCheckingIsSelected: function(element){
        expect(radioChecking.getAttribute('class')).toMatch('mat-radio-checked')
    },
    verifyRadioSavingsIsSelected: function(element){
        expect(radioSavings.getAttribute('class')).toMatch('mat-radio-checked')
    },
    verifyRadioShareIsSelected: function(element){
        expect(radioShare.getAttribute('class')).toMatch('mat-radio-checked')
    },
    selectRadioButtonSavings: function(){
        radioSavings.click();
    },
    selectRadioButtonShare: function(){
        radioShare.click();
    },
    selectRadioButtonChecking: function(){
        radioChecking.click();
    },
    enterTextIntoShortNameInputField: function(text) {
        browser.wait(EC.visibilityOf(shortNameInput), 5000);
        shortNameInput.click().sendKeys(text);
    },
    verifyShortNameInputFieldHasText: function(text) {
        browser.wait(EC.visibilityOf(shortNameInput), 5000);
        expect(shortNameInput.getAttribute("value")).toEqual(text);
    },
    enterTextIntoNameInputField: function(text) {
        nameInput.click().sendKeys(text);
    },
    enterTextIntoDescriptionInputField: function(text) {
        descriptionInput.click().sendKeys(text);
    },
    enterTextIntoMinimumBalanceInputField: function(text) {
        minimumBalanceInput.click().clear().sendKeys(text);
    },
    verifyRadioAnnuallyIsSelected: function(){
        expect(radioAnnually.getAttribute('class')).toMatch('mat-radio-checked');
    },
    verifyCheckboxFlexibleInterestNotChecked: function(){
       //expect(checkboxFlexibleInterest.getAttribute('class')).toNotMatch('mat-checkbox-checked');
        browser.wait(EC.not(EC.elementToBeSelected(checkboxFlexibleInterest)), 3000);
    },
    enterTextIntoInterestInputField: function(text) {
        interestInput.click().clear().sendKeys(text);
    },
    verifyInterestInputFieldHasText: function(text) {
        browser.wait(EC.visibilityOf(interestInput), 5000);
        expect(interestInput.getAttribute("value")).toEqual(text);
    },
    verifyInterestInputFieldIsDisabled: function() {
        browser.wait(EC.visibilityOf(interestInput), 5000);
        expect(interestInput.isEnabled()).toBe(false);
    },
    enterTextIntoTermPeriodInputField: function(text) {
        termPeriodInput.click().sendKeys(text);
    },
    verifyFixedTermToggleSetToOff: function(){
        toggleClass = fixedTermEnabledToggle.getAttribute('class');
        expect(toggleClass).not.toContain("mat-checked");
    },
    verifyFixedTermToggleSetToOn: function(){
        toggleClass = fixedTermEnabledToggle.getAttribute('class');
        expect(toggleClass).toContain("mat-checked");
    },
    toggleFixedTermToOn: function() {
        this.verifyFixedTermToggleSetToOff();
        $(".mat-slide-toggle-content").click();
        this.verifyFixedTermToggleSetToOn();
    },
    toggleFixedTermToOff: function() {
        this.verifyFixedTermToggleSetToOn();
        $(".mat-slide-toggle-content").click();
        this.verifyFixedTermToggleSetToOff();
    },
    verifyTermPeriodInputFieldIsDisabled: function(){
        expect(termPeriodInput.isEnabled()).toBe(false);
    },
    verifyTermPeriodInputFieldIsEnabled: function(){
        expect(termPeriodInput.isEnabled()).toBe(true);
    },
    verifyRadioButtonsMonthAndYearDisabled: function() {
        expect(termTimeUnit.$$("md-radio-button input").get(0).isEnabled()).toBe(false);
        expect(termTimeUnit.$$("md-radio-button input").get(1).isEnabled()).toBe(false);
    },
    verifyRadioButtonsMonthAndYearEnabled: function() {
        expect(termTimeUnit.$$("md-radio-button input").get(0).isEnabled()).toBe(true);
        expect(termTimeUnit.$$("md-radio-button input").get(1).isEnabled()).toBe(true);
    },
    selectRadioButtonMonth: function(){
        browser.executeScript("arguments[0].scrollIntoView();", radioMonth.getWebElement());
        radioMonth.click();
    },
    selectRadioButtonYear: function(){
        browser.executeScript("arguments[0].scrollIntoView();", radioYear.getWebElement());
        radioYear.click();
    },
    enterTextIntoCashAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", cashAccountInput.getWebElement());
        cashAccountInput.click().sendKeys(text);
    },
    enterTextIntoExpenseAccountInputField: function(text) {
        expenseAccountInput.click().sendKeys(text);
    },
    enterTextIntoAccrueAccountInputField: function(text) {
        accrueAccountInput.click().sendKeys(text);
    },
    enterTextIntoEquityLedgerInputField: function(text) {
        equityLedgerInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForProductDetails: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$(".mat-raised-button").get(0).getWebElement());
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
    },
    enterTextIntoChargeNameInputField: function(text) {
        chargeNameInput1.click().sendKeys(text);
    },
    clickButtonAddCharge: function(){
        browser.wait(EC.elementToBeClickable($("fims-deposit-product-charges-form button")), 2000);
        $("fims-deposit-product-charges-form button").click();
    },
    clickButtonAddChargeIfThereAlreadyIsACharge: function(){
        browser.executeScript("arguments[0].scrollIntoView();", $$("fims-deposit-product-charges-form button").get(1).getWebElement());
        browser.wait(EC.elementToBeClickable($$("fims-deposit-product-charges-form button").get(1)), 2000);
        $$("fims-deposit-product-charges-form button").get(1).click();
    },
    enterTextIntoSecondChargeNameInputField: function(text) {
        browser.wait(EC.visibilityOf(chargeNameInput2));
        chargeNameInput2.click().sendKeys(text);
    },
    enterTextIntoChargeDescriptionInputField: function(text) {
        chargeDescriptionInput.click().sendKeys(text);
    },
    enterTextIntoChargeAmountInputField: function(text) {
        chargeAmountInput1.click().clear().sendKeys(text);
    },
    enterTextIntoSecondChargeAmountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", chargeAmountInput2.getWebElement());
        chargeAmountInput2.click().clear().sendKeys(text);
    },
    selectTypeOfCharge: function(text) {
        chargeTypeSelect1.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', text)).click();
    },
    selectTypeOfSecondCharge: function(text) {
        chargeTypeSelect2.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option', text)).click();
    },
    enterTextIntoIncomeAccountInputField: function(text) {
        incomeAccountInput1.click().sendKeys(text);
    },
    enterTextIntoSecondIncomeAccountInputField: function(text) {
        browser.executeScript("arguments[0].scrollIntoView();", incomeAccountInput2.getWebElement());
        incomeAccountInput2.click().sendKeys(text);
    },
    selectCheckboxProportional: function(){
        checkboxProportional1.click();
    },
    selectSecondCheckboxProportional: function(){
        checkboxProportional2.click();
    },
    clickEnabledContinueButtonForProductDetails: function(){
        browser.wait(EC.elementToBeClickable($$(".mat-raised-button").get(0)), 5000);
        expect($$(".mat-raised-button").get(0).isEnabled()).toBeTruthy();
        $$(".mat-raised-button").get(0).click();
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
    clickEnabledUpdateProductButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE PRODUCT";
            });
        }).click();
    },
    clickButtonEnableProduct: function(){
        browser.wait(EC.elementToBeClickable($("td-message button")), 2000);
        $("td-message button").click();
    },
    verifyProductHasStatusDisabled: function(){
        browser.wait(EC.visibilityOf($("td-message")), 2000);
        color = $("td-message").getAttribute("color");
        message = $("td-message .td-message-label").getText();
        expect(color).toEqual("warn");
        expect(message).toContain("Product not enabled");
    },
    verifyProductHasStatusEnabled: function(){
        browser.wait(EC.textToBePresentInElement($("td-message .td-message-label"), "Product enabled"), 2000);
        color = $("td-message").getAttribute("color");
        expect(color).toEqual("accent");
    }
};