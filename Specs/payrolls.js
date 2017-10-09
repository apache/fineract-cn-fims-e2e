//Prerequisites:
//Role "Administrator" and headquarter office already exist
//No tasks need to be executed in order to activate a customer
//ToDo: Figure out which roles best to use for which kind of actions instead of using employee with "Administrator" role

var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');
var Offices = require('../Pages/Offices');
var Teller = require('../Pages/Teller');
var Customers = require('../Pages/Customers');
var Deposits = require('../Pages/Deposits');
var Accounting = require('../Pages/Accounting');
var Payroll = require('../Pages/Payroll');

describe('payrolls', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    customerAccount = helper.getRandomString(5);
    customerAccount2 = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(5);
    depositName = helper.getRandomString(8);
    tellerIdentifier = helper.getRandomString(4);
    chequeReceivablesAccount = helper.getRandomString(4);
    tellerAccount = helper.getRandomString(4);

    it('should create a new employees with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Paul", "Auster", "Administrator", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
    });
    it('should create new accounts', function () {
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7200");
        Accounting.clickCreateNewAccountInLedger("7200");
        Accounting.enterTextIntoAccountIdentifierInputField(chequeReceivablesAccount);
        Accounting.verifyRadioAssetToBeSelected();
        Accounting.verifyRadioAssetToBeDisabled();
        Accounting.enterTextIntoAccountNameInputField("Cheques Receivables");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Accounting.clickCreateNewAccountInLedger("7300");
        Accounting.enterTextIntoAccountIdentifierInputField(tellerAccount);
        Accounting.verifyRadioAssetToBeSelected();
        Accounting.verifyRadioAssetToBeDisabled();
        Accounting.enterTextIntoAccountNameInputField("My teller");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
    });
    it('should be able to create customer', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.verifyCardHasTitle("Manage members");
        Customers.clickButtonOrLinkCreateNewCustomer();
        Common.verifyCardHasTitle("Create new member");
        Customers.enterTextIntoAccountInputField(customerAccount);
        Customers.enterTextIntoFirstNameInputField("Samuel");
        Customers.enterTextIntoLastNameInputField("Beckett");
        Customers.enterTextIntoDayOfBirthInputField("9211978");
        Customers.clickEnabledContinueButtonForCustomerDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForCustomerAddress();
        Customers.clickEnabledCreateCustomerButton();
        Common.verifyMessagePopupIsDisplayed("Member is going to be saved")
        Common.verifyCardHasTitle("Manage members");
    });
    it('should create a new teller for the branch office', function () {
        Offices.goToManageOfficesViaSidePanel();
        Offices.goToManageTellersForOfficeByIdentifier("hqo1");
        Offices.clickCreateTellerForOfficeByIdentifier("hqo1");
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Offices.enterTextIntoPasswordInputField("qazwsx123!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("1000");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry(tellerAccount);
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry("7351");
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequeReceivablesAccount);
        Offices.clickCreateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
        //workaround for current bug that teller is not always listed immediately
        Common.clickBackButtonInTitleBar();
        Offices.goToManageTellersForOfficeByIdentifier("hqo1");
        Common.clickLinkShowForRowWithId(tellerIdentifier);
    });
    it('should open the teller and assign it to an employee', function () {
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier, "hqo1");
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier);
        Offices.selectOptionInListByName("Auster, Paul");
        Offices.clickEnabledOpenTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("OPEN");
    });
    it('should create a deposit product', function () {
        Deposits.goToDepositsViaSidePanel();
        Common.verifyCardHasTitle("Manage deposit products");
        Deposits.clickButtonCreateDepositAccount();
        Common.verifyCardHasTitle("Create new deposit product");
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
        Deposits.clickEnabledCreateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
        Common.verifyCardHasTitle("Manage deposit products");
    });
    it('should enable deposit product', function () {
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Deposits.verifyProductHasStatusDisabled();
        Deposits.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be updated");
        Deposits.verifyProductHasStatusEnabled();
    });
    it('should assign deposit account to customer', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageDepositAccountsForMember(customerAccount);
        Customers.clickCreateDepositAccountForMember(customerAccount);
        Customers.selectProduct(depositName);
        Customers.clickEnabledButtonCreateDepositAccount();
        Common.verifyMessagePopupIsDisplayed("Deposit account is going to be saved");
        //might not be in list immediately always
        Common.clickBackButtonInTitleBar();
        Customers.clickManageDepositAccountsForMember(customerAccount);
    });
    it('should assign another deposit account to customer', function () {
        Customers.clickCreateDepositAccountForMember(customerAccount);
        Customers.selectProduct(depositName);
        Customers.clickEnabledButtonCreateDepositAccount();
        Common.verifyMessagePopupIsDisplayed("Deposit account is going to be saved");
        //might not be in list immediately always
        Common.clickBackButtonInTitleBar();
        Customers.clickManageDepositAccountsForMember(customerAccount);
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
        Teller.verifyCardTitleHasNameOfCustomer("Samuel Beckett");
        Teller.clickOnOpenAccountForCustomer(customerAccount);
        Common.verifyCardHasTitle("Teller transaction");
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Teller.enterTextIntoAmountInputField("100");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("100");
        Teller.verifyChargesPayedInCashCheckboxChecked();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        Teller.clickOnOpenAccountForCustomer(customerAccount);
        Common.verifyCardHasTitle("Teller transaction");
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00002(" + depositIdentifier +")");
        Teller.enterTextIntoAmountInputField("200");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("200");
        Teller.verifyChargesPayedInCashCheckboxChecked();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('should not be able to select member without payroll distribution', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToPayrolls();
        Payroll.clickButtonCreatePayroll();
        Payroll.enterTextIntoFromAccountInputFieldForPayment("1101");
        Payroll.enterTextIntoMemberInputFieldForPayment(customerAccount, 1);
        Payroll.enterTextIntoEmployerInputFieldForPayment("SweetWater Brewing Company", 1);
        Payroll.verifyMemberInputFieldHasError("Invalid member or has no payroll created");
        Payroll.enterTextIntoSalaryInputFieldForPayment("5000", 1);
        Payroll.verifyCreatePaymentsButtonIsDisabled();
    });
    it('should set up payroll distribution for member - main account', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickPayrollForMember(customerAccount);
        Customers.clickEditPayrollDistributionForMember(customerAccount);
        Payroll.selectMainAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
        Payroll.clickButtonUpdateAllocations();
        Common.verifyMessagePopupIsDisplayed("Payroll is going to be saved");
        //verify details
        Payroll.verifyPayrollInfo(customerAccount + ".9100.00001");
        //created by not updated yet
    });
    it('should pay salary - main account', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToPayrolls();
        Payroll.clickButtonCreatePayroll();
        Payroll.enterTextIntoFromAccountInputFieldForPayment("1101");
        Payroll.enterTextIntoMemberInputFieldForPayment(customerAccount, 1);
        Payroll.enterTextIntoEmployerInputFieldForPayment("SweetWater Brewing Company", 1);
        Payroll.enterTextIntoSalaryInputFieldForPayment("5000", 1);
        Payroll.clickCreatePaymentsButton();
        Common.verifyMessagePopupIsDisplayed("Payroll is going to be created");
        //verify details
        Payroll.verifyCreatedByForPayrollInRow(employeeIdentifier, 1);
        Payroll.verifyAccountNumberForPayrollInRow("1101", 1);
        //created by
        Common.clickLinkShowForRowWithId(employeeIdentifier);
        //verify details
        Payroll.verifyMemberIDForPaymentInRow(customerAccount, 1);
        Payroll.verifyEmployerForPaymentInRow("SweetWater Brewing Company", 1);
        Payroll.verifySalaryForPaymentInRow("5000", 1);
    });
    it('verify transaction has been booked as expected', function () {
        //journal entry
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".9100.00001");
        Accounting.clickSearchButton();
        browser.pause();
        Accounting.verifyFirstJournalEntry("Payroll/Salary Payment", "Amount: 5,000.00");
        Accounting.verifyClerkForJournalEntryIs(employeeIdentifier);
        Accounting.verifyNoteForJournalEntryIs("Payroll Distribution");
        //customer has received payment
        Customers.goToManageCustomersViaSidePanel();
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageDepositAccountsForMember(customerAccount);
        Common.clickLinkShowForFirstRowInTable();
        Customers.verifyDepositAccountBalanceIs("5,100");
        browser.pause();
    });
    //allocation - not proportional
    //allocation - proportional
    //allocation - three accounts, proportional
    //allocations - three accounts, mixed
    //same deposit account selected twice, not possible
    //closed dep account
    //payment smaller than amounts  for allocations
    //allocations exceeding 100% (proportional)
    //payment just enough for allocations
    //several payments at once (same member/different members)

});