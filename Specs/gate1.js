//test round 1 - admin user can execute basic actions (TBD)
//1) User operator creates a new role Administrator with all permissions
//2) User operator creates a new employee with that role
//3) New employee logs in and creates headoffice
//4) New employee creates branch office
//5) New employee creates a teller for the branch office
//6) New employee opens the teller and assigns it to himself
//7) New employee creates a customer
//8) New employee unlocks the teller, views customer and pauses teller again
//9) New employee creates a deposit product
//test 1 and 3 fail if role and headquarter already exist, but other tests should be able to continue

var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');
var Offices = require('../Pages/Offices');
var Roles = require('../Pages/Roles');
var Teller = require('../Pages/Teller');
var Customers = require('../Pages/Customers');
var Deposits = require('../Pages/Deposits');

describe('Gate 1', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);

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
        Common.clickBackButtonInTitleBar();

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

    it('assigned employee should be able to unlock teller and view customer', function () {
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Teller.enterTextIntoSearchInputField(customerAccount);
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Thomas Pynchon");
        //verify only appropriate actions are displayed for pending customer without any accounts (work in progress)
        Common.clickBackButtonInTitleBar();
        Teller.pauseTeller();
    });
    it('should create a deposit account - Checking', function () {
        Deposits.goToDepositsViaSidePanel();
        Deposits.verifyCardHasTitle("Manage deposit products");
        Deposits.clickButtonCreateDepositAccount();
        Deposits.verifyCardHasTitle("Create new deposit product");
        Deposits.enterTextIntoShortNameInputField(depositIdentifier);
        Deposits.verifyRadioCheckingIsSelected();
        Deposits.enterTextIntoNameInputField("My first deposit product");
        Deposits.enterTextIntoMinimumBalanceInputField("100");
        Deposits.verifyRadioAnnuallyIsSelected();
        Deposits.verifyCheckboxFlexibleInterestNotChecked();
        Deposits.enterTextIntoInterestInputField('0.05');
        Deposits.verifyFixedTermToggleSetToOff();
        Deposits.verifyTermPeriodInputFieldIsDisabled();
        Deposits.verifyRadioButtonsMonthAndYearDisabled();
        Deposits.toggleFixedTermToOn();
        Deposits.verifyTermPeriodInputFieldIsEnabled();
        Deposits.verifyRadioButtonsMonthAndYearEnabled();
        Deposits.toggleFixedTermToOff();

    });
});