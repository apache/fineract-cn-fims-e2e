//Customers.js

//Actions specific to the Customers section

var EC = protractor.ExpectedConditions;
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
var productSelect = $("md-select[formcontrolname='productIdentifier'] .mat-select-trigger");
var beneficiaryInput = $("td-chips[formcontrolname='beneficiaries'] input");
var primaryButton =  $$(".mat-raised-button.mat-primary");
var continueButton = $$(".mat-raised-button.mat-accent");
var shortNameInput = $("fims-id-input[controlname='identifier'] input");
var principalAmountInput = $("fims-number-input[controlname='principalAmount'] input");
var termInput = $("input[formcontrolname='term']");
var paymentPeriod = $("input[formcontrolname='paymentPeriod']");
var depositAccountSelect = $("md-select[formcontrolname='depositAccountIdentifier'] .mat-select-trigger");
var dayForMonthlyRepaySelect = $("md-select[formcontrolname='monthSettingDay'] .mat-select-trigger");


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
    enterTextIntoDayOfBirthInputField: function (date) {
        birthDayInput.click().sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys(protractor.Key.ARROW_LEFT);
        birthDayInput.sendKeys(date);
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
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 5000);
        expect(primaryButton.first().isEnabled()).toBeTruthy();
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 5000);
        primaryButton.first().click();
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
        browser.sleep(2000);
        browser.wait(EC.elementToBeClickable(productSelect), 3000);
        productSelect.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', productName));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        browser.wait(EC.invisibilityOf($("md-tooltip-component")), 4000);
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
    verifyStateOfDepositAccountWithIdIs: function (identifier, expectedState) {
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
        browser.wait(EC.elementToBeClickable(shortNameInput), 5000);
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
    clickLinkTasks: function (customer, productIdentifier, accountIdentifier) {
        link = "/customers/detail/" + customer + "/loans/products/" + productIdentifier + "/detail/" + accountIdentifier + "/tasks";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    selectExecuteTaskCheckbox: function(){
        browser.wait(EC.visibilityOf($("md-checkbox[title='Execute task']")), 3000);
        $("md-checkbox[title='Execute task']").click();
        expect($("md-checkbox[title='Execute task']").getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    clickButtonForTask: function (action) {
        $$('.mat-raised-button.mat-accent').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === action;
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
};
