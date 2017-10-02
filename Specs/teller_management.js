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
var Cheques = require('../Pages/Cheques');

describe('teller_management', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    employeeIdentifier2 = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    officeIdentifier2 = helper.getRandomString(12);
    tellerIdentifier = helper.getRandomString(4);
    tellerIdentifier2 = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    customerAccount2 = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(5);
    depositName = helper.getRandomString(8);
    tellerAccount = helper.getRandomString(4);
    vaultAccount = helper.getRandomString(4);
    chequesReceivableAccount = helper.getRandomString(4);
    revenueAccount = helper.getRandomString(4);
    loanShortName = helper.getRandomString(6);
    taskIdentifier = helper.getRandomString(3);
    loanAccountShortName =  helper.getRandomString(4);
    branchSortCode = helper.getRandomString(11);
    branchSortCode2 = helper.getRandomString(11);

    it('should create new accounts', function () {
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Accounting.clickCreateNewAccountInLedger("7300");
        Accounting.enterTextIntoAccountIdentifierInputField(tellerAccount);
        Accounting.enterTextIntoAccountNameInputField("My teller");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
        Accounting.clickCreateNewAccountInLedger("7300");
        Accounting.enterTextIntoAccountIdentifierInputField(vaultAccount);
        Accounting.enterTextIntoAccountNameInputField("My vault");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
        Common.clickBackButtonInTitleBar();
        Common.clickLinkShowForRowWithId("7200");
        Accounting.clickCreateNewAccountInLedger("7200");
        Accounting.enterTextIntoAccountIdentifierInputField(chequesReceivableAccount);
        Accounting.verifyRadioAssetToBeSelected();
        Accounting.verifyRadioAssetToBeDisabled();
        Accounting.enterTextIntoAccountNameInputField("Cheques Receivable");
        Accounting.clickButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
    });
    it('should create two new employees with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Paul", "Auster", "Administrator", "abc123!!");
        Employees.createEmployee(employeeIdentifier2, "Angela", "Carter", "Administrator", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
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
    it('should create a deposit account - Checking with opening charge', function () {
        Deposits.goToDepositsViaSidePanel();
        Common.verifyCardHasTitle("Manage deposit products");
        Deposits.clickButtonCreateDepositAccount();
        Common.verifyCardHasTitle("Create new deposit product");
        Deposits.enterTextIntoShortNameInputField(depositIdentifier);
        Deposits.verifyRadioCheckingIsSelected();
        Deposits.selectRadioButtonShare();
        Deposits.enterTextIntoNameInputField(depositName);
        Deposits.enterTextIntoMinimumBalanceInputField("100");
        Deposits.enterTextIntoInterestInputField("0.05");
        Deposits.enterTextIntoCashAccountInputField("7352");
        Deposits.enterTextIntoExpenseAccountInputField("2820");
        Deposits.enterTextIntoEquityLedgerInputField("9100");
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
    });
    it('should create a new branch office and a teller for the branch office', function () {
        Offices.goToManageOfficesViaSidePanel();
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
        Common.clickLinkShowForFirstRowInTable();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Offices.clickCreateTellerForOfficeByIdentifier(officeIdentifier);
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Offices.enterTextIntoPasswordInputField("qazwsx123!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("1000");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry(tellerAccount);
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry(vaultAccount);
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequesReceivableAccount);
        Offices.clickCreateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
        //workaround for current bug that teller is not always listed immediately
        Common.clickBackButtonInTitleBar();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Common.clickLinkShowForRowWithId(tellerIdentifier);
        Offices.verifyTellerStatusIs("CLOSED");
        Offices.verifyMessageDisplayed("Teller can be opened");
    });
    it('should open the teller - Cash in', function () {
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier, officeIdentifier);
        Offices.verifyRadioNoneSelected();
        Offices.verifyAmountInputDisabledIfNoneSelected();
        Offices.selectRadioCashIn();
        Offices.verifyAmountInputEnabledIfCashInSelected();
        Offices.enterTextIntoAmountInputField("2500");
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier2);
        Offices.selectOptionInListByName("Carter, Angela");
        Offices.clickEnabledOpenTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("OPEN");
        Offices.verifyAssignedEmployeeForTellerIs(employeeIdentifier2);
        Offices.viewTellerBalanceForTellerInOffice(tellerIdentifier, officeIdentifier);
        Offices.verifyTellerTransactionMessageForRow("Teller adjustment.", 1);
        Offices.verifyTellerDebitTransactionAmountForRow("2,500", 1);
    });
    it('Journey entry has been created and account entries are as expected', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(vaultAccount);
        Accounting.clickSearchButton();
        Accounting.verifyFirstJournalEntry("Debit Adjustments", "Amount: 2,500.00");
        Accounting.verifyClerkForJournalEntryIs(employeeIdentifier);
        Accounting.verifyMessageForJournalEntryIs("Teller adjustment.");
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, "2,500.00", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(vaultAccount, "2,500.00", 2);
        Common.clickBackButtonInTitleBar();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Common.clickLinkShowForRowWithId(vaultAccount);
        Accounting.viewAccountEntriesForAccount(vaultAccount);
        Accounting.verifyTransactionTypeForRow("CREDIT", 1);
        Accounting.verifyTransactionMessageForRow("Teller adjustment.", 1);
        Accounting.verifyTransactionAmountForRow("2500", 1);
        Accounting.verifyTransactionBalanceForRow("-2500", 1);
        Common.clickBackButtonInTitleBar();
        Common.clickBackButtonInTitleBar();
        Common.clickLinkShowForRowWithId(tellerAccount);
        Accounting.viewAccountEntriesForAccount(tellerAccount);
        Accounting.verifyTransactionTypeForRow("DEBIT", 1);
        Accounting.verifyTransactionMessageForRow("Teller adjustment.", 1);
        Accounting.verifyTransactionAmountForRow("2500", 1);
        Accounting.verifyTransactionBalanceForRow("2500", 1);
    });
    it('employee assigned to teller unlocks the teller and verifies cashdraw limit as expected', function () {
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier2, "abc123!!", "abc123??");
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller drawer unlocked");
        Teller.enterTextIntoSearchInputField(customerAccount);
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Samuel Beckett");
        //only action possible: Open account
        Teller.verifyActionCloseAccountNotOfferedForCustomer(customerAccount);
        Teller.verifyActionAccountTransferNotOfferedForCustomer(customerAccount);
        Teller.verifyActionCashDepositNotOfferedForCustomer(customerAccount);
        Teller.verifyActionCashWithdrawalNotOfferedForCustomer(customerAccount);
        Teller.verifyActionCashChequeNotDisplayedForCustomer(customerAccount);
        Teller.verifyActionRepayLoanNotOfferedForCustomer(customerAccount);
        //open the customer's account
        Teller.clickOnOpenAccountForCustomer(customerAccount);
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Teller.enterTextIntoAmountInputField("2000.00");
        Teller.clickEnabledCreateTransactionButton();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //workaround for actions not updating immediately
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoSearchInputField(customerAccount);
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Samuel Beckett");
        //action no longer possible: Open account; instead closing account not possible
        Teller.verifyActionCloseAccountOfferedForCustomer(customerAccount);
        Teller.verifyActionOpenAccountNotOfferedForCustomer(customerAccount);
        Teller.clickOnCashWithdrawalForCustomer(customerAccount);
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Teller.verifyCashdrawLimitHintIsDisplayed("Cashdraw limit is: 1,000.00");
        Teller.enterTextIntoAmountInputField("1000.01");
        Teller.verifyAmountInputFieldHasError("Value must be smaller than or equal to 1000");
        Teller.verifyCreateTransactionButtonIsDisabled();
    });
    it('employee not assigned to teller should not be able to unlock the teller', function () {
        //workaround for bug on logging out from within teller transaction
        Teller.goToTellerManagementViaSidePanel();
        Login.signOut();
        Login.logInWithTenantUserAndPassword("playground", employeeIdentifier, "abc123??");
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("qazwsx123!!");
        Teller.clickEnabledUnlockTellerButton();
        Login.verifyMessageForUnsuccessfulLoginIsDisplayed();
    });
    it('should be able to update teller', function () {
        Offices.goToManageOfficesViaSidePanel();
        Common.clickLinkShowForRowWithId(officeIdentifier);
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Common.clickLinkShowForRowWithId(tellerIdentifier);
        Offices.verifyNumberForTellerIs(tellerIdentifier);
        Offices.verifyCashWithdrawalLimitIs("1000");
        Offices.verifyTellerAccountIs(tellerAccount);
        Offices.verifyVaultAccountIs(vaultAccount);
        Offices.verifyChequesReceivableAccountIs(chequesReceivableAccount);
        Offices.verifyCreatedByForTellerIs(employeeIdentifier);
        Offices.clickButtonEditForTellerInOffice(tellerIdentifier, officeIdentifier);
        Offices.enterTextIntoPasswordInputField("123abc!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("500");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry("7353");
        Offices.clickUpdateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
        //when does teller status change from OPEN to ACTIVE?
        Offices.verifyTellerStatusIs("ACTIVE");
        Offices.verifyCashWithdrawalLimitIs("500");
        Offices.verifyTellerAccountIs("7353");
        //bug, "Last modified by" not updated immediately
        //Offices.verifyLastModifiedByForTellerIs(employeeIdentifier);
        //teller balance empty since account now different (7353 might not be empty, create new account)
        Offices.viewTellerBalanceForTellerInOffice(tellerIdentifier, officeIdentifier);
        Offices.verifyCurrentTellerBalance("0");

    });
    it('teller should have updated as expected', function () {
        Login.signOut();
        Login.logInWithTenantUserAndPassword("playground", employeeIdentifier2, "abc123??");
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        //password has been updated
        Teller.enterTextIntoPasswordInputField("123abc!!");
        Teller.clickEnabledUnlockTellerButton();
        Teller.enterTextIntoSearchInputField(customerAccount);
        Teller.clickButtonShowAtIndex(0);
        Teller.verifyCardTitleHasNameOfCustomer("Samuel Beckett");
        //cash withdrawal limit has been updated
        Teller.clickOnCashWithdrawalForCustomer(customerAccount);
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Teller.verifyCashdrawLimitHintIsDisplayed("Cashdraw limit is: 500.00");
        Teller.enterTextIntoAmountInputField("500.01");
        Teller.verifyAmountInputFieldHasError("Value must be smaller than or equal to 500");
        Teller.verifyCreateTransactionButtonIsDisabled();
        Teller.enterTextIntoAmountInputField("500.00");
        Teller.clickEnabledCreateTransactionButton();
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
        //verify money has been taken out of account 7353
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField("7353");
        Accounting.clickSearchButton();
        Accounting.verifyFirstJournalEntry("Cash Withdrawal", "Amount: 500.00");
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow("7353", "500.00", 2);
    });
    it('should create a new teller - validation', function () {
        Offices.goToManageOfficesViaSidePanel();
        Offices.goToManageTellersForOfficeByIdentifier("hqo1");
        Offices.clickCreateTellerForOfficeByIdentifier("hqo1");
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier2);
        Offices.enterTextIntoPasswordInputField("hqo1_abc");
        Offices.enterTextIntoCashWithdrawalLimitInputField("0");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry(tellerAccount);
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry(vaultAccount);
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequesReceivableAccount);
        Offices.verifyCashWithdrawalLimitInputFieldHasError("Value must be greater than 0");
        Offices.verifyCreateTellerButtonIsDisabled();
        Offices.enterTextIntoCashWithdrawalLimitInputField("20");
        Offices.verifyCreateTellerButtonIsEnabled();
        Offices.enterTextIntoChequesReceivableAccountInputField("9999");
        Offices.enterTextIntoVaultAccountInputField("8410");
        //fields should have error "Invalid account"
        //Offices.verifyChequesReceivableAccountInputFieldHasError("Invalid account");
        //Offices.verifyCreateTellerButtonIsDisabled();
        Offices.enterTextIntoVaultAccountInputField(vaultAccount);
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequesReceivableAccount);
        Offices.verifyCreateTellerButtonIsEnabled();
        Offices.clickCreateTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be saved");
    });
    it('should not be able to assign the same employee to another teller', function () {
        //workaround for teller not showing up immediately
        Common.clickBackButtonInTitleBar();
        Offices.goToManageTellersForOfficeByIdentifier("hqo1");
        Common.clickLinkShowForRowWithId(tellerIdentifier2);
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier2, "hqo1");
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier2);
        Offices.clickEnabledOpenTellerButton();
        Common.verifyErrorMessageDisplayedWithTitleAndText("Employee already assigned", "Employees can only be assigned to one teller. Please choose a different employee or unassign the employee first.")
        Common.clickButtonOKInErrorMessage();
        Offices.clickButtonCancel();
        Offices.verifyTellerStatusIs("CLOSED");
    });
    it('close teller - cash out', function () {
        Offices.goToManageOfficesViaSidePanel();
        Common.clickLinkShowForRowWithId(officeIdentifier);
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Common.clickLinkShowForRowWithId(tellerIdentifier);
        Offices.clickActionCloseForTellerOfOffice(tellerIdentifier, officeIdentifier);
        Offices.selectRadioCashOut();
        Offices.enterTextIntoAmountInputField("50");
        Offices.clickCloseTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("CLOSED");
        Offices.verifyAssignedEmployeeForTellerIs("");
        //verify transaction has taken place as expected
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(vaultAccount);
        Accounting.clickSearchButton();
        Accounting.verifySecondJournalEntry("Credit Adjustments", "Amount: 50.00");
        Accounting.clickSecondJournalEntry();
        Accounting.verifyClerkForJournalEntryIs(employeeIdentifier);
        Accounting.verifyMessageForJournalEntryIs("Teller adjustment.");
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(vaultAccount, "50.00", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(tellerAccount, "50.00", 2);
        //employee has been unassigned and can no longer log into the teller
        Login.signOut();
        Login.logInWithTenantUserAndPassword("playground", employeeIdentifier2, "abc123??");
        Teller.goToTellerManagementViaSidePanel();
        Teller.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Teller.enterTextIntoPasswordInputField("123abc!!");
        Teller.clickEnabledUnlockTellerButton();
        Login.verifyMessageForUnsuccessfulLoginIsDisplayed();
        Login.signOut();
        //employee can now be assigned to a different teller
        Login.logInWithTenantUserAndPassword("playground", employeeIdentifier, "abc123??");
        Offices.goToManageOfficesViaSidePanel();
        Offices.goToManageTellersForOfficeByIdentifier("hqo1");
        Common.clickLinkShowForRowWithId(tellerIdentifier2);
        Offices.clickActionOpenForTellerOfOffice(tellerIdentifier2, "hqo1");
        Offices.enterTextIntoAssignedEmployeeInputField(employeeIdentifier2);
        Offices.clickEnabledOpenTellerButton();
        Common.verifyMessagePopupIsDisplayed("Teller is going to be updated");
        Offices.verifyTellerStatusIs("OPEN");
        Offices.verifyAssignedEmployeeForTellerIs(employeeIdentifier2);
    });
    it('office with teller cannot be deleted', function () {
        Offices.goToManageOfficesViaSidePanel();
        Common.clickLinkShowForRowWithId(officeIdentifier);
        //verify office cannot be deleted; delete icon is hidden
    });
    //teller transactions
});