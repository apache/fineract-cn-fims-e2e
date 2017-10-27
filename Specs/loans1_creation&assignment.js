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


describe('Loans 1', function() {
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
    it('should not be possible to create loan account for pending customer', function () {
        Common.clickLinkShowForFirstRowInTable();
        Customers.clickManageLoanAccountsForMember(customerAccount);
        CustomerLoans.verifyCreateLoanButtonIsNotDisplayed();
    });
    it('should activate the customer', function () {
        Common.clickBackButtonInTitleBar();
        Customers.verifyMemberHasStatusInactive();
        Customers.clickButtonGoToTasks();
        Customers.clickButtonActivate();
        Common.verifyMessagePopupIsDisplayed("Command is going to be executed");
        Customers.verifyMemberHasStatusActive();
    });
    it('should create another customer - co-signer', function () {
        Common.clickBackButtonInTitleBar();
        Common.verifyCardHasTitle("Manage members");
        Customers.clickButtonOrLinkCreateNewMember();
        Common.verifyCardHasTitle("Create new member");
        Customers.enterTextIntoAccountInputField(customerAccount2);
        Customers.enterTextIntoFirstNameInputField("Bob");
        Customers.enterTextIntoLastNameInputField("Dylan");
        Customers.enterTextIntoDayOfBirthInputField("9211978");
        Customers.uncheckMemberCheckbox();
        Customers.clickEnabledContinueButtonForMemberDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForMemberAddress();
        Customers.clickEnabledCreateMemberButton();
        Common.verifyMessagePopupIsDisplayed("Member is going to be saved");
        Common.verifyCardHasTitle("Manage members");
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount2);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount2);
    });
    it('should create a deposit account - Checking with opening charge of 0', function () {
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
    it('create first loan product - interest range, max term 5 years, default fees/no tasks', function () {
        Loans.goToLoanProductsViaSidePanel();
        Loans.clickButtonCreateLoanProduct();
        //product details
        Loans.enterTextIntoShortNameInputField(loanShortName);
        Loans.enterTextIntoNameInputField("My loan " + loanShortName);
        Loans.enterTextIntoDescriptionInputField("My loan " + loanShortName);
        Loans.enterTextIntoMinimumPrincipalInputField("10000");
        Loans.enterTextIntoMaximumPrincipalInputField("9999.99");
        //not possible, invalid input
        Loans.verifyPrincipalAmountInputFieldsHaveError("Must be greater than or equal minimum");
        Loans.enterTextIntoMaximumPrincipalInputField("50000");
        //maximum term: 5 years
        Loans.enterTextIntoTermInputField("5");
        Loans.selectRadioButtonYears();
        Loans.clickEnabledContinueButtonForProductDetails();
        //ledger and account settings
        //ToDo: asset account only
        Loans.enterTextIntoCashAccountInputField(tellerAccount);
        //ToDo: asset ledger only
        Loans.enterTextIntoCustomerLoanLedgerInputField("7900");
        Loans.clickEnabledContinueButtonForLedgerAndAccountSettings();
        //interest settings
        Loans.toggleInterestRangeToOn();
        Loans.enterTextIntoInterestRangeMinInputField("5.0");
        Loans.enterTextIntoInterestRangeMaxInputField("4.99");
        //not possible, invalid input
        Loans.verifyInterestRangeInputFieldsHaveError("Must be greater than minimum");
        Loans.enterTextIntoInterestRangeMinInputField("0.80");
        Loans.enterTextIntoInterestRangeMaxInputField("3.60");
        //ToDo: revenue account only
        Loans.enterTextIntoIncomeAccountAccountInputField("1101");
        //ToDo: asset account only
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
    it('should enable the first loan product', function () {
        Common.clickLinkShowForRowWithId(loanShortName);
        //ToDo: details
        CustomerLoans.verifyMessagesAreDisplayed("Product not enabled", "To assign this product to a member it needs to be enabled first");
        Loans.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be enabled");
    });
    it('create second loan product - interest rate, max term 52 weeks, default fees/no tasks', function () {
        Loans.goToLoanProductsViaSidePanel();
        Loans.clickButtonCreateLoanProduct();
        //product details
        Loans.enterTextIntoShortNameInputField(loanShortName2);
        Loans.enterTextIntoNameInputField("My loan " + loanShortName2);
        Loans.enterTextIntoDescriptionInputField("My loan " + loanShortName2);
        Loans.enterTextIntoMinimumPrincipalInputField("500");
        Loans.enterTextIntoMaximumPrincipalInputField("1500");
        Loans.selectCurrencyByName("JMD");
        //maximum term: 52 weeks
        Loans.enterTextIntoTermInputField("52");
        Loans.selectRadioButtonWeeks();
        Loans.clickEnabledContinueButtonForProductDetails();
        //ledger and account settings
        Loans.enterTextIntoCashAccountInputField(tellerAccount);
        Loans.enterTextIntoCustomerLoanLedgerInputField("7900");
        Loans.clickEnabledContinueButtonForLedgerAndAccountSettings();
        //interest settings
        Loans.verifyInterestRangeToggleSetToOff();
        Loans.enterTextIntoInterestRateInputField("15.00");
        Loans.enterTextIntoIncomeAccountAccountInputField("1101");
        Loans.enterTextIntoAccrualAccountInputField("7810");
        Loans.clickEnabledContinueButtonForInterestSettings();
        //fee income accounts
        //revenue accounts only
        Loans.enterTextIntoProcessingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoOriginatingFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoDisbursementFeeIncomeAccountInputField("1313");
        Loans.enterTextIntoLateFeeIncomeAccountInputField("1311");
        //asset accounts only
        Loans.enterTextIntoLateFeeAccrualAccountInputField("7810");
        Loans.clickEnabledContinueButtonForFeeIncomeAccounts();
        //arrears allowance reserve account
        //expense accounts only
        Loans.enterTextIntoArrearsAllowanceAccountInputField("3040");
        Loans.clickEnabledCreateProductButton();
        Common.verifyMessagePopupIsDisplayed("Product is going to be saved");
    });
    it('should configure loan loss provision', function () {
        Common.clickLinkShowForRowWithId(loanShortName2);
        //ToDo: details
        Loans.clickLinkLossProvisionConfigurationForLoanProduct(loanShortName2);
        Loans.clickButtonEditLossProvisionConfigurationForLoanProduct(loanShortName2);
        Loans.clickButtonAddStep();
        Loans.enterTextIntoPercentProvisionInputField("5", 1);
        Loans.clickButtonAddStep();
        Loans.enterTextIntoDaysLateInputField("10", 2);
        Loans.enterTextIntoPercentProvisionInputField("25", 2);
        Loans.clickEnabledUpdateLossProvisionButton();
        Common.verifyMessagePopupIsDisplayed("Loss provision configuration is going to be saved");
    });
    it('should not be able to select loan product if not enabled', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForFirstRowInTable();
        Customers.clickManageLoanAccountsForMember(customerAccount);
        Customers.clickCreateLoanAccountForMember(customerAccount);
        //verify loan product cannot be selected
        CustomerLoans.verifyLoanAccountNotOfferedForSelection(loanShortName2);
        Customers.selectProductFromOpenList(loanShortName);
    });
    it('should not be able to select deposit account if not enabled', function () {
        //verify deposit account cannot be selected
        CustomerLoans.verifyDepositAccountNotOfferedForSelection(customerAccount + ".9100.00001(" + depositIdentifier +")");
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
    it('should enable the second loan product', function () {
        Loans.goToLoanProductsViaSidePanel();
        Common.clickLinkShowForRowWithId(loanShortName2);
        Loans.verifyEditLoanProductButtonIsDisplayed();
        Loans.clickButtonEnableProduct();
        Common.verifyMessagePopupIsDisplayed("Product is going to be enabled");
    });
    it('loan product cannot be edited when enabled', function () {
        Loans.verifyEditLoanProductButtonIsNotDisplayed();
    });
    it('should assign loan product to customer', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageLoanAccountsForMember(customerAccount);
        CustomerLoans.clickCreateLoanAccountForMember(customerAccount);
        CustomerLoans.selectProduct("My loan " + loanShortName);
        CustomerLoans.enterTextIntoShortNameInputField(loanAccountShortName);
        CustomerLoans.enterTextIntoPrincipalAmountInputField("9999.99");
        //invalid input, error
        CustomerLoans.verifyPrincipalInputFieldHasError("Value must be greater than or equal to 10000");
        CustomerLoans.enterTextIntoPrincipalAmountInputField("50,000.01");
        //invalid input, error
        CustomerLoans.verifyPrincipalInputFieldHasError("Value must be smaller than or equal to 50000");
        CustomerLoans.enterTextIntoPrincipalAmountInputField("10,000");
        CustomerLoans.enterTextIntoInterestRateInputField("3.65");
        //invalid input, error
        CustomerLoans.verifyInterestRateInputFieldHasError("Value must be smaller than or equal to 3.6");
        CustomerLoans.enterTextIntoInterestRateInputField("0.79");
        //invalid input, error
        CustomerLoans.verifyInterestRateInputFieldHasError("Value must be greater than or equal to 0.8");
        CustomerLoans.enterTextIntoInterestRateInputField("3.60");
        CustomerLoans.enterTextIntoTermInputField("62");
        //invalid input, error: Invalid term. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).
        CustomerLoans.verifyTermInputFieldHasErrorForInvalidTerm("Invalid term. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).");
        CustomerLoans.enterTextIntoTermInputField("59.9");
        //invalid input, error: Value scale must be smaller than or equal to 0
        CustomerLoans.verifyTermInputFieldHasError("Value scale must be smaller than or equal to 0");
        CustomerLoans.enterTextIntoTermInputField("60");
        CustomerLoans.selectTemporalUnitForTerm("years");
        //invalid input, error
        CustomerLoans.verifyTermInputFieldHasErrorForInvalidTerm("Invalid term. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).");
        CustomerLoans.enterTextIntoTermInputField("5");
        //valid input, no error
        CustomerLoans.enterTextIntoPaymentPeriodInputField("62");
        //invalid input, error: Invalid payment period. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).
        CustomerLoans.verifyRepayEveryFieldHasErrorForInvalidTerm("Invalid payment period. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).");
        CustomerLoans.enterTextIntoPaymentPeriodInputField("6");
        //valid input, no error
        CustomerLoans.selectPaymentPeriod("years");
        //invalid input, error
        CustomerLoans.verifyRepayEveryFieldHasErrorForInvalidTerm("Invalid payment period. Maximum allowed are 260 week(s), 60 month(s) or 5 year(s).");
        CustomerLoans.selectPaymentPeriod("months");
        //valid input, no error
        CustomerLoans.selectSecondRadioOptionForMonthlyRepayment();
        CustomerLoans.selectWeekdayForMonthlyRepayment("last", "Friday");
        CustomerLoans.selectDepositAccount(customerAccount + ".9100.00001(" + depositIdentifier + ")");
        //change loan product to the other one
        CustomerLoans.selectProduct(loanShortName2);
        CustomerLoans.verifyPrincipalInputFieldHasError("Value must be smaller than or equal to 1500");
        CustomerLoans.enterTextIntoPrincipalAmountInputField("1500");
        CustomerLoans.verifyInterestRateInputFieldIsDisabledAndHasText("15.00");
        CustomerLoans.verifyTermInputFieldHasErrorForInvalidTerm("Invalid term. Maximum allowed are 52 week(s), 12 month(s) or 1 year(s).");
        CustomerLoans.selectTemporalUnitForTerm("months");
        CustomerLoans.verifyRepayEveryFieldHasErrorForInvalidTerm("Invalid payment period. Maximum allowed are 21 week(s), 5 month(s) or 0 year(s).");
        //debt to income ratio
        CustomerLoans.goToStepDebtToIncomeRatio();
        CustomerLoans.clickButtonAddDebt();
        CustomerLoans.enterTextDescriptionInputFieldForDebt("My loan", 1);
        CustomerLoans.enterTextIntoAmountInputFieldForDebt("10000", 1);
        CustomerLoans.verifyDebtTotalIs("10,000.00");
        CustomerLoans.clickButtonAddDebt();
        CustomerLoans.enterTextDescriptionInputFieldForDebt("My mortgage", 2);
        CustomerLoans.enterTextIntoAmountInputFieldForDebt("5000", 2);
        CustomerLoans.verifyDebtTotalIs("15,000.00");
        CustomerLoans.clickButtonAddIncome();
        CustomerLoans.enterTextIntoDescriptionInputFieldForIncome("First job", 1);
        CustomerLoans.enterTextIntoAmountInputFieldForIncome("5000",1);
        CustomerLoans.verifyIncomeTotalIs("5,000.00");
        CustomerLoans.verifyDebtIncomeRatioIs("03.00");
        CustomerLoans.clickButtonAddIncome();
        CustomerLoans.enterTextIntoDescriptionInputFieldForIncome("Second job", 2);
        CustomerLoans.enterTextIntoAmountInputFieldForIncome("5000",2);
        CustomerLoans.verifyIncomeTotalIs("10,000.00");
        CustomerLoans.verifyDebtIncomeRatioIs("01.50");
        CustomerLoans.goToStepCoSigner();
        //co-signer, need another member
        //ToDo: cannot select same member to be co-signer
        CustomerLoans.enterTextIntoMemberInputField(customerAccount2);
        CustomerLoans.clickButtonAddDebt();
        CustomerLoans.enterTextDescriptionInputFieldForDebtCosigner("Co-signer debt", 1);
        CustomerLoans.enterTextIntoAmountInputFieldForDebtCosigner("500", 1);
        CustomerLoans.clickButtonAddIncome();
        CustomerLoans.enterTextIntoDescriptionInputFieldForIncomeCosigner("Co-signer income", 1);
        CustomerLoans.enterTextIntoAmountInputFieldForIncomeCosigner("1200", 1);
        //still error for payment period
        CustomerLoans.verifyButtonCreateMemberLoanDisabled();
        CustomerLoans.goToStepLoanDetails();
        CustomerLoans.enterTextIntoPaymentPeriodInputField("5");
        CustomerLoans.verifyButtonCreateMemberLoanEnabled();
        CustomerLoans.clickEnabledCreateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        Customers.verifyStateOfLoanAccountWithIdIs(loanAccountShortName, "CREATED");
        //details
        CustomerLoans.verifyPrincipalForLoanAccountInRow("1500", 1);
        CustomerLoans.verifyInterestForLoanAccountInRow("15", 1);
        CustomerLoans.verifyCurrentStatusForLoanAccountInRow("CREATED", 1);
        Common.clickLinkShowForRowWithId(loanAccountShortName);
        //details
        CustomerLoans.verifyLoanStatusIs("CREATED");
        CustomerLoans.verifyPrincipalAmountForLoan("1,500.00");
        CustomerLoans.verifyInterestForLoan("15.00");
        CustomerLoans.verifyPaymentCycleForLoan("Repay every 5 months", "on the last Friday");
        CustomerLoans.verifyTermForLoan("5 MONTHS");
        CustomerLoans.verifyMemberDepositAccountForLoan(customerAccount + ".9100.00001");
        CustomerLoans.verifyCreatedByForLoanIs(employeeIdentifier);
    });
    it('planned payment', function () {
        // CustomerLoans.viewPlannedPaymentForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        // error, ATEN-474
        // CustomerLoans.verifyBalanceForPlannedPaymentsInRow("1500" ,"1");
        // Common.clickBackButtonInTitleBar();
    });
    it('debt/income ratio', function () {
        CustomerLoans.viewDebtIncomeReportForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.verifyMemberRatioIs("01.50");
        //ToDo: more details
        CustomerLoans.verifyCoSignerRatioIs("00.42");
        //ToDo: more details
        Common.clickBackButtonInTitleBar();
    });
    it('should be able to edit loan account until it has been approved', function () {
        CustomerLoans.clickUpdateLoanAccountForMember(customerAccount, loanShortName2, loanAccountShortName);
        //edit loan account settings
        //ToDo: different loan product - should not be possible or work as expected (currently error on saving)
        CustomerLoans.enterTextIntoPrincipalAmountInputField("500");
        CustomerLoans.verifyInterestRateInputFieldIsDisabledAndHasText("15.00");
        CustomerLoans.enterTextIntoTermInputField("50");
        CustomerLoans.selectTemporalUnitForTerm("weeks");
        CustomerLoans.enterTextIntoPaymentPeriodInputField("10");
        CustomerLoans.selectPaymentPeriod("weeks");
        CustomerLoans.clickEnabledUpdateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        //planned payment
        CustomerLoans.viewPlannedPaymentForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.verifyBalanceForPlannedPaymentsInRow("500" ,"1");
        CustomerLoans.verifyBalanceForPlannedPaymentsInRow("0" ,"6");
        Common.clickBackButtonInTitleBar();
        //edit loan account again and update debt to income ratio
        CustomerLoans.clickUpdateLoanAccountForMember(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.goToStepDebtToIncomeRatio();
        CustomerLoans.removeDebtAtPosition(1);
        CustomerLoans.verifyDebtTotalIs("5,000.00");
        CustomerLoans.verifyDebtIncomeRatioIs("00.50");
        CustomerLoans.enterTextIntoAmountInputFieldForIncome("100000", 2);
        CustomerLoans.verifyIncomeTotalIs("105,000.00");
        CustomerLoans.verifyDebtIncomeRatioIs("00.05");
        CustomerLoans.clickEnabledUpdateMemberLoanButton();
        Common.verifyMessagePopupIsDisplayed("Case is going to be saved");
        //debt to income report
        CustomerLoans.viewDebtIncomeReportForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.verifyMemberRatioIs("00.05");
        CustomerLoans.verifyCoSignerRatioIs("00.42");
        //ToDo: more details
        Common.clickBackButtonInTitleBar();
    });
    it('should not be able to edit loan account once it has been approved', function () {
        //open loan; can still be edited
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.clickButtonForTask("OPEN");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("OPEN");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("PENDING");
        CustomerLoans.verifyEditLoanButtonIsDisplayed();
        //approve loan; can no longer be edited
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        //ToDo: task DENY offered here too
        CustomerLoans.clickButtonForTask("APPROVE");
        //principal amount, costs
        CustomerLoans.clickButtonForTask("APPROVE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("APPROVED");
        CustomerLoans.verifyMessagesAreDisplayed("Member loan approved", "To activate this loan you need to disburse");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
        //disburse loan; default fees & loss provision configured
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        //ToDo: task CLOSE offered here too
        browser.sleep(10000);
        CustomerLoans.clickButtonForTask("DISBURSE");
        //principal amount
        CustomerLoans.verifyTransactionCharge("Loan origination fee", "05.00");
        CustomerLoans.verifyTransactionCharge("Disbursement fee", "00.50");
        CustomerLoans.verifyTransactionCharge("Processing fee", "05.00");
        CustomerLoans.verifyTransactionChargeTotal("10.50");
        CustomerLoans.clickButtonForTask("DISBURSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("ACTIVE");
        CustomerLoans.verifyEditLoanButtonIsNotDisplayed();
        //ToDo: task CLOSE --> bug; closing seems successful but isn't (should not be possible or should work)
    });
    it('should be able to add documents to loan', function () {
        CustomerLoans.viewLoanDocumentsForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.createDocumentForLoanAccount(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.enterTextIntoDescriptionInputField("My document #1");
        CustomerLoans.clickEnabledCreateDocumentButton();
        Common.verifyMessagePopupIsDisplayed("Document is going to be saved");
        Common.clickLinkShowForFirstRowInTable();
        CustomerLoans.verifyMessagesAreDisplayed("Document not locked", "You can lock this document");
        //details
        CustomerLoans.verifyDescriptionForDocumentIs("My document #1");
        CustomerLoans.verifyCreatedByForDocumentIs(employeeIdentifier);
        //document can be edited
        CustomerLoans.verifyDocumentCanBeEdited();
        CustomerLoans.clickButtonEditDocument();
        CustomerLoans.enterTextIntoDescriptionInputField("My document #1 - Edited");
        CustomerLoans.clickEnabledUpdateDocumentButton();
        CustomerLoans.verifyDescriptionForDocumentIs("My document #1 - Edited");
        //document can be deleted
        CustomerLoans.verifyDocumentCanBeDeleted();
        //ToDo: upload???
        //lock document
        CustomerLoans.clickButtonLock();
        Common.verifyMessagePopupIsDisplayed("Document locked");
        CustomerLoans.verifyMessageDisplayed("Document locked");
        CustomerLoans.verifyDocumentCannotBeEdited();
        CustomerLoans.verifyDocumentCannotBeDeleted();
    });
    it('journal entry should be as expected', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".9100.00001");
        Accounting.clickSearchButton();
        Accounting.verifySecondJournalEntry("Controlled Disbursement", "Amount: 535.50");
        Accounting.clickSecondJournalEntry();
        //ToDo: order changes, improve verification
        Accounting.verifyAccountHasBeenDebitedWithAmount("3040", "25.00");
        Accounting.verifyAccountHasBeenDebitedWithAmount(customerAccount + ".clp.00001", "500.00");
        Accounting.verifyAccountHasBeenDebitedWithAmount(customerAccount + ".clf.00002", "10.50");
        Accounting.verifyAccountHasBeenCreditedWithAmount("1313", "10.50");
        Accounting.verifyAccountHasBeenCreditedWithAmount(customerAccount + ".9100.00001", "500.00");
        Accounting.verifyAccountHasBeenCreditedWithAmount(loanShortName2 + ".pa.00000", "25.00");
    });
    it('repay loan and close loan account', function() {
        //first loan repayment; fees only partially covered
        Teller.goToTellerManagementViaSidePanel();
        Teller.clickButtonShowAtIndex(0);
        Teller.clickOnRepayLoanForCustomer(customerAccount);
        Teller.selectLoanAccountToBeAffected(customerAccount + ".clp.00001(" + loanShortName2 + ")");
        Teller.enterTextIntoAmountInputField("10");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("10");
        Teller.verifyTransactionCharge("repay-fees", "10");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //second loan repayment
        Teller.clickOnRepayLoanForCustomer(customerAccount);
        Teller.selectLoanAccountToBeAffected(customerAccount + ".clp.00001(" + loanShortName2 + ")");
        Teller.enterTextIntoAmountInputField("10");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("10");
        Teller.verifyTransactionCharge("repay-principal", "9.5");
        Teller.verifyTransactionCharge("repay-fees", "0.5");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //repay rest of loan
        //ToDo: nowhere to be seen how much that is; should not be able to overpay
        Teller.clickOnRepayLoanForCustomer(customerAccount);
        Teller.selectLoanAccountToBeAffected(customerAccount + ".clp.00001(" + loanShortName2 + ")");
        Teller.enterTextIntoAmountInputField("500");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("500");
        Teller.verifyTransactionCharge("repay-principal", "490.5");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //ToDo: loan should no longer be offered for selection once repaid
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".clf.00002");
        Accounting.clickSearchButton();
        Accounting.verifySecondJournalEntry("Principal Payment", "Amount: 10.00");
        Accounting.clickSecondJournalEntry();
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, "10.00", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(customerAccount + ".clf.00002", "10.00", 2);
        Accounting.verifyThirdJournalEntry("Principal Payment", "Amount: 10.00");
        Accounting.clickThirdJournalEntry();
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, "10.00", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmount(customerAccount + ".clf.00002", "0.50");
        Accounting.verifyAccountHasBeenCreditedWithAmount(customerAccount + ".clp.00001", "9.50");
        Accounting.enterTextIntoSearchAccountInputField(customerAccount + ".clp.00001");
        Accounting.clickSearchButton();
        Accounting.verifyThirdJournalEntry("Principal Payment", "Amount: 490.50");
        Accounting.clickThirdJournalEntry();
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, "490.50", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(customerAccount + ".clp.00001", "490.50", 2);
        //close loan and verify action "Repay loan" is no longer offered
        Customers.goToManageCustomersViaSidePanel();
        Common.clickSearchButtonToMakeSearchInputFieldAppear();
        Common.enterTextInSearchInputFieldAndApplySearch(customerAccount);
        Common.verifyFirstRowOfSearchResultHasTextAsId(customerAccount);
        Common.clickLinkShowForRowWithId(customerAccount);
        Customers.clickManageLoanAccountsForMember(customerAccount);
        Common.clickLinkShowForFirstRowInTable();
        CustomerLoans.goToTasksForCustomerLoan(customerAccount, loanShortName2, loanAccountShortName);
        CustomerLoans.clickButtonForTask("CLOSE");
        CustomerLoans.clickButtonForTask("CLOSE");
        Common.verifyMessagePopupIsDisplayed("Case is going to be updated");
        CustomerLoans.verifyLoanStatusIs("CLOSED");
        Common.clickBackButtonInTitleBar();
        CustomerLoans.verifyCurrentStatusForLoanAccountInRow("CLOSED", 1);
        Teller.goToTellerManagementViaSidePanel();
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyActionRepayLoanNotOfferedForCustomer(customerAccount);
    }),
    it('update/deletion of unassigned/assigned product', function () {
        browser.pause();
        //assigned product cannot be deleted anymore
        //what about disabled/edited?
        //disable assigned product & check customer loan account: ATEN-475
        //try to edit assigned product: ATEN-507
        //fees: try to edit fees
        //tasks: try to edit/add tasks: bug ATEN-318
        //unassigned product can be disabled/edited
        //edit product and verify updated, edit fees and add tasks
        //unassigned product can be deleted
    });
});