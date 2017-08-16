var helper = require('./helper.js');
var Login = require('./Login.js');
var Employees = require('./Employees.js');
var Common = require('./Common.js');
var Offices = require('./Offices')

describe('Login suite', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomNumber(4,4);


    it('should create a new branch office', function () {
        browser.waitForAngularEnabled(false);
        Common.waitForThePageToFinishLoading();
        Employees.createEmployee(employeeIdentifier, "Kate", "Atkinson", "Admin", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
        Offices.clickViewOfficesFromQuickAccess();
        Offices.clickButtonCreateNewOffice();
        Offices.verifyCardHasTitleCreateOffice();
        Offices.enterTextIntoOfficeIdentifierInputField(officeIdentifier);
        Offices.enterTextIntoOfficeNameInputField("Branch " + officeIdentifier)
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickEnabledCreateOfficeButton();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(officeIdentifier);
        Common.verifyFirstRowOfSearchResultHasTextAsId(officeIdentifier);
        Common.clickLinkShowForFirstRowInTable();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Offices.clickCreateTellerForOfficeByIdentifier(officeIdentifier);
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Offices.enterTextIntoPasswordInputField("qazwsx123!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("1000");
        Offices.enterTextIntoTellerNumberInputField("");
        Offices.enterTextIntoVaultAccountInputField();
        Offices.clickEnabledCreateTellerButton();
    });
    it('should create a new teller for the branch office', function () {

    });
});