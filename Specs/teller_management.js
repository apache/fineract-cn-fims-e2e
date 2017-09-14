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
    it('should create a new branch office and a teller for the branch office', function () {
        Offices.goToManageOfficesViaSidePanel();
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
        Common.clickLinkShowForFirstRowInTable();
        Offices.goToManageTellersForOfficeByIdentifier(officeIdentifier);
        Offices.clickCreateTellerForOfficeByIdentifier(officeIdentifier);
        Offices.enterTextIntoTellerNumberInputField(tellerIdentifier);
        Offices.enterTextIntoPasswordInputField("qazwsx123!!");
        Offices.enterTextIntoCashWithdrawalLimitInputField("1000");
        Offices.enterTextIntoTellerAccountInputFieldAndSelectMatchingEntry(tellerAccount);
        Offices.enterTextIntoVaultAccountInputFieldAndSelectMatchingEntry(vaultAccount);
        Offices.enterTextIntoChequesReceivableAccountInputFieldAndSelectMatchingEntry(chequesReceivableAccount);
        Offices.clickEnabledCreateTellerButton();
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
        //Offices.verifyCreatedByForTellerIs(employeeIdentifier);
        Offices.viewTellerBalanceForTellerInOffice(tellerIdentifier, officeIdentifier);
        Offices.verifyTellerTransactionMessageForRow("Teller adjustment.", 1);
        //Is this the right column (Credit)? The teller account is debited.
        Offices.verifyTellerCreditTransactionAmountForRow("2,500", 1);
    });
    it('Journey entry has been created and account entries are as expected', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToJournalEntries();
        Accounting.enterTextIntoSearchAccountInputField(vaultAccount);
        Accounting.clickSearchButton();
        Accounting.verifyFirstJournalEntry("Debit Adjustments", "Amount: 2,500.00");
        browser.pause();
        Accounting.verifyClerkForJournalEntryIs(employeeIdentifier);
        Accounting.verifyMessageForJournalEntryIs("Teller adjustment.");
        Accounting.verifyAccountHasBeenDebitedWithAmountInRow(tellerAccount, "2,500.00", 1);
        Accounting.verifyAccountHasBeenCreditedWithAmountInRow(vaultAccount, "2,500.00", 2);

        // Common.clickBackButtonInTitleBar();
        // Common.clickLinkShowForRowWithId("7000");
        // Common.clickLinkShowForRowWithId("7200");
        // Common.clickLinkShowForRowWithId(chequesReceivableAccount);
        // Accounting.viewAccountEntriesForAccount(chequesReceivableAccount);
        // Accounting.verifyTransactionTypeForRow("CREDIT", 3);
        // Accounting.verifyTransactionMessageForRow("CQRV", 3);
        // Accounting.verifyTransactionAmountForRow("300", 3);
        // Accounting.verifyTransactionBalanceForRow("5000", 3);
        // Common.clickBackButtonInTitleBar();
        // Common.clickBackButtonInTitleBar();
        // Common.clickBackButtonInTitleBar();
        // Common.clickBackButtonInTitleBar();
        // Common.clickLinkShowForRowWithId("9000");
        // Common.clickLinkShowForRowWithId("9100");
        // Common.clickLinkShowForRowWithId(customerAccount + ".9100.00001");
        // Accounting.viewAccountEntriesForAccount(customerAccount + ".9100.00001");
        // Accounting.verifyTransactionTypeForRow("DEBIT", 4);
        // Accounting.verifyTransactionMessageForRow("CQRV", 4);
        // Accounting.verifyTransactionAmountForRow("300", 4);
        // Accounting.verifyTransactionBalanceForRow("5500", 4);
    });
});