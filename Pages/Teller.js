//Teller.js

//Actions specific to the Teller section

var EC = protractor.ExpectedConditions;
var tellerNumberInput = $(".mat-input-infix input[formcontrolname='tellerCode']");
var passwordInput = $(".mat-input-infix input[formcontrolname='password']");

module.exports = {
    goToTellerManagementViaSidePanel: function() {
        browser.wait(EC.elementToBeClickable($("a[href='/teller']")), 5000);
        $("a[href='/teller']").click();
    },
    enterTextIntoTellerNumberInputField: function(text) {
        browser.wait(EC.visibilityOf(tellerNumberInput), 5000);
        tellerNumberInput.click().sendKeys(text);
    },
    enterTextIntoPasswordInputField: function(text) {
        passwordInput.click().sendKeys(text);
    },
    clickEnabledUnlockTellerButton: function(){
        browser.wait(EC.visibilityOf($(".mat-raised-button.mat-primary")), 5000);
        expect($(".mat-raised-button.mat-primary").isEnabled()).toBeTruthy();
        $(".mat-raised-button.mat-primary").click();
    },
    enterTextIntoSearchInputField: function(text){
        browser.wait(EC.visibilityOf($("td-search-input input")), 5000);
        $("td-search-input input").click().sendKeys(text);
    },
    clickButtonShowAtIndex: function(i){
        $$("button[title='SHOW']").get(i).click();
    },
    verifyCardTitleHasNameOfCustomer: function (text) {
        browser.wait(EC.presenceOf($('fims-portrait')), 10000);
        form_title = $("fims-layout-card-over .mat-toolbar-row div").getText();
        expect(form_title).toMatch(text);
    },
    pauseTeller: function(){
        $("a[title='Pause']").click();
    }
};