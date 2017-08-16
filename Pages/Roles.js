//Roles.js

//Actions specific to the Roles section

var EC = protractor.ExpectedConditions;
var identifierInput = $(".mat-input-infix input[placeholder='Identifier']");
var checkboxAllPermissionsDelete = $$("md-checkbox").get(2);
var createNewRoleQA =  $("a[href='/roles/create']");
var titleRow = $("fims-layout-card-over .mat-toolbar-row div");
var buttonPrimary = $(".mat-raised-button.mat-primary");



module.exports = {
    clickCreateNewRoleFromQuickAccess: function() {
        browser.wait(EC.visibilityOf(createNewRoleQA), 5000);
        createNewRoleQA.click();
    },
    verifyCardHasTitleCreateRole: function () {
        form_title = titleRow.getText();
        expect(form_title).toEqual("Create new role");
    },
    verifyCardHasTitleManageRoles: function () {
        form_title = titleRow.getText();
        expect(form_title).toEqual("Manage roles");
    },
    enterTextIntoRoleIdentifierInput: function (text){
        browser.wait(EC.visibilityOf(identifierInput), 5000);
        identifierInput.click().sendKeys(text);
    },
    selectCheckboxToGiveUserAllPermissions: function (){
        checkboxAllPermissionsDelete.click();
    },
    clickEnabledSaveRoleButton: function(){
        browser.wait(EC.visibilityOf(buttonPrimary), 5000);
        expect(buttonPrimary.isEnabled()).toBeTruthy();
        buttonPrimary.click();
    }
}