//Customers.js

//Actions specific to the Customers section

var EC = protractor.ExpectedConditions;

//customer creation
var accountInput = $(".mat-input-infix input[placeholder='Account']");
var firstNameInput = $(".mat-input-infix input[formcontrolname='firstName']");
var middleNameInput = $(".mat-input-infix input[formcontrolname='middleName']");
var lastNameInput = $(".mat-input-infix input[formcontrolname='lastName']");
var birthDayInput = $(".mat-input-infix input[formcontrolname='dayOfBirth']");
var memberCheckbox = $("md-checkbox[formcontrolname='member']");
var streetInput = $(".mat-input-infix input[formcontrolname='street']");
var cityInput = $(".mat-input-infix input[formcontrolname='city']");
var countrySelect = $(".mat-input-infix input[formcontrolname='country']");
var emailInput = $(".mat-input-infix input[formcontrolname='email']");
var phoneInput = $(".mat-input-infix input[formcontrolname='phone']");
var mobileInput = $(".mat-input-infix input[formcontrolname='mobile']");
var linkCustomers = $$("a[href='/customers']");
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");

//deposit account assignment
var productSelect = $("md-select[formcontrolname='productIdentifier']");
var beneficiaryInput = $("td-chips[formcontrolname='beneficiaries'] input");
var primaryButton =  $$(".mat-raised-button.mat-primary");
var continueButton = $$(".mat-raised-button.mat-accent");

//loan account assignment
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var principalAmountInput = $("fims-number-input[controlname='principalAmount'] input");
var interestRateInput = $("fims-number-input[controlname='interest'] input");
var termInput = $("input[formcontrolname='term']");
var paymentPeriod = $("input[formcontrolname='paymentPeriod']");
//day 1.-30.
var dayForMonthlyPaymentSelect = $("md-select[formcontrolname='monthSettingDay']");
//first, second, third, last
var dayForMonthlyPaymentSelect2 = $$("md-select[formcontrolname='monthSettingDay']").get(1);
// Monday, Tuesday, ...
var weekdaySelect = $("md-select[formcontrolname='monthSettingDayInWeek']");
var depositAccountSelect = $("md-select[formcontrolname='depositAccountIdentifier'] .mat-select-trigger");

//tasks
var checkboxExecuteTask = $("md-checkbox[title='Execute task']");


