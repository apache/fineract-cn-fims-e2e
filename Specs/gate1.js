//test round 1 - admin user can execute basic actions (TBD)
//1) User operator creates a new role Administrator with all permissions
//2) User operator creates a new employee with that role
//3) New employee logs in and creates headoffice
//4) New employee creates branch office
//5) New employee creates a teller for the branch office
//6) New employee opens the teller and assigns it to himself
//7) New employee creates a customer
//8) New employee activates the customer
//9) New employee unlocks the teller, views customer and pauses teller again
//10) New employee creates a deposit product
//11) New employee enables deposit product
//12) New employee assigns deposit product to customer
//13) New employee opens account in teller and verifies the account is now active
//14) New employee verifies transaction have been booked as expected (accounting)

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
var Accounting = require('../Pages/Accounting');

describe('Gate 1', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);
    depositName = helper.getRandomString(8);
    tellerAccount = helper.getRandomString(4);
    revenueAccount = helper.getRandomString(4);

    it('should create a new administrator role', function () {
        Common.waitForThePageToFinishLoading();
        Roles.clickCreateNewRoleFromQuickAccess();
        Roles.enterTextIntoRoleIdentifierInput("Administrator");
        Roles.verifyCardHasTitleCreateRole();
        Roles.selectCheckboxToGiveUserAllPermissions();
        Roles.clickEnabledSaveRoleButton();
        Common.verifyMessagePopupIsDisplayed("Role is going to be saved");
        Roles.verifyCardHasTitleManageRoles();
    });
    it('should create a new employee with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Kate", "Atkinson", "Administrator", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
    });
    it('should create new accounts', function () {
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Accounting.clickCreateNewAccountInLedger("7300");
        //Accounting.verifyAccountTypeAssetSelected();
        //Accounting.verifyRadioGroupAccountTypesDisabled();
        Accounting.enterTextIntoAccountIdentifierInputField(tellerAccount);
        Accounting.enterTextIntoAccountNameInputField("My teller");
        Accounting.clickEnabledButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("1000");
        Common.clickLinkShowForRowWithId("1100");
        Accounting.clickCreateNewAccountInLedger("1100");
        Accounting.enterTextIntoAccountIdentifierInputField(revenueAccount);
        Accounting.enterTextIntoAccountNameInputField("Revenue from deposit charges");
        Accounting.clickEnabledButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
    });
    it('should create a headquarter office', function () {
        Offices.goToManageOfficesViaSidePanel();
        Offices.verifyNoHeadquarterExistingYet();
        Offices.clickButtonCreateHeadquarter();
        Offices.verifyCardHasTitleCreateOffice();
        Offices.enterTextIntoOfficeIdentifierInputField("hqo1");
        Offices.enterTextIntoOfficeNameInputField("Headquarter Office Playground");
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickEnabledCreateOfficeButton();
        Common.verifyMessagePopupIsDisplayed("Office is going to be saved");
    });
    it('should create a new branch office', function () {
        Offices.clickButtonCreateNewOffice();
        Offices.verifyCardHasTitleCreateOffice();
        Offices.enterTextIntoOfficeIdentifierInputField(officeIdentifier);
        Offices.enterTextIntoOfficeNameInputField("Branch " + officeIdentifier);
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickEnabledCreateOfficeButton();
        Common.verifyMessagePopupIsDisplayed("Office is going to be saved");
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
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry(tellerAccount);
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry("7351");
        Offices.clickEnabledCreateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
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
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("OPEN");
    });
    it('should be able to create customer', function () {
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
        //Customers.clickEnabledContinueButtonForCustomerContact();
        Customers.clickEnabledCreateCustomerButton();
        Common.verifyMessagePopupIsDisplayed("Customer is going to be saved")
        Customers.verifyCardHasTitleManageCustomers();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
    });
    it('should activate the customer', function () {
        Common.clickLinkShowForFirstRowInTable();
        Customers.verifyCustomerHasStatusInactive();
        Customers.clickButtonGoToTasks();
        Customers.clickButtonActivate();
        Common.verifyMessagePopupIsDisplayed("Command is going to be executed");
        Customers.verifyCustomerHasStatusActive();
    });
    it('assigned employee should be able to unlock teller and view customer', function () {
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Teller.enterTextIntoSearchInputField(customerAccount);
        //will be successful even if the customer does not exist, clicks one of the buttons too quickly: need to fix
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Thomas Pynchon");
        //verify only appropriate actions are displayed for pending customer without any accounts (work in progress)
        Common.clickBackButtonInTitleBar();
        Teller.pauseTeller();
        Common.verifyMessagePopupIsDisplayed("Teller drawer is now locked");
        Teller.verifyTellerIsLocked();
    });
    it('should create a deposit account - Checking with charges', function () {
        Deposits.goToDepositsViaSidePanel();
        Deposits.verifyCardHasTitle("Manage deposit products");
        Deposits.clickButtonCreateDepositAccount();
        Deposits.verifyCardHasTitle("Create new deposit product");
        Deposits.enterTextIntoShortNameInputField(depositIdentifier);
        Deposits.verifyRadioCheckingIsSelected();
        Deposits.enterTextIntoNameInputField(depositName);
        Deposits.enterTextIntoMinimumBalanceInputField("100");
        Deposits.verifyRadioAnnuallyIsSelected();
        Deposits.verifyCheckboxFlexibleInterestNotChecked();
        Deposits.enterTextIntoInterestInputField("0.05");
        Deposits.verifyFixedTermToggleSetToOff();
        Deposits.verifyTermPeriodInputFieldIsDisabled();
        Deposits.verifyRadioButtonsMonthAndYearDisabled();
        Deposits.toggleFixedTermToOn();
        Deposits.verifyTermPeriodInputFieldIsEnabled();
        Deposits.verifyRadioButtonsMonthAndYearEnabled();
        Deposits.selectRadioButtonYear();
        Deposits.enterTextIntoCashAccountInputField("7352");
        Deposits.enterTextIntoExpenseAccountInputField("2820");
        Deposits.enterTextIntoAccrueAccountInputField("8202");
        Deposits.enterTextIntoEquityLedgerInputField("9100");
        Deposits.enterTextIntoTermPeriodInputField("5");
        Deposits.selectRadioButtonYear();
        Deposits.clickEnabledContinueButtonForProductDetails();
        Deposits.clickButtonAddCharge();
        Deposits.enterTextIntoChargeNameInputField("Account opening charge");
        Deposits.enterTextIntoIncomeAccountInputField(revenueAccount);
        Deposits.enterTextIntoChargeAmountInputField("5");
        Deposits.selectTypeOfCharge("Account Opening");
        Deposits.clickEnabledCreateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
        Deposits.verifyCardHasTitle("Manage deposit products");
    });
    it('should enable deposit product', function () {
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Deposits.verifyProductHasStatusDisabled();
        Deposits.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be updated");
        Deposits.verifyProductHasStatusEnabled();
    });
    it('should assign deposit product to customer', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageDepositAccountsForCustomer(customerAccount);
        Customers.clickCreateDepositAccountForCustomer(customerAccount);
        Customers.selectDepositProduct(depositName);
        Customers.clickEnabledButtonCreateDepositAccount();
        Common.verifyMessagePopupIsDisplayed("Deposit account is going to be saved");

        //might not be in list immediately always
        Common.clickBackButtonInTitleBar();
        Customers.clickManageDepositAccountsForCustomer(customerAccount);
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Customers.verifyDepositAccountHasStatus("PENDING");
        Customers.verifyDepositAccountBalanceIs("0.00");
    });
    it('should be able to open account', function () {
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller drawer unlocked");
        Teller.enterTextIntoSearchInputField(customerAccount);
        //will be successful even if the customer does not exist, clicks one of the buttons too quickly: need to fix
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Thomas Pynchon");
        Teller.clickOnOpenAccountForCustomer(customerAccount);
        Teller.verifyCardTitleIs("Teller transaction");
        Teller.selectAccountToBeOpened(customerAccount + ".9100.00001");
        Teller.enterTextIntoAmountInputField("100");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("100");
        Teller.verifyTransactionCharge("Account opening charge", "5");
        Teller.verifyChargesPayedInCashCheckboxChecked();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //verify account is active and balance is as expected
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageDepositAccountsForCustomer(customerAccount);
        //test might be too fast, account still PENDING here and balance 0.00 (but on leaving and coming back, everything as expected)
        Customers.verifyStateOfDepositAccountWithIdIs(depositIdentifier, "ACTIVE");
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Customers.verifyDepositAccountHasStatus("ACTIVE");
        Customers.verifyDepositAccountBalanceIs("100.00");
    });
    it('transaction should have been booked as expected', function () {
        Accounting.goToAccountingViaSidePanel();
        //verify balance on customer's account is as expected
        Common.clickLinkShowForRowWithId("9000");
        Common.clickLinkShowForRowWithId("9100");
        Accounting.clickLinkShowForAccountWithName(depositName);
        Accounting.verifyAccountStatus("OPEN");
        Accounting.verifyAccountInfo("Balance", "100");
        Accounting.verifyAccountInfo("Type", "EQUITY");
        Accounting.viewAccountEntriesForAccount(customerAccount + ".9100.00001");
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionMessageForRow("ACCO", 1);
        Accounting.verifyTransactionAmountForRow("100", 1);
        Accounting.verifyTransactionBalanceForRow("100", 1);
        //teller account - opening amount + charge have been booked as expected
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Common.clickLinkShowForRowWithId(tellerAccount);
        Accounting.verifyAccountStatus("OPEN");
        Accounting.verifyAccountInfo("Balance", "105");
        Accounting.verifyAccountInfo("Type", "ASSET");
        Accounting.viewAccountEntriesForAccount(tellerAccount);
        Accounting.verifyTransactionTypeForRow("DEBIT", 1);
        Accounting.verifyTransactionMessageForRow("ACCO", 1);
        Accounting.verifyTransactionAmountForRow("105", 1);
        Accounting.verifyTransactionBalanceForRow("105", 1);
        //revenue account - check charges have been booked as expected
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("1000");
        Common.clickLinkShowForRowWithId("1100");
        Common.clickLinkShowForRowWithId(revenueAccount);
        Accounting.verifyAccountStatus("OPEN");
        Accounting.verifyAccountInfo("Balance", "5");
        Accounting.verifyAccountInfo("Type", "REVENUE");
        Accounting.viewAccountEntriesForAccount(revenueAccount);
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionMessageForRow("ACCO", 1);
        Accounting.verifyTransactionAmountForRow("5", 1);
        Accounting.verifyTransactionBalanceForRow("5", 1);
    });
});