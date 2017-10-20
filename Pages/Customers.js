//Customers.js

//Actions specific to the Customers section

var Common = require('./Common.js');
var EC = protractor.ExpectedConditions;

//create customer
var accountInput = $(".mat-input-infix input[placeholder='Account']");
var firstNameInput = $("fims-text-input[controlname='firstName'] input");
var middleNameInput = $("fims-text-input[controlname='middleName'] input");
var lastNameInput = $("fims-text-input[controlname='lastName'] input");
var birthDayInput = $("#dayOfBirth");
var memberCheckbox = $("mat-checkbox[formcontrolname='member']");
var streetInput = $("fims-text-input[controlname='street'] input");
var cityInput = $("fims-text-input[controlname='city'] input");
var countrySelect = $("input[formcontrolname='country']");
var emailInput = $("fims-text-input[controlname='email'] input");
var phoneInput = $("fims-text-input[controlname='phone'] input");
var mobileInput = $("fims-text-input[controlname='mobile'] input");

//create deposit account
var productSelect = $("mat-select[formcontrolname='productIdentifier'] .mat-select-trigger");
var beneficiaryInput = $("td-chips[formcontrolname='beneficiaries'] input");

//create loan account
var shortNameInput = $("fims-id-input[controlname='identifier'] input");

//identification cards
var identificationCardNumberInput = $("fims-id-input[controlname='number'] input");
var typeInput = $("input[formcontrolname='type']");
var expirationDateInput = $("input[formcontrolname='expirationDate']");
var issuerInput = $("input[formcontrolname='issuer']");

//tasks
var identifierInput = $("fims-id-input[controlname='identifier'] input");
var nameInput = $("fims-text-input[controlname='name'] input");
var descriptionInput = $("textarea[formcontrolname='identifier']");
var radioButtonFourEyes = $$("mat-radio-group[formcontrolname='type'] mat-radio-button").get(1);
var radioButtonCustom = $$("mat-radio-group[formcontrolname='type'] mat-radio-button").get(2);
var radioButtonIdentificationCard = $$("mat-radio-group[formcontrolname='type'] mat-radio-button").get(0);
var checkboxMandatory = $("mat-checkbox[formcontrolname='mandatory']");
var checkboxAutoAssign = $("mat-checkbox[formcontrolname='predefined']");

//general elements
var linkCustomers = $$("a[href='/customers']");
var primaryButton =  $$(".mat-raised-button.mat-primary");
var continueButton = $$(".mat-raised-button.mat-accent");