module.exports = {
    verifyCardHasTitleManageCustomers: function () {
        browser.wait(EC.textToBePresentInElement(titleRow, 'Manage customers'), 5000);
    },
    verifyCardHasTitleCreateCustomer: function () {
        form_title = $("fims-layout-card-over .mat-toolbar-row div").getText();
        expect(form_title).toEqual("Create new customer");
    },
    enterTextIntoAccountInputField: function (text) {
        accountInput.click().sendKeys(text);
    },
    enterTextIntoFirstNameInputField: function (text) {
        firstNameInput.click().sendKeys(text);
    },
    enterTextIntoMiddleNameInputField: function (text) {
        middleNameInput.click().sendKeys(text);
    },
    enterTextIntoLastNameInputField: function (text) {
        lastNameInput.click().sendKeys(text);
    },
    enterTextIntoDayOfBirthInputField: function () {
        birthDayInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys("991978");

    },
    enterTextIntoStreetInputField: function (text) {
        browser.wait(EC.elementToBeClickable(streetInput), 3000);
        streetInput.click().sendKeys(text);
    },
    enterTextIntoCityInputField: function (text) {
        cityInput.click().sendKeys(text);
    },
    enterTextIntoEmailInputField: function (text) {
        emailInput.click().sendKeys(text);
    },
    enterTextIntoPhoneInputField: function (text) {
        phoneInput.click().sendKeys(text);
    },
    enterTextIntoMobileInputField: function (text) {
        mobileInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForCustomerDetails: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(0)), 5000);
        expect(continueButton.get(0).isEnabled()).toBeTruthy();
        continueButton.get(0).click();
    },
    clickEnabledContinueButtonForCustomerAddress: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(1)), 5000);
        expect(continueButton.get(1).isEnabled()).toBeTruthy();
        continueButton.get(1).click();
    },
    clickEnabledContinueButtonForCustomerContact: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(2)), 5000);
        expect(continueButton.get(2).isEnabled()).toBeTruthy();
        continueButton.get(2).click();
    },
    clickEnabledCreateCustomerButton: function () {
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE CUSTOMER";
            });
        }).click();
    },
    clickButtonOrLinkCreateNewCustomer: function () {
        browser.wait(EC.visibilityOf($("a[href='/customers/create']")), 5000);
        $("a[href='/customers/create']").click();
    },
    selectCountryByIndex: function (i) {
        countrySelect.click();
        element.all(by.css('.mat-option')).get(i).click();
    },
    selectCountryByName: function (name) {
        countrySelect.click();
        element(by.cssContainingText('.mat-option', name)).click();
    },
    goToManageCustomersViaSidePanel: function () {
        browser.wait(EC.visibilityOf(linkCustomers.first()), 5000);
        linkCustomers.first().click();
    },
    clickViewCustomersFromQuickAccess: function () {
        browser.wait(EC.visibilityOf(linkCustomers.get(1)), 5000);
        linkCustomer.get(1).click();
    },
    verifyCustomerHasStatusInactive: function () {
        browser.wait(EC.visibilityOf($("td-message")), 2000);
        color = $("td-message").getAttribute("color");
        message = $("td-message .td-message-label").getText();
        expect(color).toEqual("warn");
        expect(message).toContain("Customer not active");
    },
    clickButtonGoToTasks: function () {
        browser.wait(EC.elementToBeClickable($("td-message button")), 2000);
        $("td-message button").click();
    },
    clickButtonActivate: function () {
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-accent")), 2000);
        $(".mat-raised-button.mat-accent").click();
    },
    verifyCustomerHasStatusActive: function () {
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual("ACTIVE");
    },
    verifyLoanAccountHasStatus: function (expectedStatus) {
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual(expectedStatus);
    },
    clickManageDepositAccountsForCustomer: function (customer) {
        link = "/customers/detail/" + customer + "/deposits";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickManageLoanAccountsForCustomer: function (customer) {
        link = "/customers/detail/" + customer + "/loans";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickCreateDepositAccountForCustomer: function (customer) {
        link = "/customers/detail/" + customer + "/deposits/create";
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')));
        $('a[href="' + link + '"]').click();
    },
    clickCreateLoanAccountForCustomer: function (customer) {
        link = "/customers/detail/" + customer + "/loans/create";
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')));
        $('a[href="' + link + '"]').click();
    },
    selectProduct: function (productName) {
        browser.wait(EC.visibilityOf(productSelect), 2000);
        productSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', productName));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        browser.wait(EC.invisibilityOf($("md-tooltip-component")), 3000);
    },
    clickEnabledButtonCreateDepositAccount: function () {
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    verifyDepositAccountHasStatus: function (expectedStatus) {
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual(expectedStatus);
    },
    clickButtonEditDepositAccount: function (customer, depositAccountIdentifier) {
        link = "/customers/detail/" + customer + "/deposits/detail/" + depositAccountIdentifier + "/edit";
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')), 2000);
        $('a[href="' + link + '"]').click();
    },

    verifyDepositAccountBalanceIs: function (expectedBalance) {
        $$("fims-layout-card-over .mat-list-item .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Balance";
            });
        }).$$("p").first().getText().then(function (text) {
            return text === expectedBalance;
        });
    },
    verifyStateOfDepositAccountWithId: function (identifier, expectedState) {
        browser.wait(EC.visibilityOf($("tbody tr")), 5000);
        //if > page of entries, need to implement way to page in order to find correct row
        actualState = $$('tbody tr').filter(function (elem, index) {
            return elem.$(".td-data-table-cell").getText().then(function (text) {
                return text === identifier;
            });
        }).$$(".td-data-table-cell").get(3).getText();
        expect(actualState).toEqual(expectedState);
    },
    verifyStateOfLoanAccountWithId: function (identifier, expectedState) {
        browser.wait(EC.visibilityOf($("tbody tr")), 5000);
        //if > page of entries, need to implement way to page in order to find correct row
        actualState = $$('tbody tr').filter(function (elem, index) {
            return elem.$(".td-data-table-cell").getText().then(function (text) {
                return text === identifier;
            });
        }).$$(".td-data-table-cell").get(3).getText();
        expect(actualState).toEqual(expectedState);
    },
    verifyIsMemberCheckboxSelected: function () {
        expect(memberCheckbox.getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    enterTextIntoShortNameInputField: function (text) {
        browser.wait(EC.elementToBeClickable(shortNameInput), 3000);
        shortNameInput.click().sendKeys(text);
    },
    enterTextIntoPrincipalAmountInputField: function (text) {
        principalAmountInput.click().sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(protractor.Key.BACK_SPACE);
        principalAmountInput.sendKeys(text);
    },
    enterTextIntoTermInputField: function (text) {
        termInput.click().clear().sendKeys(text);
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
    clickEnabledCreateCustomerLoanButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE CUSTOMER LOAN";
            });
        }).click();
    },
    verifyInterestRateSetTo: function(interestRate){
        expect(interestRateInput.getAttribute("value")).toEqual(interestRate);
    },
    verifyInterestRateCannotBeChanged: function(){
        expect(interestRateInput.isEnabled).toBe(false);
    },
    selectDayForMonthlyRepayment: function(day){
        dayForMonthlyPaymentSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', day));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
    },
    clickLinkTasks: function(){
        browser.wait(EC.elementToBeClickable($("a[ng-reflect-router-link='./tasks']")), 2000);
        $("a[ng-reflect-router-link='./tasks']").click();
    },
    selectCheckboxToExecuteMandatoryTask: function(){
        browser.wait(EC.elementToBeClickable(checkboxExecuteTask), 2000);
        checkboxExecuteTask.click();
        expect(checkboxExecuteTask.getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    verifyCheckboxExecuteTaskIsChecked: function(){
        browser.wait(EC.visibilityOf(checkboxExecuteTask), 2000);
        expect(checkboxExecuteTask.getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    deselectCheckboxToExecuteMandatoryTask: function(){
        expect(checkboxExecuteTask.getAttribute("class")).toMatch("mat-checkbox-checked");
        browser.wait(EC.elementToBeClickable(checkboxExecuteTask), 2000);
        checkboxExecuteTask.click();
    },
    clickButtonForAction: function(action){
        browser.wait(EC.elementToBeClickable(continueButton.first()), 5000);
        continueButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === action;
            });
        }).click();
    },
    clickButtonForTransaction: function(action){
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 3000);
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === action;
            });
        }).click();
    },
    verifyTransactionCharge: function(chargeName, chargeAmount){
        browser.wait(EC.visibilityOf($("fims-case-command-confirmation-form table tbody")), 2000);
        browser.sleep(2000);
        expect($$("fims-case-command-confirmation-form table tbody .td-data-table-row").filter(function(elem, index){
            return elem.$(".td-data-table-cell").getText().then(function(text){
                return text === chargeName;
            });
        }).$$(".td-data-table-cell").last().getText().then(function(text){
            return text === chargeAmount;
        })).toBe(true);
    }
};
