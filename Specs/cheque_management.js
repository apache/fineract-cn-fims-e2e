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
var Cheques = require('../Pages/Cheques');


describe('cheque_management', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    officeIdentifier = helper.getRandomString(6);
    tellerIdentifier = helper.getRandomString(4);
    customerAccount = helper.getRandomString(5);
    depositIdentifier = helper.getRandomString(4);
    depositName = helper.getRandomString(8);
    tellerAccount = helper.getRandomString(4);
    revenueAccount = helper.getRandomString(4);
    loanShortName = helper.getRandomString(6);
    taskIdentifier = helper.getRandomString(3);
    loanAccountShortName =  helper.getRandomString(4);
    branchSortCode = helper.getRandomString(11);
    branchSortCode2 = helper.getRandomString(11);

    //what role would be best in order to clear cheques and verify correctness of bookings?

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
    it('should create a new teller role', function () {
       //
    });
    it('should create new accounts', function () {
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("7000");
        Common.clickLinkShowForRowWithId("7300");
        Accounting.clickCreateNewAccountInLedger("7300");
        Accounting.enterTextIntoAccountIdentifierInputField(tellerAccount);
        Accounting.verifyRadioAssetToBeSelected();
        Accounting.verifyRadioAssetToBeDisabled();
        Accounting.enterTextIntoAccountNameInputField("My teller");
        Accounting.clickEnabledButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
        Accounting.goToAccountingViaSidePanel();
        Common.clickLinkShowForRowWithId("1000");
        Common.clickLinkShowForRowWithId("1300");
        Accounting.clickCreateNewAccountInLedger("1300");
        Accounting.enterTextIntoAccountIdentifierInputField(revenueAccount);
        Accounting.verifyRadioRevenueToBeSelected();
        Accounting.enterTextIntoAccountNameInputField("Revenue from deposit charges");
        Accounting.clickEnabledButtonCreateAccount();
        Common.verifyMessagePopupIsDisplayed("Account is going to be saved");
    });
    it('should create a new employee with administrator permissions', function () {
        Employees.goToManageEmployeesViaSidePanel();
        Employees.createEmployee(employeeIdentifier, "Kate", "Atkinson", "Administrator", "abc123!!");
        Login.signOut();
        Login.logInForFirstTimeWithTenantUserAndPassword("playground", employeeIdentifier, "abc123!!", "abc123??");
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
        Customers.enterTextIntoDayOfBirthInputField("9211978");
        Customers.verifyIsMemberCheckboxSelected();
        Customers.clickEnabledContinueButtonForCustomerDetails();
        Customers.enterTextIntoStreetInputField("800 Chatham Road #326");
        Customers.enterTextIntoCityInputField("Winston-Salem");
        Customers.selectCountryByName("Germany");
        Customers.clickEnabledContinueButtonForCustomerAddress();
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
    it('should create a deposit account - Checking with opening charge', function () {
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
        Customers.selectProduct(depositName);
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
        Teller.selectAccountToBeAffected(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Teller.enterTextIntoAmountInputField("500");
        Teller.clickEnabledCreateTransactionButton();
        Teller.verifyTransactionAmount("500");
        Teller.clickEnabledConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('customer should be able to cash cheque - cheque is not open/not on us', function () {
        Teller.clickOnCashChequeForCustomer(customerAccount);
        Cheques.enterTextIntoChequeNumberInputField("123456");
        Cheques.enterTextIntoBranchSortCodeInputField(branchSortCode);
        Cheques.enterTextIntoAccountNumberInputField("789789");
        Cheques.clickButtonDetermineFromMICR();
        Cheques.verifyWarningIsDisplayedIfIssuingBankCouldNotBeDetermined();
        //Issuing Bank/Issuer show error
        Cheques.enterTextIntoIssuingBankInputField("BoA");
        Cheques.enterTextIntoIssuerInputField("Paul Auster");
        Cheques.verifyPayeeHasTextAndCannotBeChanged("Thomas Pynchon");
        Cheques.enterTextIntoDateIssuedInputField("992017");
        Cheques.verifyWarningIsDisplayedIfChequeIsNotOpen();
        Cheques.enterTextIntoAmountInputField("5000");
        Cheques.selectAccountToTransferTo(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Cheques.clickCreateTransactionButton();
        Cheques.verifyTransactionAmount("5000");
        Cheques.clickConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    it('customer should be able to cash cheque - cheque is open/not on us', function () {
        Teller.clickOnCashChequeForCustomer(customerAccount);
        Cheques.enterTextIntoChequeNumberInputField("123456");
        Cheques.enterTextIntoBranchSortCodeInputField(branchSortCode2);
        Cheques.enterTextIntoAccountNumberInputField("789789");
        Cheques.clickButtonDetermineFromMICR();
        Cheques.verifyWarningIsDisplayedIfIssuingBankCouldNotBeDetermined();
        //Issuing Bank/Issuer show error
        Cheques.enterTextIntoIssuingBankInputField("BoA");
        Cheques.enterTextIntoIssuerInputField("Paul Auster");
        Cheques.verifyPayeeHasTextAndCannotBeChanged("Thomas Pynchon");
        Cheques.enterTextIntoDateIssuedInputField("992017");
        Cheques.checkCheckboxIsChequeOpen();
        Cheques.verifyWarningIsNotDisplayedIfChequeIsOpen();
        Cheques.enterTextIntoAmountInputField("5000");
        Cheques.selectAccountToTransferTo(customerAccount + ".9100.00001(" + depositIdentifier +")");
        Cheques.clickCreateTransactionButton();
        Cheques.verifyTransactionAmount("5000");
        Cheques.clickConfirmTransactionButton();
        Common.verifyMessagePopupIsDisplayed("Transaction successfully confirmed");
    });
    //verify transactions
    it('cheques should be pending clearance - approve first cheque', function () {
        Accounting.goToAccountingViaSidePanel();
        Accounting.goToChequeClearing();
        Cheques.verifyStateForChequeInRow("PENDING", 1);
        //Cheques.verifyStateForChequeInRow("PENDING", 2);
        Cheques.clickButtonApproveForChequeWithIdentifier("123456~" + sortBranchCode + "~789789");
        Cheques.cancelAction();
        Cheques.clickButtonApproveForChequeWithIdentifier("123456~" + sortBranchCode + "~789789");
        Cheques.confirmAction();
        browser.pause();
    });


});