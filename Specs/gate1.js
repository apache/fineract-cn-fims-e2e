//test round 1 - admin user can execute basic actions (TBD)
//1) User operator creates a new role Administrator with all permissions
//2) User operator creates a new employee with that role
//3) New employee logs in and creates new accounts (asset and revenue)
//4) New employee creates headoffice
//5) New employee creates branch office
//6) New employee creates a teller for the branch office
//7) New employee opens the teller and assigns it to himself
//8) New employee creates a customer
//9) New employee activates the customer
//10) New employee unlocks the teller, views customer and pauses teller again
//11) New employee creates a deposit product
//12) New employee enables deposit product
//13) New employee assigns deposit product to customer
//14) New employee opens account in teller and verifies the account is now active
//15) New employee verifies transactions have been booked as expected (accounting)
//16) New employee updates deposit product and adds a proportional charge on cash withdrawal
//17) Teller - Cash is withdrawn from the account
//18) Employee creates a loan product
//19) Employee edits a charge
//20) Employee adds two tasks
//21) Employee enables loan product
//22) Employee assigns the product to a customer
//23) Employee opens, approves and disburses the loan
//24) Employee verifies transactions have been booked as expected

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
var Loans = require('../Pages/Loans');


describe('Gate 1', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);
    depositName = helper.getRandomString(8);
    chequeReceivablesAccount = helper.getRandomString(4);
    tellerAccount = helper.getRandomString(4);
    revenueAccount = helper.getRandomString(4);
    loanShortName = helper.getRandomString(6);
    taskIdentifier = helper.getRandomString(3);
    loanAccountShortName =  helper.getRandomString(4);

    it('should create a new administrator role', function () {
        Common.waitForThePageToFinishLoading();
        Roles.clickCreateNewRoleFromQuickAccess();
        Roles.enterTextIntoRoleIdentifierInput("Administrator");
        Common.verifyCardHasTitle("Create new role");
        Roles.selectCheckboxToGiveUserAllPermissions();
        Roles.clickEnabledSaveRoleButton();
        Common.verifyMessagePopupIsDisplayed("Role is going to be saved");
        Common.verifyCardHasTitle("Manage roles");
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
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("1000");
        Common.clickLinkShowForRowWithId("1300");
        Accounting.clickCreateNewAccountInLedger("1300");
        Accounting.enterTextIntoAccountIdentifierInputField(revenueAccount);
        Accounting.verifyRadioRevenueToBeSelected();
        Accounting.enterTextIntoAccountNameInputField("Revenue from deposit charges");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
    });
    it('should create a headquarter office', function () {
        Offices.goToManageOfficesViaSidePanel();
        Offices.verifyNoHeadquarterExistingYet();
        Offices.clickButtonCreateHeadquarter();
        Common.verifyCardHasTitle("Create new office");
        Offices.enterTextIntoOfficeIdentifierInputField("hqo1");
        Offices.enterTextIntoOfficeNameInputField("Headquarter Office Playground");
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickCreateOfficeButton();
        Common.verifyMessagePopupIsDisplayed("Office is going to be saved");
    });
    it('should create a new branch office', function () {
        Offices.clickButtonCreateNewOffice();
        Common.verifyCardHasTitle("Create new office");
        Offices.enterTextIntoOfficeIdentifierInputField(officeIdentifier);
        Offices.enterTextIntoOfficeNameInputField("Branch " + officeIdentifier);
        Offices.clickEnabledContinueButtonForOfficeDetails();
        Offices.clickCreateOfficeButton();
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
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequeReceivablesAccount);
        Offices.clickCreateTellerButton();
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
        Common.verifyCardHasTitle("Manage members");
        Customers.clickButtonOrLinkCreateNewCustomer();
        Common.verifyCardHasTitle("Create new member");
        Customers.enterTextIntoAccountInputField(customerAccount);
        Customers.enterTextIntoFirstNameInputField("Thomas");
        Customers.enterTextIntoLastNameInputField("Pynchon");
        Customers.enterTextIntoDayOfBirthInputField("9211978");
        Customers.verifyIsMemberCheckboxSelected();
        Customers.clickEnabledContinueButtonForCustomerDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForCustomerAddress();
        Customers.clickEnabledCreateCustomerButton();
        Common.verifyMessagePopupIsDisplayed("Member is going to be saved");
        Common.verifyCardHasTitle("Manage members");
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
    });
    it('should activate the customer', function () {
        Common.clickLinkShowForFirstRowInTable();
        Customers.verifyMemberHasStatusInactive();
        Customers.clickButtonGoToTasks();
        Customers.clickButtonActivate();
        Common.verifyMessagePopupIsDisplayed("Command is going to be executed");
        Customers.verifyMemberHasStatusActive();
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
    it('should create a deposit account - Checking with opening charge', function () {
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
        Deposits.clickButtonAddCharge();
        Deposits.enterTextIntoChargeNameInputField("Account opening charge");
        Deposits.enterTextIntoIncomeAccountInputField(revenueAccount);
        Deposits.enterTextIntoChargeAmountInputField("5");
        Deposits.selectTypeOfCharge("Account Opening");
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
    it('should assign deposit product to customer', function () {
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
        Common.verifyCardHasTitle("Teller transaction");
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
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
        Customers.clickManageDepositAccountsForMember(customerAccount);
        //test might be too fast, account still PENDING here and balance 0.00 (but on leaving and coming back, everything as expected)
        Customers.verifyStateOfDepositAccountWithIdIs(depositIdentifier, "ACTIVE");
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Customers.verifyDepositAccountHasStatus("ACTIVE");
        Customers.verifyDepositAccountBalanceIs("100.00");
    });
    it('transaction ACCO should have been booked as expected', function () {
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
        Common.clickLinkShowForRowWithId("1300");
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
    it('edit deposit product and add a withdrawal charge', function () {
        Deposits.goToDepositsViaSidePanel();
        Common.clickLinkShowForRowWithId(depositIdentifier);
        Deposits.clickButtonEditDepositProduct(depositIdentifier);
        Deposits.verifyRadioCheckingIsSelected();
        Deposits.verifyInterestInputFieldHasText("0.05");
        Deposits.verifyInterestInputFieldIsDisabled();
        Deposits.clickEnabledContinueButtonForProductDetails();
        Deposits.clickButtonAddChargeIfThereAlreadyIsACharge();
        Deposits.enterTextIntoSecondChargeNameInputField("Cash withdrawal charge");
        Deposits.enterTextIntoSecondChargeAmountInputField("3");
        Deposits.selectTypeOfSecondCharge("Cash Withdrawal");
        Deposits.selectSecondCheckboxProportional();
        Deposits.enterTextIntoSecondIncomeAccountInputField(revenueAccount);
        Deposits.clickEnabledUpdateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
    });
    it('make a cash withdrawal without paying charge in cash', function () {
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoSearchInputField(customerAccount);
        //will be successful even if the customer does not exist, clicks one of the buttons too quickly: need to fix
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Thomas Pynchon");
        Teller.clickOnCashWithdrawalForCustomer(customerAccount);
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001");
        Teller.enterTextIntoAmountInputField("50");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("50");
        Teller.verifyTransactionCharge("Cash withdrawal charge", "1.5");
        Teller.uncheckChargesPayedInCashCheckbox();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('transaction CWDL should have been booked as expected', function () {
    Accounting.goToAccountingViaSidePanel();
    //verify balance on customer's account is as expected
    Common.clickLinkShowForRowWithId("9000");
    Common.clickLinkShowForRowWithId("9100");
    Accounting.clickLinkShowForAccountWithName(depositName);
    Accounting.verifyAccountInfo("Balance", "48.5");
    Accounting.viewAccountEntriesForAccount(customerAccount + ".9100.00001");
    Accounting.verifyTransactionTypeForRow("DEBIT", 2);
    Accounting.verifyTransactionMessageForRow("CWDL", 2);
    Accounting.verifyTransactionAmountForRow("1.5", 2);
    Accounting.verifyTransactionBalanceForRow("98.5", 2);
    Accounting.verifyTransactionTypeForRow("DEBIT", 3);
    Accounting.verifyTransactionMessageForRow("CWDL", 3);
    Accounting.verifyTransactionAmountForRow("50", 3);
    Accounting.verifyTransactionBalanceForRow("48.5", 3);
    Accounting.goToAccountingViaSidePanel();
    Common.clickLinkShowForRowWithId("7000");
    Common.clickLinkShowForRowWithId("7300");
    Common.clickLinkShowForRowWithId(tellerAccount);
    Accounting.verifyAccountInfo("Balance", "55");
    Accounting.viewAccountEntriesForAccount(tellerAccount);
    Accounting.verifyTransactionTypeForRow("CREDIT", 2);
    Accounting.verifyTransactionMessageForRow("CWDL", 2);
    Accounting.verifyTransactionAmountForRow("50", 2);
    Accounting.verifyTransactionBalanceForRow("55", 2);
    //revenue account - check charges have been booked as expected
    Accounting.goToAccountingViaSidePanel();
    Common.clickLinkShowForRowWithId("1000");
    Common.clickLinkShowForRowWithId("1300");
    Common.clickLinkShowForRowWithId(revenueAccount);
    Accounting.verifyAccountInfo("Balance", "6.5");
    Accounting.viewAccountEntriesForAccount(revenueAccount);
    Accounting.verifyTransactionTypeForRow("CREDIT", 2);
    Accounting.verifyTransactionMessageForRow("CWDL", 2);
    Accounting.verifyTransactionAmountForRow("1.5", 2);
    Accounting.verifyTransactionBalanceForRow("6.5", 2);
    });
    it('create a loan product', function () {
    Loans.goToLoanProductsViaSidePanel();
    Loans.clickButtonCreateLoanProduct();
    Loans.enterTextIntoShortNameInputField(loanShortName);
    Loans.enterTextIntoNameInputField("My loan " + loanShortName);
    Loans.enterTextIntoDescriptionInputField("My loan " + loanShortName);
    Loans.enterTextIntoMinimumPrincipalInputField("200");
    Loans.enterTextIntoMaximumPrincipalInputField("1000");
    Loans.enterTextIntoTermInputField("12");
    Loans.clickEnabledContinueButtonForProductDetails();
    Loans.enterTextIntoCashAccountInputField(tellerAccount);
    Loans.enterTextIntoCustomerLoanLedgerInputField("7900");
    Loans.clickEnabledContinueButtonForLedgerAndAccountSettings();
    Loans.enterTextIntoInterestMinimumInputField("3.50");
    Loans.enterTextIntoIncomeAccountAccountInputField(revenueAccount);
    Loans.enterTextIntoAccrualAccountInputField("7015");
    Loans.clickEnabledContinueButtonForInterestSettings();
    Loans.enterTextIntoProcessingFeeIncomeAccountInputField("1312");
    Loans.enterTextIntoOriginatingFeeIncomeAccountInputField("1310");
    Loans.enterTextIntoDisbursementFeeIncomeAccountInputField("1313");
    Loans.enterTextIntoLateFeeIncomeAccountInputField("1311");
    Loans.enterTextIntoLateFeeAccrualAccountInputField("7840");
    Loans.clickEnabledContinueButtonForFeeIncomeAccounts("");
    Loans.enterTextIntoArrearsAllowanceAccountInputField("3040");
    Loans.clickEnabledCreateProductButton();
    Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
    });
    it('should edit charges', function (){
    Common.clickLinkShowForRowWithId(loanShortName);
    Loans.clickLinkManageFeesForLoanProduct(loanShortName);
    Common.clickLinkShowForRowWithId("processing-fee");
    Loans.clickButtonEditProcessingFeeForLoanProduct(loanShortName);
    Loans.enterTextIntoFeeAmountInputField("3");
    Loans.clickEnabledUpdateChargeButton();
    Common.verifyMessagePopupIsDisplayed("Fee is going to be saved");
    Common.clickBackButtonInTitleBar();
    Common.clickBackButtonInTitleBar();
    });
    it('should add task', function () {
    Loans.clickLinkManageTasksForLoanProduct(loanShortName);
    Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
    Loans.enterTextIntoTaskIdentifierInputField(taskIdentifier);
    Loans.enterTextIntoTaskNameInputField("Loan opening task");
    Loans.enterTextIntoTaskDescriptionInputField("Loan opening task - mandatory");
    Loans.checkMandatoryCheckbox();
    Loans.clickButtonAddAction();
    Loans.selectSecondAction("can be approved");
    Loans.clickEnabledCreateTaskButton();
    Common.verifyMessagePopupIsDisplayed("Task is going to be created");
    Common.clickBackButtonInTitleBar();
    });
    it('should enable the loan product', function () {
    Loans.clickButtonEnableProduct();
    Common.verifyMessagePopupIsDisplayed("Product is going to be enabled");
    });
    it('should assign loan product to customer', function () {
    Customers.goToManageCustomersViaSidePanel();
    Common.clickSearchButtonToMakeSearchInputFieldAppear();
    Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
    Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
    Common.clickLinkShowForRowWithId(customerAccount);
    Customers.clickManageLoanAccountsForMember(customerAccount);
    Customers.clickCreateLoanAccountForMember(customerAccount);
    Customers.selectProduct("My loan " + loanShortName);
    Customers.enterTextIntoShortNameInputField(loanAccountShortName);
    Customers.enterTextIntoPrincipalAmountInputField("5000");
    Customers.enterTextIntoTermInputField("12");
    //verify correct radio button selected; BUG
    Customers.selectDayForMonthlyRepayment("3.");
    Customers.selectDepositAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
    Customers.clickEnabledCreateMemberLoanButton();
    Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
    Customers.verifyStateOfLoanAccountWithIdIs(loanAccountShortName, "CREATED");
    });
    it('should be able to open loan - mandatory task', function () {
        Common.clickLinkShowForRowWithId(loanAccountShortName);
        Customers.clickLinkTasks(customerAccount, loanShortName, loanAccountShortName);
        Customers.selectExecuteTaskCheckbox();
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        Customers.clickButtonForTask("OPEN");
        //verify correct principal amount

        Customers.clickButtonForTransaction("OPEN");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
    });
    it('should be able to approve loan - mandatory task already executed', function () {
        Customers.clickLinkTasks(customerAccount, loanShortName, loanAccountShortName);
        //checkbox already selected since one task only that already has been executed
        Customers.clickButtonForTask("APPROVE");
        Customers.clickButtonForTransaction("APPROVE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        Customers.verifyLoanHasStatus("APPROVED");
    });
    it('should be able to disburse loan - no task', function () {
        //currently error if this is done too quickly
        browser.sleep("5000");
        Customers.clickLinkTasks(customerAccount, loanShortName, loanAccountShortName);
        Customers.clickButtonForTask("DISBURSE");
        Customers.verifyTransactionCharge("processing-fee", "150.00");
        Customers.verifyTransactionCharge("loan-origination-fee", "50.00");
        Customers.verifyTransactionCharge("disbursement-fee", "05.00");
        Customers.clickButtonForTransaction("DISBURSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        Customers.verifyLoanHasStatus("ACTIVE");
    });
    it('bookings should be as expected (open/approve/disburse loan)', function () {
        //verify fees have been booked as expected
        Accounting.goToAccountingViaSidePanel();
        Accounting.clickLinkShowForAccountWithIdentifier("1000");
        Accounting.clickLinkShowForAccountWithIdentifier("1300");
        Accounting.clickLinkShowForAccountWithIdentifier("1312");
        Accounting.viewAccountEntriesForAccount("1312");
        Common.clickFirstColumnHeaderInTableToResortTable();
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionAmountForRow("150", 1);
        //Accounting.verifyTransactionBalanceForRow("150", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Accounting.clickLinkShowForAccountWithIdentifier("1310");
        Accounting.viewAccountEntriesForAccount("1310");
        Common.clickFirstColumnHeaderInTableToResortTable();
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionAmountForRow("50", 1);
        //Accounting.verifyTransactionBalanceForRow("50", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Accounting.clickLinkShowForAccountWithIdentifier("1313");
        Accounting.viewAccountEntriesForAccount("1313");
        Common.clickFirstColumnHeaderInTableToResortTable();
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionAmountForRow("5", 1);
        //Accounting.verifyTransactionBalanceForRow("5", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        //verify principal has been transferred to customer's deposit account
        Accounting.clickLinkShowForAccountWithIdentifier("9000");
        Accounting.clickLinkShowForAccountWithIdentifier("9100");
        Accounting.clickLinkShowForAccountWithName(depositName);
        Accounting.verifyAccountInfo("Balance", "4843.5");
        Accounting.viewAccountEntriesForAccount(customerAccount + ".9100.00001");
        Accounting.verifyTransactionTypeForRow("CREDIT",4);
        Accounting.verifyTransactionAmountForRow("5000", 4);
        Accounting.verifyTransactionBalanceForRow("5048.5", 4);
        Accounting.goToAccountingViaSidePanel();
        Accounting.clickLinkShowForAccountWithIdentifier("7000");
        Accounting.clickLinkShowForAccountWithIdentifier("7900");
        Accounting.goToSubledgersForAccount("7900");
        Accounting.clickLinkShowForAccountWithIdentifier(customerAccount + ".cll.00001");
        Accounting.clickLinkShowForAccountWithIdentifier(customerAccount + ".clp.00001");
        //principal
        Accounting.viewAccountEntriesForAccount(customerAccount + ".clp.00001");
        Accounting.verifyTransactionTypeForRow("DEBIT", 1);
        Accounting.verifyTransactionMessageForRow(loanShortName + "." + loanAccountShortName + ".DISBURSE", 1);
        Accounting.verifyTransactionAmountForRow("5000", 1);
        Accounting.verifyTransactionBalanceForRow("5000", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Accounting.clickLinkShowForAccountWithIdentifier(customerAccount + ".clf.00002");
        //fees
        Accounting.viewAccountEntriesForAccount(customerAccount + ".clf.00002");
        Accounting.verifyTransactionTypeForRow("DEBIT", 1);
        Accounting.verifyTransactionMessageForRow(loanShortName + "." + loanAccountShortName + ".DISBURSE", 1);
        Accounting.verifyTransactionAmountForRow("205", 1);
        Accounting.verifyTransactionBalanceForRow("205", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Accounting.clickLinkShowForAccountWithIdentifier(customerAccount + ".cli.00003");
        Accounting.verifyAccountInfo("Balance", "0");
    });
    expPayment = "";
    it('should be able to repay loan - expected payment', function () {
        Teller.goToTellerManagementViaSidePanel();
        //will be successful even if the customer does not exist, clicks one of the buttons too quickly: need to fix
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Thomas Pynchon");
        Teller.clickOnRepayLoanForCustomer(customerAccount);
        Teller.selectLoanAccountToBeAffected(customerAccount + ".clp.00001(" + loanShortName + ")");
        //expected payment amount will be similar but not always the same
        Teller.getExpectedPaymentAmount().then(function(expPaym){
            console.log(expPaym);
            expPayment = expPaym;
            Teller.enterTextIntoAmountInputField(expPayment);
            Teller.clickEnabledCreateTransactionButton();
            Teller.verifyTransactionAmount(expPayment);
        });
        Teller.verifyTransactionCharge("repay-fees", "205");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('journal entry should be as expected (repay loan)', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".clp.00001");
        Accounting.clickSearchButton();
        Accounting.clickSecondJournalEntry();
        Accounting.verifySecondJournalEntry("Principal Payment", "Amount: " + expPayment);
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, expPayment, 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(customerAccount + ".clf.00002", "205.00", 2);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(customerAccount + ".clp.00001", "203.60", 3);
    });
});