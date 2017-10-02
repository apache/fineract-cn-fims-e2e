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

describe('payrolls', function() {
    var EC = protractor.ExpectedConditions;
    employeeIdentifier = helper.getRandomString(6);
    identifier1 = helper.getRandomString(3);
    identifier2 = helper.getRandomString(3);

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
    it('should be able to create custom fields for members', function () {
        Customers.goToManageCustomersViaSidePanel();
        Common.verifyCardHasTitle("Manage members");
        CustomFields.clickLinkCreateCustomFieldsForCustomers();
        CustomFields.verifyNoCustomFieldsFoundYet();
        CustomFields.clickButtonCreateCustomFields();
        CustomFields.enterTextIntoNameInputField("My custom fields");
        CustomFields.enterTextIntoDescriptionInputField("Custom fields for my members");
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier1, 1);
        CustomFields.enterTextIntoLabelInputFieldForField("My field #1", 1);
        CustomFields.verifyRadioTextIsSelectedForField(1);
        CustomFields.enterTextIntoLengthInputFieldForField("12", 1);
        CustomFields.clickButtonAddField();
        CustomFields.enterTextIntoIdentifierInputFieldForField(identifier2, 2);
        CustomFields.enterTextIntoLabelInputFieldForField("My field #2", 2);
        CustomFields.selectRadioButtonNumberForField(2);
        CustomFields.enterNumberIntoMaxDigitsInputFieldForField("5", 1);
        CustomFields.clickCreateCustomFieldsButton();
        Common.verifyMessagePopupIsDisplayed("Catalog is going to be saved");
    });
    it('should be able to update custom fields for members', function () {
        Common.clickLinkShowForRowWithId(identifier1);
        //verify details
        CustomFields.clickButtonEditCustomFieldForField(identifier1);
        //verify identifier and type can no longer be updated
        CustomFields.verifyRadioTextIsDisabledForField(1);
        //update label, hint and mandatory status
        CustomFields.enterTextIntoLabelInputFieldForField("Updated label", 1);
        CustomFields.enterTextIntoHintInputFieldForField("Hint, hint, hint.", 1);
        CustomFields.checkCheckboxMandatory();
        CustomFields.clickUpdateCustomFieldsButton();
        Common.verifyMessagePopupIsDisplayed("Field is going to be updated");
        //verify details
    });
    it('should be able to delete custom field', function () {
        CustomFields.clickDeleteFieldButton();
        Common.confirmAction();
        Common.verifyMessagePopupIsDisplayed("Field is going to be deleted");
    });
    it('should be able to delete catalog', function () {
        CustomFields.clickDeleteCatalogButton();
        Common.confirmAction();
        Common.verifyMessagePopupIsDisplayed("Catalog is going to be deleted");
        CustomFields.clickLinkCreateCustomFieldsForCustomers();
        CustomFields.verifyNoCustomFieldsFoundYet();
    });
    it('should create a new catalog with different fields', function () {

    });
    it('should create member', function () {

    });
    //should it be able to update/delete fields once in use???
    it('should not be able to delete custom fields anymore', function () {

    });

});