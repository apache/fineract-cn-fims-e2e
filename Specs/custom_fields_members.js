//Prerequisites:
//Role "Administrator" and headquarter office already exist
//No tasks need to be executed in order to activate a customer
//ToDo: Figure out which roles best to use for which kind of actions instead of using employee with "Administrator" role

var helper = require('../helper.js');
var Login = require('../Pages/Login.js');
var Employees = require('../Pages/Employees.js');
var Common = require('../Pages/Common.js');
var CustomFields = require('../Pages/CustomFields');
var Roles = require('../Pages/Roles');
var Customers = require('../Pages/Customers');

describe('custom_fields_members', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    identifier1 = helper.getRandomString(3);
    identifier2 = helper.getRandomString(3);
    identifier3 = helper.getRandomString(3);
    identifier4 = helper.getRandomString(3);
    identifier5 = helper.getRandomString(3);
    customerAccount = helper.getRandomString(5);


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
        //browser.pause();
    });
    it('should be able to create custom fields for members', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.verifyCardHasTitle("Manage members");
        CustomFields.clickLinkCreateCustomFieldsForCustomers();
        CustomFields.verifyNoCustomFieldsFoundYet();
        CustomFields.clickButtonCreateCustomFields();
        CustomFields.enterTextIntoNameInputField("My custom fields");
        CustomFields.enterTextIntoDescriptionInputField("Custom fields for my members");
        //add text field
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier1, 1);
        CustomFields.enterTextIntoLabelInputField("My field #1", 1);
        CustomFields.verifyRadioTextIsSelectedForField(1);
        CustomFields.enterTextIntoLengthInputFieldForField("12", 1);
        //add number field
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier2, 2);
        CustomFields.enterTextIntoLabelInputField("My field #2", 2);
        CustomFields.selectRadioButtonNumberForField(2);
        CustomFields.enterNumberIntoMaxDigitsInputFieldForField("5", 1);
        CustomFields.clickCreateCustomFieldsButton();
        Common.verifyMessagePopupIsDisplayed("Catalog is going to be saved");
        //name, description, created by, last modified by
        CustomFields.verifyNameForCatalogIs("My custom fields");
        CustomFields.verifyDescriptionForCatalogIs("Custom fields for my members");
        //CustomFields.verifyCreatedByForCatalogIs(employeeIdentifier);
        CustomFields.verifyDataTypeForRow("Text", 1);
        CustomFields.verifyLabelForRow("My field #1", 1);
        CustomFields.verifyDataTypeForRow("Number", 2);
        CustomFields.verifyLabelForRow("My field #2", 2);
    });
    it('should be able to update custom fields for members', function () {
        Common.clickLinkShowForRowWithId(identifier1);
        //verify details
        CustomFields.verifyDataTypeForFieldIs("TEXT");
        CustomFields.verifyLabelForFieldIs("My field #1");
        CustomFields.verifyMandatoryForFieldIs("false");
        CustomFields.verifyLengthForFieldIs("12");
        //created by not set yet
        //CustomFields.verifyCreatedByForFieldIs(employeeIdentifier);
        //update text field
        CustomFields.clickButtonEditCustomFieldForField(identifier1);
        //verify identifier and type can no longer be updated
        CustomFields.verifyRadioTextIsDisabledForField(1);
        //update label, hint and mandatory status
        CustomFields.enterTextIntoLabelInputField("Updated label", 1);
        CustomFields.enterTextIntoHintInputFieldForField("Hint, hint, hint.", 1);
        CustomFields.checkCheckboxMandatoryForField(1);
        //cannot change length; no longer displayed
        CustomFields.clickUpdateCustomFieldsButton();
        Common.verifyMessagePopupIsDisplayed("Field is going to be updated");
        //verify details
        CustomFields.verifyDataTypeForFieldIs("TEXT");
        CustomFields.verifyLabelForFieldIs("Updated label");
        CustomFields.verifyMandatoryForFieldIs("true");
        CustomFields.verifyLengthForFieldIs("12");
    });
    it('should be able to delete custom field', function () {
        CustomFields.clickDeleteFieldButton();
        Common.confirmAction();
        Common.verifyMessagePopupIsDisplayed("Field is going to be deleted");
        //field has been deleted
    });
    it('should be able to delete catalog', function () {
        CustomFields.clickDeleteCatalogButton();
        Common.confirmAction();
        Common.verifyMessagePopupIsDisplayed("Catalog is going to be deleted");
        CustomFields.clickLinkCreateCustomFieldsForCustomers();
        CustomFields.verifyNoCustomFieldsFoundYet();
    });
    it('should create a new catalog with different fields', function () {
        CustomFields.clickButtonCreateCustomFields();
        CustomFields.enterTextIntoNameInputField("My custom fields #2");
        CustomFields.enterTextIntoDescriptionInputField("Custom fields for my members");
        //add text field
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier1, 1);
        CustomFields.enterTextIntoLabelInputField("My field #1", 1);
        CustomFields.verifyRadioTextIsSelectedForField(1);
        CustomFields.enterTextIntoLengthInputFieldForField("3", 1);
        //add number field (min - max value)
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier2, 2);
        CustomFields.enterTextIntoLabelInputField("My field #2", 2);
        CustomFields.selectRadioButtonNumberForField(2);
        CustomFields.enterNumberIntoMinValueInputFieldForField("1", 1);
        CustomFields.enterNumberIntoMaxValueInputFieldForField("100", 1);
        //add date field
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier3, 3);
        CustomFields.enterTextIntoLabelInputField("My field #3", 3);
        CustomFields.selectRadioButtonDateForField(3);
        //add single selection
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier4, 4);
        CustomFields.enterTextIntoLabelInputField("My field #4", 4);
        CustomFields.checkCheckboxMandatoryForField(4);
        CustomFields.selectRadioButtonSingleSelectionForField(4);
        CustomFields.clickButtonAddOption(1);
        CustomFields.enterTextIntoLabelInputFieldForOption("Option 1", 1);
        CustomFields.enterTextIntoValueInputFieldForOption("1", 1);
        CustomFields.clickButtonAddOption(1);
        CustomFields.enterTextIntoLabelInputFieldForOption("Option 2", 2);
        CustomFields.enterTextIntoValueInputFieldForOption("2", 2);
        //add multi selection
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier5, 5);
        CustomFields.enterTextIntoLabelInputField("My field #5", 7);
        CustomFields.selectRadioButtonMultiSelectionForField(5);
        CustomFields.clickButtonAddOption(2);
        CustomFields.enterTextIntoLabelInputFieldForOption("Option 1", 3);
        CustomFields.enterTextIntoValueInputFieldForOption("100", 3);
        CustomFields.clickButtonAddOption(2);
        CustomFields.enterTextIntoLabelInputFieldForOption("Option 2", 4);
        CustomFields.enterTextIntoValueInputFieldForOption("100", 4);
        //error message is displayed
        CustomFields.enterTextIntoValueInputFieldForOption("200", 4);
        CustomFields.clickCreateCustomFieldsButton();
        Common.verifyMessagePopupIsDisplayed("Catalog is going to be saved");
        //name, description, created by
        CustomFields.verifyDataTypeForRow("Text", 1);
        CustomFields.verifyLabelForRow("My field #1", 1);
        CustomFields.verifyDataTypeForRow("Number", 2);
        CustomFields.verifyLabelForRow("My field #2", 2);
        CustomFields.verifyDataTypeForRow("Date", 3);
        CustomFields.verifyLabelForRow("My field #3", 3);
        CustomFields.verifyDataTypeForRow("Single selection", 4);
        CustomFields.verifyLabelForRow("My field #4", 4);
        CustomFields.verifyDataTypeForRow("Multi selection", 5);
        CustomFields.verifyLabelForRow("My field #5", 5);
        Common.clickBackButtonInTitleBar();
    });
    it('should create member', function () {
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
        Customers.enterTextIntoEmailInputField("nds@yahoo.de");
        Customers.clickEnabledContinueButtonForCustomerContact();
        Customers.goToStepCustomFields();
        CustomFields.verifyCustomFieldsTitle("My custom fields #2");
        //CREATE MEMBER disabled if no radio button selected (mandatory field); bug
        //Customers.verifyButtonCreateMemberDisabled();
        CustomFields.enterTextIntoCustomFieldOfTypeText("abc", identifier1);
        CustomFields.enterTextIntoCustomFieldOfTypeNumber("100", identifier2);
        CustomFields.enterTextIntoCustomDateInputField("09/04/1999", identifier3);
        CustomFields.selectOptionForMultiSelection("Option 1", identifier5);
        //Customers.verifyButtonCreateMemberDisabled();
        CustomFields.selectRadioButtonForSingleSelection(1, identifier4);
        Customers.verifyButtonCreateMemberEnabled();
        CustomFields.enterTextIntoCustomFieldOfTypeText("This text is too long.", identifier1);
        CustomFields.verifyCustomTextFieldInputHasError(identifier1, "Only 3 characters allowed.");
        Customers.verifyButtonCreateMemberDisabled();
        CustomFields.enterTextIntoCustomFieldOfTypeText("bcd", identifier1);
        Customers.verifyButtonCreateMemberEnabled();
        CustomFields.enterTextIntoCustomFieldOfTypeNumber("101", identifier2);
        CustomFields.verifyCustomNumberFieldInputHasError(identifier2, "Value must be smaller than or equal to 100");
        Customers.verifyButtonCreateMemberDisabled();
        CustomFields.enterTextIntoCustomFieldOfTypeNumber("0", identifier2);
        CustomFields.verifyCustomNumberFieldInputHasError(identifier2, "Value must be greater than or equal to 1");
        Customers.verifyButtonCreateMemberDisabled();
        CustomFields.enterTextIntoCustomFieldOfTypeNumber("1", identifier2);
        Customers.verifyButtonCreateMemberEnabled();
        Customers.clickEnabledCreateCustomerButton();
        Common.verifyMessagePopupIsDisplayed("Member is going to be saved")
    });
    //should it be able to update/delete fields once in use???
    it('should not be able to delete custom fields anymore', function () {

    });

});