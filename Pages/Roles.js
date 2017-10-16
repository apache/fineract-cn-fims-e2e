//Roles.js

//Actions specific to the Roles section

var EC = protractor.ExpectedConditions;
var identifierInput = $(".mat-input-infix input[placeholder='Identifier']");
var checkboxAllPermissionsDelete = $$("mat-checkbox").get(2);
var createNewRoleQA =  $("a[href='/roles/create']");
var titleRow = $("fims-layout-card-over .mat-toolbar-row span");
var primaryButton = $$(".mat-raised-button.mat-primary");



module.exports = {
    clickCreateNewRoleFromQuickAccess: function() {
        browser.wait(EC.visibilityOf(createNewRoleQA), 5000);
        createNewRoleQA.click();
    },
    enterTextIntoRoleIdentifierInput: function (text){
        browser.wait(EC.visibilityOf(identifierInput), 5000);
        identifierInput.click().sendKeys(text);
    },
    selectCheckboxToGiveUserAllPermissions: function (){
        checkboxAllPermissionsDelete.click();
    },
    clickEnabledSaveRoleButton: function(){
       primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "SAVE ROLE";
            });
        }).click();
    },
}