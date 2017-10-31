var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');
var Offices = require('../Pages/Offices');
var Roles = require('../Pages/Roles');
var Teller = require('../Pages/Teller');
var Customers = require('../Pages/Customers');
var CustomerLoans = require('../Pages/CustomerLoans');
var Deposits = require('../Pages/Deposits');
var Accounting = require('../Pages/Accounting');
var Loans = require('../Pages/Loans');


describe('Loans 2', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    customerAccount2 = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);
    depositName = helper.getRandomString(8);
    chequeReceivablesAccount = helper.getRandomString(4);
    cashOverShortAccount = helper.getRandomString(4);
    tellerAccount = helper.getRandomString(4);
    revenueAccount = helper.getRandomString(4);
    loanShortName = helper.getRandomString(6);
    loanShortName2 = helper.getRandomString(6);
    taskIdentifier = helper.getRandomString(3);
    loanAccountShortName =  helper.getRandomString(4);
    loanAccountShortName2 =  helper.getRandomString(4);

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
    it('should create a deposit account', function () {
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
        Deposits.enterTextIntoCashAccountInputField("7352");
        Deposits.enterTextIntoExpenseAccountInputField("2820");
        Deposits.enterTextIntoAccrueAccountInputField("8202");
        Deposits.enterTextIntoEquityLedgerInputField("9100");
        Deposits.clickEnabledContinueButtonForProductDetails();
        Deposits.clickButtonAddCharge();
        Deposits.enterTextIntoChargeNameInputField("Account opening charge");
        Deposits.enterTextIntoIncomeAccountInputField(revenueAccount);
        Deposits.enterTextIntoChargeAmountInputField("3.5");
        Deposits.selectTypeOfCharge("Account Opening");
        Deposits.selectCheckboxProportional();
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
        //product details
        Loans.enterTextIntoShortNameInputField(loanShortName);
        Loans.enterTextIntoNameInputField("My loan " + loanShortName);
        Loans.enterTextIntoDescriptionInputField("My loan " + loanShortName);
        Loans.enterTextIntoMinimumPrincipalInputField("0");
        Loans.enterTextIntoMaximumPrincipalInputField("100000");
        //maximum term: 240 months
        Loans.enterTextIntoTermInputField("240");
        Loans.clickEnabledContinueButtonForProductDetails();
        //ledger and account settings
        Loans.enterTextIntoCashAccountInputField(tellerAccount);
        Loans.enterTextIntoCustomerLoanLedgerInputField("7900");
        Loans.clickEnabledContinueButtonForLedgerAndAccountSettings();
        //interest settings
        Loans.toggleInterestRangeToOn();
        Loans.enterTextIntoInterestRangeMinInputField("0.00");
        Loans.enterTextIntoInterestRangeMaxInputField("45.00");
        Loans.enterTextIntoIncomeAccountAccountInputField("1101");
        Loans.enterTextIntoAccrualAccountInputField("7810");
        Loans.clickEnabledContinueButtonForInterestSettings();
        //fee income accounts
        Loans.enterTextIntoProcessingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoOriginatingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoDisbursementFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoLateFeeIncomeAccountInputField("1311");
        Loans.enterTextIntoLateFeeAccrualAccountInputField("7810");
        //arrears allowance reserve account
        Loans.clickEnabledContinueButtonForFeeIncomeAccounts();
        Loans.enterTextIntoArrearsAllowanceAccountInputField("3040");
        Loans.clickEnabledCreateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
    });
    it('should define range and edit processing and loan origination fee to apply within range', function () {
        Common.clickLinkShowForRowWithId(loanShortName);
        //ToDo: details
        Loans.clickLinkManageFeesForLoanProduct(loanShortName);
        Loans.clickLinkManageRangesForLoanProduct(loanShortName);
        Loans.clickButtonCreateNewRange();
        Loans.enterTextIntoRangeIdentifierInputField("MyRange_1");
        Loans.enterTextIntoRangeSegmentIdentifierInputField("MyStart", 2);
        Loans.clickButtonAddRange();
        Loans.enterTextIntoRangeSegmentIdentifierInputField("MyMiddle", 3);
        Loans.enterTextIntoRangeSegmentStartInputField("25000", 2);
        Loans.clickButtonAddRange();
        Loans.enterTextIntoRangeSegmentIdentifierInputField("MyEnd",4);
        Loans.enterTextIntoRangeSegmentStartInputField("50000", 3);
        Loans.clickEnabledCreateRangeButton();
        Common.verifyMessagePopupIsDisplayed("Range is going to be saved");
        //ToDo: edit range and add one more range segment; bug (cannot add another range currently)
        Common.clickLinkShowForRowWithId("MyRange_1");
        Loans.clickButtonEditRange();
        //identifier can no longer be edited
        Loans.enterTextIntoRangeSegmentStartInputField("28000", 2);
        Loans.clickEnabledUpdateRangeButton();
        Common.verifyMessagePopupIsDisplayed("Range is going to be saved");
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Common.clickLinkShowForRowWithId("processing-fee");
        //ToDo: details
        //processing fee - fixed amount within end range
        Loans.clickButtonEditProcessingFeeForLoanProduct(loanShortName);
        Loans.enterTextIntoFeeAmountInputField("25");
        Loans.selectRadioFixed();
        Loans.verifyApplyAmountOnlyInRangeToggleSetToOff();
        Loans.toggleApplyAmountOnlyInRangeToOn();
        Loans.selectRangeByName("MyRange_1");
        Loans.selectRangeSegmentByName("MyEnd(50,000.00 - )");
        Loans.clickEnabledUpdateChargeButton();
        //ToDo: details
        Common.clickBackButtonInTitleBar();
        //origination fee - proportional amount within end range
        Common.clickLinkShowForRowWithId("loan-origination-fee");
        Loans.clickButtonEditLoanOriginationFeeForLoanProduct(loanShortName);
        Loans.enterTextIntoFeeAmountInputField("5.2");
        Loans.toggleApplyAmountOnlyInRangeToOn();
        Loans.selectRangeByName("MyRange_1");
        Loans.selectRangeSegmentByName("MyEnd(50,000.00 - )");
        Loans.clickEnabledUpdateChargeButton();
        //ToDo: details
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
    });
    it('should add fee', function () {
        //not possible yet
    });
    it('should enable the first loan product', function () {
        CustomerLoans.verifyMessagesAreDisplayed("Product not enabled", "To assign this product to a member it needs to be enabled first");
        Loans.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be enabled");
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
        Teller.enterTextIntoAmountInputField("1000");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("1000");
        Teller.verifyChargesPayedInCashCheckboxChecked();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('should assign loan product to customer - principal within range of processing/loan origination fee', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageLoanAccountsForMember(customerAccount);
        CustomerLoans.clickCreateLoanAccountForMember(customerAccount);
        CustomerLoans.selectProduct("My loan " + loanShortName);
        CustomerLoans.enterTextIntoShortNameInputField(loanAccountShortName);
        CustomerLoans.enterTextIntoPrincipalAmountInputField("50000");
        CustomerLoans.enterTextIntoInterestRateInputField("45.00");
        CustomerLoans.enterTextIntoTermInputField("240");
        CustomerLoans.selectDayForMonthlyRepayment("1.");
        CustomerLoans.selectDepositAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
        CustomerLoans.verifyButtonCreateMemberLoanEnabled();
        CustomerLoans.clickEnabledCreateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        Customers.verifyStateOfLoanAccountWithIdIs(loanAccountShortName, "CREATED");
        //details
        CustomerLoans.verifyPrincipalForLoanAccountInRow("50000", 1);
        CustomerLoans.verifyInterestForLoanAccountInRow("45", 1);
        CustomerLoans.verifyCurrentStatusForLoanAccountInRow("CREATED", 1);
        Common.clickLinkShowForRowWithId(loanAccountShortName);
        //details
        CustomerLoans.verifyLoanStatusIs("CREATED");
        CustomerLoans.verifyPrincipalAmountForLoan("50,000.00");
        CustomerLoans.verifyInterestForLoan("45.00");
        CustomerLoans.verifyPaymentCycleForLoan("Repay every 1 months", "on the 1. day");
        CustomerLoans.verifyTermForLoan("240 MONTHS");
        CustomerLoans.verifyMemberDepositAccountForLoan(customerAccount + ".9100.00001");
        CustomerLoans.verifyCreatedByForLoanIs(employeeIdentifier);
    });
    it('planned payment', function () {
        // CustomerLoans.viewPlannedPaymentForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        // error, ATEN-474
        // CustomerLoans.verifyBalanceForPlannedPaymentsInRow("1500" ,"1");
        // Common.clickBackButtonInTitleBar();
    });
    it('disburse loan and verify fees are applied as expected - principal in range', function () {
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.clickButtonForTask("OPEN");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("OPEN");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("PENDING");
        CustomerLoans.verifyEditLoanButtonIsDisplayed();
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        CustomerLoans.clickButtonForTask("APPROVE");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("APPROVE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("APPROVED");
        CustomerLoans.verifyMessagesAreDisplayed("Member loan approved", "To activate this loan you need to disburse");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
        //disburse loan; all three fees should be applied
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName);
        browser.sleep(10000);
        CustomerLoans.clickButtonForTask("DISBURSE");
        //principal amount
        //bug, fixed fee not applied although principal in range
        //ToDo: CustomerLoans.verifyTransactionCharge("Processing fee", "25.00");
        CustomerLoans.verifyTransactionCharge("Loan origination fee", "2,600.00");
        CustomerLoans.verifyTransactionCharge("Disbursement fee", "50.00");
        //CustomerLoans.verifyTransactionChargeTotal("2,675.00");
        CustomerLoans.clickButtonForTask("DISBURSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("ACTIVE");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
    });
    it('should assign loan product to customer - principal not within range of processing/loan origination fee', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageLoanAccountsForMember(customerAccount);
        CustomerLoans.clickCreateLoanAccountForMember(customerAccount);
        CustomerLoans.selectProduct("My loan " + loanShortName);
        CustomerLoans.enterTextIntoShortNameInputField(loanAccountShortName2);
        CustomerLoans.enterTextIntoPrincipalAmountInputField("49999.99");
        CustomerLoans.enterTextIntoInterestRateInputField("45.00");
        CustomerLoans.enterTextIntoTermInputField("240");
        CustomerLoans.selectDayForMonthlyRepayment("1.");
        CustomerLoans.selectDepositAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
        CustomerLoans.verifyButtonCreateMemberLoanEnabled();
        CustomerLoans.clickEnabledCreateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        Customers.verifyStateOfLoanAccountWithIdIs(loanAccountShortName2, "CREATED");
        //details
        CustomerLoans.verifyPrincipalForLoanAccountInRow("49999.99", 1);
        CustomerLoans.verifyInterestForLoanAccountInRow("45", 1);
        CustomerLoans.verifyCurrentStatusForLoanAccountInRow("CREATED", 1);
        Common.clickLinkShowForRowWithId(loanAccountShortName2);
        //details
        CustomerLoans.verifyLoanStatusIs("CREATED");
        CustomerLoans.verifyPrincipalAmountForLoan("49,999.99");
        CustomerLoans.verifyInterestForLoan("45.00");
        CustomerLoans.verifyPaymentCycleForLoan("Repay every 1 months", "on the 1. day");
        CustomerLoans.verifyTermForLoan("240 MONTHS");
        CustomerLoans.verifyMemberDepositAccountForLoan(customerAccount + ".9100.00001");
        CustomerLoans.verifyCreatedByForLoanIs(employeeIdentifier);
    });
    it('disburse loan and verify fees are applied as expected - principal in range', function () {
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName2);
        CustomerLoans.clickButtonForTask("OPEN");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("OPEN");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("PENDING");
        CustomerLoans.verifyEditLoanButtonIsDisplayed();
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName2);
        CustomerLoans.clickButtonForTask("APPROVE");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("APPROVE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("APPROVED");
        CustomerLoans.verifyMessagesAreDisplayed("Member loan approved", "To activate this loan you need to disburse");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
        //disburse loan; only disbursement fee should be applied (principal not in range of the other fees)
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName, loanAccountShortName2);
        //workaround for current bug
        browser.sleep(10000);
        CustomerLoans.clickButtonForTask("DISBURSE");
        //principal amount
        CustomerLoans.verifyTransactionCharge("Disbursement fee", "50.00");
        CustomerLoans.verifyTransactionChargeTotal("50.00");
        CustomerLoans.clickButtonForTask("DISBURSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("ACTIVE");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
    });
    it('make a loan repayment', function() {
        //first loan repayment, pay a bit more than expected payment amount
        Teller.goToTellerManagementViaSidePanel();
        Teller.clickButtonShowAtIndex(0);
        Teller.clickOnRepayLoanForCustomer(customerAccount);
        Teller.selectLoanAccountToBeAffected(customerAccount + ".clp.00001(" + loanShortName + ")");
        Teller.enterTextIntoAmountInputField("3000");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("3000");
        //ToDo: Teller.verifyTransactionCharge("repay-fees", "2675");
        //ToDo: Teller.verifyTransactionCharge("repay-principal", "325");
        Teller.verifyTransactionCharge("Total", "3000");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    }),
    it('journal entries should be as expected', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".9100.00001");
        Accounting.clickSearchButton();
        Accounting.verifyFirstJournalEntry("Account Opening", "Amount: 1,003.50");
        //ToDo: Accounting.verifySecondJournalEntry("Controlled Disbursement", "Amount: 52,675.00");
        Accounting.verifyThirdJournalEntry("Controlled Disbursement", "Amount: 50,049.99");
        //amount for principal payment is 1,003.50 only for some weird reason
       //ToDo: Accounting.verifyFourthJournalEntry("Principal Payment", "Amount: 3000");
    });
    it('edit fees for loan product and verify they update as expected', function () {
        //edit disbursement fee
        Loans.goToLoanProductsViaSidePanel();
        Common.clickLinkShowForRowWithId(loanShortName);
        Loans.clickLinkManageFeesForLoanProduct(loanShortName);
        Common.clickLinkShowForRowWithId("disbursement-fee");
        Loans.clickButtonEditDisbursementFeeForLoanProduct(loanShortName);
        //verify proportional set to "Maximum balance", is set to "Repayment" however
        Loans.enterTextIntoFeeAmountInputField("100");
        Loans.selectRadioFixed();
        Loans.selectRangeByName("MyRange_1");
        Loans.selectRangeSegmentByName("MyStart(0.00 - 28,000.00)");
        Loans.clickEnabledUpdateRangeButton();
        Common.verifyMessagePopupIsDisplayed("Fee is going to be saved");
        Common.clickBackButtonInTitleBar();
    });
    it('edit range in use by fee', function () {
        //bug: currently ranges can not be added, edited, or deleted anymore if loan product assigned to a member already
        Loans.clickLinkManageRangesForLoanProduct(loanShortName);
        Common.clickLinkShowForRowWithId("MyRange_1");
        Loans.clickButtonEditRange();
        Loans.removeRangeAtPosition(1);
        //ToDo: range end for first range segment updates to 50,000
        Loans.enterTextIntoRangeSegmentStartInputField("45000", 2);
        Loans.clickEnabledUpdateRangeButton();
        Common.verifyMessagePopupIsDisplayed("Range is going to be saved");
    });
});