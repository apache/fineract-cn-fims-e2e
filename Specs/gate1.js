//test round 1 - admin user can execute basic actions (TBD)
//test 1 and 3 fail if role and headquarter already exist, but other tests should be able to continue

var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');
var Offices = require('../Pages/Offices');
var Roles = require('../Pages/Roles');
var Teller = require('../Pages/Teller');
var Customers = require('../Pages/Customers');

describe('Gate 1', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);

    it('should create a new administrator role', function () {
        Common.waitForThePageToFinishLoading();
        Roles.clickCreateNewRoleFromQuickAccess();
        Roles.enterTextIntoRoleIdentifierInput("Administrator");
        Roles.verifyCardHasTitleCreateRole();
        Roles.selectCheckboxToGiveUserAllPermissions();
        Roles.clickEnabledSaveRoleButton();

        //to work around current bug that side panel is hidden initially
        $(".mat-toolbar-row .mat-icon-button").click();

        Roles.verifyCardHasTitleManageRoles();
    });
    it('should create a new employee with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Kate", "Atkinson", "Administrator", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
    });
    it('should create a headquarter office', function () {
        Offices.clickViewOfficesFromQuickAccess();
        Offices.verifyNoHeadquarterExistingYet();
        Offices.clickButtonCreateHeadquarter();
        Offices.verifyCardHasTitleCreateOffice();
        Offices.enterTextIntoOfficeIdentifierInputField("hqo1");
        Offices.enterTextIntoOfficeNameInputField("Headquarter Office Playground");
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickEnabledCreateOfficeButton();
    });
    it('should create a new branch office', function () {
        Offices.clickButtonCreateNewOffice();
        Offices.verifyCardHasTitleCreateOffice();
        Offices.enterTextIntoOfficeIdentifierInputField(officeIdentifier);
        Offices.enterTextIntoOfficeNameInputField("Branch " + officeIdentifier);
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickEnabledCreateOfficeButton();
        //Offices.verifyCardHasTitle();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(officeIdentifier);
        Common.verifyFirstRowOfSearchResultHasTextAsId(officeIdentifier);
    });
    it('should create a new teller for the branch office', function () {
        Common.clickLinkShowForFirstRowInTable();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Offices.clickCreateTellerForOfficeByIdentifier(officeIdentifier);
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Offices.enterTextIntoPasswordInputField("qazwsx123!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("1000");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry("7352");
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry("7351");
        Offices.clickEnabledCreateTellerButton();

        //workaround for current bug that teller is not always listed immediately
        browser.wait(EC.visibilityOf($$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2)), 5000);
        $$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2).click();

        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        //Offices.verifyTellerStatusIs("CLOSED");
        Common.clickLinkShowForFirstRowInTable();
    });
    it('should open the teller and assign it to an employee', function () {
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier, officeIdentifier);
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier);
        Offices.selectOptionInListByName("Atkinson, Kate");
        Offices.clickEnabledOpenTellerButton();
        Offices.verifyTellerStatusIs("OPEN");
    });
    it('should be able to create customer', function () {

        //to work around current bug that side panel is hidden initially
        $(".mat-toolbar-row .mat-icon-button").click();

        Customers.goToManageCustomersViaSidePanel();
        Customers.verifyCardHasTitleManageCustomers();
        Customers.clickButtonOrLinkCreateNewCustomer();
        Customers.verifyCardHasTitleCreateCustomer();
        Customers.enterTextIntoAccountInputField(customerAccount);
        Customers.enterTextIntoFirstNameInputField("Thomas");
        Customers.enterTextIntoLastNameInputField("Pynchon");
        Customers.enterTextIntoDayOfBirthInputField("09/21/1978");
        browser.pause();
        //Customers.verifyMemberCheckboxIsChecked();
        Customers.clickEnabledContinueButtonForCustomerDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForCustomerAddress();
        Customers.clickEnabledContinueButtonForCustomerContact();

        Customers.clickEnabledCreateCustomerButton();
        Customers.verifyCardHasTitleManageCustomers();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
    });

        it('assigned employee should be able to unlock teller', function () {
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Teller.enterTextIntoSearchInputField("Pynchon");
    });
});