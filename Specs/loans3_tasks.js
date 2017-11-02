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
var CustomerLoans = require('../Pages/CustomerLoans');


describe('Loans 3', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    employeeIdentifier2 = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);
    depositName = helper.getRandomString(8);
    chequeReceivablesAccount = helper.getRandomString(4);
    cashOverShortAccount = helper.getRandomString(4);
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
    it('should create two new employees with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Ian", "McEwan", "Administrator", "abc123!!");
        Employees.createEmployee(employeeIdentifier2, "Martin", "Amis", "Administrator", "abc123!!");
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
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("2000");
        Common.clickLinkShowForRowWithId("3300");
        Accounting.clickCreateNewAccountInLedger("3300");
        Accounting.enterTextIntoAccountIdentifierInputField(cashOverShortAccount);
        Accounting.enterTextIntoAccountNameInputField("Cash over short account");
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
        Offices.enterTextIntoCashOverShortInputFieldAndSelectMatchingEntry(cashOverShortAccount);
        Offices.clickCreateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
        //workaround for current bug that teller is not always listed immediately
        Common.clickBackButtonInTitleBar();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Common.clickLinkShowForFirstRowInTable();
    });
    it('should open the teller and assign it to an employee', function () {
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier, officeIdentifier);
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier);
        Offices.selectOptionInListByName("McEwan, Ian");
        Offices.clickEnabledOpenTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("OPEN");
    });
    it('should be able to create customer', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.verifyCardHasTitle("Manage members");
        Customers.clickButtonOrLinkCreateNewMember();
        Common.verifyCardHasTitle("Create new member");
        Customers.enterTextIntoAccountInputField(customerAccount);
        Customers.enterTextIntoFirstNameInputField("Thomas");
        Customers.enterTextIntoLastNameInputField("Pynchon");
        Customers.enterTextIntoDayOfBirthInputField("9211978");
        Customers.verifyIsMemberCheckboxSelected();
        Customers.clickEnabledContinueButtonForMemberDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForMemberAddress();
        Customers.clickEnabledCreateMemberButton();
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
    it('should create a deposit account - Share', function () {
        Deposits.goToDepositsViaSidePanel();
        Common.verifyCardHasTitle("Manage deposit products");
        Deposits.clickButtonCreateDepositAccount();
        Common.verifyCardHasTitle("Create new deposit product");
        Deposits.enterTextIntoShortNameInputField(depositIdentifier);
        Deposits.verifyRadioCheckingIsSelected();
        Deposits.selectRadioButtonShare();
        Deposits.enterTextIntoNameInputField(depositName);
        Deposits.enterTextIntoMinimumBalanceInputField("100");
        Deposits.verifyRadioAnnuallyIsSelected();
        Deposits.verifyCheckboxFlexibleInterestNotChecked();
        Deposits.enterTextIntoInterestInputField("0.05");
        Deposits.enterTextIntoCashAccountInputField("7352");
        Deposits.enterTextIntoExpenseAccountInputField("2820");
        Deposits.enterTextIntoEquityLedgerInputField("9100");
        Deposits.clickEnabledContinueButtonForProductDetails();
        Deposits.clickButtonAddCharge();
        Deposits.enterTextIntoChargeNameInputField("Account opening charge");
        Deposits.enterTextIntoIncomeAccountInputField(revenueAccount);
        Deposits.enterTextIntoChargeAmountInputField("0");
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
    });
    it('create first loan product', function () {
        Loans.goToLoanProductsViaSidePanel();
        Loans.clickButtonCreateLoanProduct();
        Loans.enterTextIntoShortNameInputField(loanShortName);
        Loans.enterTextIntoNameInputField("My loan " + loanShortName);
        Loans.enterTextIntoDescriptionInputField("My loan " + loanShortName);
        Loans.enterTextIntoMinimumPrincipalInputField("10000");
        Loans.enterTextIntoMaximumPrincipalInputField("50000");
        //maximum term: 5 years
        Loans.enterTextIntoTermInputField("5");
        Loans.selectRadioButtonYears();
        Loans.clickEnabledContinueButtonForProductDetails();
        Loans.enterTextIntoCashAccountInputField(tellerAccount);
        Loans.enterTextIntoCustomerLoanLedgerInputField("7900");
        Loans.clickEnabledContinueButtonForLedgerAndAccountSettings();
        //interest settings
        Loans.toggleInterestRangeToOn();
        Loans.enterTextIntoInterestRangeMinInputField("5.00");
        Loans.enterTextIntoInterestRangeMaxInputField("50.00");
        Loans.enterTextIntoIncomeAccountAccountInputField(revenueAccount);
        Loans.enterTextIntoAccrualAccountInputField("7015");
        Loans.clickEnabledContinueButtonForInterestSettings();
        //fees
        Loans.enterTextIntoProcessingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoOriginatingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoDisbursementFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoLateFeeIncomeAccountInputField("1311");
        Loans.enterTextIntoLateFeeAccrualAccountInputField("7810");
        Loans.clickEnabledContinueButtonForFeeIncomeAccounts();
        Loans.enterTextIntoArrearsAllowanceAccountInputField("3040");
        Loans.clickEnabledCreateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
    });
    it('should enable the loan product', function () {
        Common.clickLinkShowForRowWithId(loanShortName);
        Loans.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be enabled");
    });
    it('should create tasks for loan product', function () {
        Loans.clickLinkManageTasksForLoanProduct(loanShortName);
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        //create task to be executed on opening loan - mandatory
        Loans.enterTextIntoTaskIdentifierInputField("MyFirstTask");
        Loans.enterTextIntoTaskNameInputField("My first task");
        Loans.enterTextIntoTaskDescriptionInputField("Mandatory task on opening loan");
        Loans.checkMandatoryCheckbox();
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        //details
        Loans.verifyNameForTaskInRow("My first task", 1);
        Common.clickLinkShowForFirstRowInTable();
        Loans.verifyActionsForTask("OPEN");
        Loans.verifyMandatoryForTask("true");
        Loans.verifyFourEyesForTask("false");
        Common.clickBackButtonInTitleBar();
        //create task to be executed on approving loan - mandatory & four- eyes
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        Loans.enterTextIntoTaskIdentifierInputField("MySecondTask");
        Loans.enterTextIntoTaskNameInputField("My second task");
        Loans.enterTextIntoTaskDescriptionInputField("Mandatory four-eyes task on approving loan");
        Loans.checkMandatoryCheckbox();
        Loans.checkFourEyesCheckbox();
        Loans.selectFirstAction("can be approved");
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        //details
        Loans.verifyNameForTaskInRow("My second task", 2);
        Common.clickLinkShowForRowWithId("MySecondTask");
        Loans.verifyActionsForTask("APPROVE");
        Loans.verifyMandatoryForTask("true");
        Loans.verifyFourEyesForTask("true");
        Common.clickBackButtonInTitleBar();
        //create option task to be executed on opening and on approving loan
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        Loans.enterTextIntoTaskIdentifierInputField("MyThirdTask");
        Loans.enterTextIntoTaskNameInputField("My third task");
        Loans.enterTextIntoTaskDescriptionInputField("Optional task on approving and disbursing loan");
        Loans.selectFirstAction("can be approved");
        Loans.clickButtonAddAction();
        Loans.selectSecondAction("can be disbursed");
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        //details
        Loans.verifyNameForTaskInRow("My third task", 3);
        Common.clickLinkShowForRowWithId("MyThirdTask");
        Loans.verifyActionsForTask("DISBURSE,APPROVE");
        Loans.verifyMandatoryForTask("false");
        Loans.verifyFourEyesForTask("false");
        Common.clickBackButtonInTitleBar();
        //create task to be executed on denying/closing loan
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        Loans.enterTextIntoTaskIdentifierInputField("MyFourthTask");
        Loans.enterTextIntoTaskNameInputField("My fourth task");
        Loans.enterTextIntoTaskDescriptionInputField("Mandatory task on denying and closing loan");
        Loans.checkMandatoryCheckbox();
        Loans.selectFirstAction("can be denied");
        Loans.clickButtonAddAction();
        Loans.selectSecondAction("can be closed");
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        //details
        Loans.verifyNameForTaskInRow("My fourth task", 2);
        Common.clickLinkShowForRowWithId("MyFourthTask");
        Loans.verifyActionsForTask("DENY,CLOSE");
        Loans.verifyMandatoryForTask("true");
        Loans.verifyFourEyesForTask("false");
        Common.clickBackButtonInTitleBar();
        //create task to be executed for all five actions
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        Loans.enterTextIntoTaskIdentifierInputField("MyFifthTask");
        Loans.enterTextIntoTaskNameInputField("My fifth task");
        Loans.enterTextIntoTaskDescriptionInputField("Optional task on everything");
        Loans.clickButtonAddAction();
        Loans.selectSecondAction("can be approved");
        Loans.clickButtonAddAction();
        Loans.selectThirdAction("can be disbursed");
        Loans.clickButtonAddAction();
        Loans.selectFourthAction("can be denied");
        Loans.clickButtonAddAction();
        Loans.selectFifthAction("can be closed");
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        //details
        Loans.verifyNameForTaskInRow("My fifth task", 1);
        Common.clickLinkShowForRowWithId("MyFifthTask");
        Loans.verifyActionsForTask("DISBURSE,DENY,APPROVE,CLOSE,OPEN");
        Loans.verifyMandatoryForTask("false");
        Loans.verifyFourEyesForTask("false");
        Loans.clickButtonEditTaskForLoanProduct();
        Loans.checkFourEyesCheckbox();
        Loans.clickEnabledUpdateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        Common.clickBackButtonInTitleBar();
    });
    it('add another task, edit and delete it', function () {
        Loans.clickButtonCreateTaskForLoanProduct(loanShortName);
        //create task to be executed on opening loan - mandatory
        Loans.enterTextIntoTaskIdentifierInputField("MyLastTask");
        Loans.enterTextIntoTaskNameInputField("My last task");
        Loans.enterTextIntoTaskDescriptionInputField("xxx");
        Loans.checkMandatoryCheckbox();
        Loans.clickButtonAddAction();
        Loans.selectSecondAction("can be approved");
        Loans.clickButtonAddAction();
        Loans.selectThirdAction("can be disbursed");
        Loans.clickButtonAddAction();
        Loans.selectFourthAction("can be denied");
        Loans.clickButtonAddAction();
        Loans.selectFifthAction("can be closed");
        Loans.clickEnabledCreateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        Common.clickLinkShowForRowWithId("MyLastTask");
        Loans.clickButtonEditTaskForLoanProduct();
        Loans.enterTextIntoTaskNameInputField("To Be Deleted");
        Loans.enterTextIntoTaskDescriptionInputField("Not mandatory but four eyes");
        Loans.uncheckMandatoryCheckbox();
        Loans.checkFourEyesCheckbox();
        //remove actions
        Loans.clickFirstRemoveButton();
        Loans.clickFirstRemoveButton();
        Loans.clickFirstRemoveButton();
        Loans.clickEnabledUpdateTaskButton();
        Common.verifyMessagePopupIsDisplayed("Task is going to be created");
        Loans.verifyActionsForTask("APPROVE,CLOSE,OPEN");
        Loans.verifyMandatoryForTask("false");
        Loans.verifyFourEyesForTask("true");
        Loans.clickButtonDeleteTaskForLoanProduct();
        Common.confirmAction();
        Common.verifyMessagePopupIsDisplayed("Task is going to be deleted");
    });
    it('should open deposit account', function () {
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
        Teller.verifyChargesPayedInCashCheckboxChecked();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
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
        CustomerLoans.enterTextIntoPrincipalAmountInputField("10000");
        CustomerLoans.enterTextIntoInterestRateInputField("50.00")
        CustomerLoans.enterTextIntoTermInputField("12");
        CustomerLoans.selectDayForMonthlyRepayment("3.");
        CustomerLoans.selectDepositAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
        CustomerLoans.clickEnabledCreateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        Customers.verifyStateOfLoanAccountWithIdIs(loanAccountShortName, "CREATED");
    });
    it('verify tasks are as expected on executing actions OPEN, APPROVE and DENY', function () {
        Common.clickLinkShowForRowWithId(loanAccountShortName);
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        //button OPEN disabled since there is mandatory task
        CustomerLoans.verifyButtonForTaskDisabled("OPEN");
        //verify there are two tasks, one mandatory and one optional
        CustomerLoans.verifyMandatoryTaskIsPresentAtPosition("My first task", "Mandatory task on opening loan", 1);
        CustomerLoans.verifyOptionalTaskIsPresent("My fifth task", "Optional task on everything", 2);
        //execute optional task
        CustomerLoans.selectExecuteTaskCheckboxForTaskAtPosition(2);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyTaskAtPositionExecutedBy(2, employeeIdentifier);
        CustomerLoans.verifyButtonForTaskDisabled("OPEN");
        //leave tasks and verify task remains executed
        Common.clickBackButtonInTitleBar();
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.verifyExecuteTaskCheckboxSelectedAtPosition(2);
        CustomerLoans.verifyTaskAtPositionExecutedBy(2, employeeIdentifier);
        CustomerLoans.verifyButtonForTaskDisabled("OPEN");
        //execute mandatory task
        CustomerLoans.selectExecuteTaskCheckboxForTaskAtPosition(1);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyTaskAtPositionExecutedBy(1, employeeIdentifier);
        CustomerLoans.verifyButtonForTaskEnabled("OPEN");
        //leave tasks and verify task remains executed
        Common.clickBackButtonInTitleBar();
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.verifyExecuteTaskCheckboxSelectedAtPosition(1);
        CustomerLoans.verifyTaskAtPositionExecutedBy(1, employeeIdentifier);
        CustomerLoans.verifyButtonForTaskEnabled("OPEN");
        CustomerLoans.clickButtonForTask("OPEN");
        CustomerLoans.clickButtonForTask("OPEN");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        //actions APPROVE (three tasks) and DENY (two tasks)
        //approve; mandatory four-eyes task
        CustomerLoans.verifyButtonForTaskDisabled("APPROVE");
        CustomerLoans.verifyMandatoryTaskIsPresentAtPosition("My second task", "Mandatory four-eyes task on approving loan", 1);
        //verify checkbox is disabled for four-eyes task
        //ToDo: CustomerLoans.verifyExecuteTaskCheckboxDisabledAtPosition(1);
        CustomerLoans.verifyOptionalTaskIsPresent("My third task", "Optional task on approving and disbursing loan", 2);
        //verify checkbox is not selected, select and deselect
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(2);
        CustomerLoans.selectExecuteTaskCheckboxForTaskAtPosition(2);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyTaskAtPositionExecutedBy(2, employeeIdentifier);
        CustomerLoans.deselectExecuteTaskCheckboxForTaskAtPosition(2);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyTaskAtPositionReversedBy(2, employeeIdentifier);
        //verify checkbox is selected and task already executed
        CustomerLoans.verifyOptionalTaskIsPresent("My fifth task", "Optional task on everything", 3);
        CustomerLoans.verifyExecuteTaskCheckboxSelectedAtPosition(3);
        CustomerLoans.verifyTaskAtPositionExecutedBy(3, employeeIdentifier);
        //deny; mandatory task and optional task (already executed)
        CustomerLoans.verifyButtonForTaskDisabled("DENY");
        CustomerLoans.verifyMandatoryTaskIsPresentAtPosition("My fourth task", "Mandatory task on denying and closing loan", 4);
        CustomerLoans.selectExecuteTaskCheckboxForTaskAtPosition(4);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyButtonForTaskEnabled("DENY");
        CustomerLoans.verifyOptionalTaskIsPresent("My fifth task", "Optional task on everything", 5);
        CustomerLoans.deselectExecuteTaskCheckboxForTaskAtPosition(5);
        CustomerLoans.verifyButtonForTaskEnabled("DENY");
    });
    it('should be able to approve loan as a different employee', function () {
        //ToDo: workaround for logout bug
        Customers.goToManageCustomersViaSidePanel();
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier2, "abc123!!", "abc123??");
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageLoanAccountsForMember(customerAccount);
        Common.clickLinkShowForRowWithId(loanAccountShortName);
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.verifyButtonForTaskDisabled("APPROVE");
        CustomerLoans.selectExecuteTaskCheckboxForTaskAtPosition(1);
        Common.verifyMessagePopupIsDisplayed("Task executed successfully");
        CustomerLoans.verifyButtonForTaskEnabled("APPROVE");
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(2);
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(3);
        CustomerLoans.verifyExecuteTaskCheckboxSelectedAtPosition(4);
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(5);
        CustomerLoans.verifyButtonForTaskEnabled("DENY");
        CustomerLoans.clickButtonForTask("APPROVE");
        CustomerLoans.clickButtonForTask("APPROVE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
    });
    it('should be able to close loan - tasks as expected for actions DISBURSE and CLOSE', function () {
        //currently error if this is done too quickly; workaround
        browser.sleep("10000");
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.verifyButtonForTaskEnabled("CLOSE");
        CustomerLoans.verifyButtonForTaskEnabled("DISBURSE");
        //mandatory task on close already executed
        CustomerLoans.verifyExecuteTaskCheckboxSelectedAtPosition(1);
        //optional tasks not executed
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(2);
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(3);
        CustomerLoans.verifyExecuteTaskCheckboxNotSelectedAtPosition(4);
        CustomerLoans.clickButtonForTask("CLOSE");
        CustomerLoans.clickButtonForTask("CLOSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanHasStatus("CLOSED");
        Common.clickBackButtonInTitleBar();
        CustomerLoans.verifyCurrentStatusForLoanAccountInRow("CLOSED", 1);
        browser.pause();
    });
    it('can task be added/edited/deleted once product assigned to customer', function () {
        //???
        //not sure if this should be possible, currently bug
        //actions available but nothing happens, UI breaks
    });
});