module.exports = {
    createNewMember: function (customerAccount, firstName, lastName, dayOfBirth, street, city, country ) {
        this.clickButtonOrLinkCreateNewMember();
        Common.verifyCardHasTitle("Create new member");
        this.enterTextIntoAccountInputField(customerAccount);
        this.enterTextIntoFirstNameInputField(firstName);
        this.enterTextIntoLastNameInputField(lastName);
        this.enterTextIntoDayOfBirthInputField(dayOfBirth);
        this.clickEnabledContinueButtonForMemberDetails();
        this.enterTextIntoStreetInputField(street);
        this.enterTextIntoCityInputField(city);
        this.selectCountryByName(country);
        this.clickEnabledContinueButtonForMemberAddress();
        this.clickEnabledCreateMemberButton();
        Common.verifyMessagePopupIsDisplayed("Member is going to be saved");
        Common.verifyCardHasTitle("Manage members");
    },
    enterTextIntoAccountInputField: function (text) {
        browser.wait(EC.visibilityOf(accountInput), 3000);
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
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable(streetInput), 5000);
        streetInput.clear().click().sendKeys(text);
    },
    enterTextIntoCityInputField: function (text) {
        cityInput.click().sendKeys(text);
    },
    enterTextIntoEmailInputField: function (text) {
        browser.wait(EC.elementToBeClickable(emailInput), 5000);
        emailInput.click().sendKeys(text);
    },
    enterTextIntoPhoneInputField: function (text) {
        phoneInput.click().sendKeys(text);
    },
    enterTextIntoMobileInputField: function (text) {
        mobileInput.click().sendKeys(text);
    },
    clickEnabledContinueButtonForMemberDetails: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(0)), 5000);
        expect(continueButton.get(0).isEnabled()).toBeTruthy();
        continueButton.get(0).click();
    },
    clickEnabledContinueButtonForMemberAddress: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(1)), 5000);
        expect(continueButton.get(1).isEnabled()).toBeTruthy();
        continueButton.get(1).click();
    },
    clickEnabledContinueButtonForMemberContact: function () {
        browser.wait(EC.elementToBeClickable(continueButton.get(2)), 5000);
        expect(continueButton.get(2).isEnabled()).toBeTruthy();
        continueButton.get(2).click();
    },
    clickEnabledCreateMemberButton: function () {
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 5000);
        expect(primaryButton.first().isEnabled()).toBeTruthy();
        browser.wait(EC.elementToBeClickable(primaryButton.first()), 5000);
        primaryButton.first().click();
    },
    clickButtonOrLinkCreateNewMember: function () {
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
    verifyMemberHasStatusInactive: function () {
        browser.wait(EC.visibilityOf($("td-message")), 2000);
        color = $("td-message").getAttribute("color");
        message = $("td-message .td-message-label").getText();
        expect(color).toEqual("warn");
        expect(message).toContain("Member not active");
    },
    clickButtonGoToTasks: function () {
        browser.wait(EC.elementToBeClickable($("td-message button")), 2000);
        $("td-message button").click();
    },
    clickButtonActivate: function () {
        browser.wait(EC.elementToBeClickable($(".mat-raised-button.mat-accent")), 2000);
        $(".mat-raised-button.mat-accent").click();
    },
    verifyMemberHasStatusActive: function () {
        browser.wait(EC.visibilityOf($("fims-state-display")), 2000);
        status = $("fims-state-display .mat-list-text .mat-line").getText();
        expect(status).toEqual("ACTIVE");
    },
    clickManageDepositAccountsForMember: function (customer) {
        link = "/customers/detail/" + customer + "/deposits";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickManageLoanAccountsForMember: function (customer) {
        link = "/customers/detail/" + customer + "/loans";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickViewIdentificationCardsForMember: function (customer) {
        link = "/customers/detail/" + customer + "/identifications";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickTasksForMember: function (customer) {
        link = "/customers/detail/" + customer + "/tasks";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickActivitiesForMember: function (customer) {
        link = "/customers/detail/" + customer + "/activities";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickPayrollForMember: function (customer) {
        link = "/customers/detail/" + customer + "/payroll";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickEditPayrollDistributionForMember: function (customer) {
        link = "/customers/detail/" + customer + "/payroll/edit";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 6000);
        $('a[href="' + link + '"]').click();
    },
    clickCreateDepositAccountForMember: function (customer) {
        link = "/customers/detail/" + customer + "/deposits/create";
        browser.wait(EC.visibilityOf($('a[href="' + link + '"]')));
        $('a[href="' + link + '"]').click();
    },
    clickCreateLoanAccountForMember: function (customer) {
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
        browser.wait(EC.invisibilityOf($("mat-tooltip-component")), 4000);
    },
    selectProductFromOpenList: function (productName) {
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        opt = element(by.cssContainingText('.mat-option', productName));
        browser.executeScript("arguments[0].scrollIntoView();", opt.getWebElement());
        browser.wait(EC.elementToBeClickable(opt), 2000);
        opt.click();
        browser.wait(EC.invisibilityOf($("mat-tooltip-component")), 4000);
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
        browser.sleep(1000);
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
    verifyIsMemberCheckboxSelected: function () {
        expect(memberCheckbox.getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    enterTextIntoShortNameInputField: function (text) {
        browser.wait(EC.elementToBeClickable(shortNameInput), 5000);
        shortNameInput.click().sendKeys(text);
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

    //customer tasks
    goToTasks: function(){
        link = "/customers/tasks";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    clickButtonCreateNewTask: function(){
        link = "/customers/tasks/create";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    clickLinkTasks: function (customer, productIdentifier, accountIdentifier) {
        link = "/customers/detail/" + customer + "/loans/products/" + productIdentifier + "/detail/" + accountIdentifier + "/tasks";
        browser.wait(EC.elementToBeClickable($('a[href="' + link + '"]')), 5000);
        $('a[href="' + link + '"]').click();
    },
    selectExecuteTaskCheckbox: function(){
        browser.wait(EC.visibilityOf($("mat-checkbox[title='Execute task']")), 3000);
        $("mat-checkbox[title='Execute task']").click();
        expect($("mat-checkbox[title='Execute task']").getAttribute("class")).toMatch("mat-checkbox-checked");
    },
    clickButtonForTask: function (action) {
        $$('.mat-raised-button.mat-accent').filter(function (elem, index) {
            return elem.$("span").getText().then(function (text) {
                return text === action;
            });
        }).click();
    },
    goToStepCustomFields: function(){
        browser.sleep(100);
        browser.wait(EC.elementToBeClickable($$(".td-step-label").get(5)), 3000);
        $$(".td-step-label").get(5).click();
    },
    verifyButtonCreateMemberDisabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE MEMBER";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonCreateMemberEnabled: function(){
        expect(primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE MEMBER";
            });
        }).first().isEnabled()).toBe(true);
    },

};
