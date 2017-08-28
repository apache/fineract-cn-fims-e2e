//Common.js

var EC = protractor.ExpectedConditions;

module.exports = {
    clickSearchButtonToMakeSearchInputFieldAppear: function(){
        browser.wait(EC.visibilityOf($(".td-search-icon.mat-icon-button")), 5000);
        $(".td-search-icon.mat-icon-button").click();
        browser.wait(EC.visibilityOf($("input[placeholder='Search']")), 2000);
    },
    enterTextInSearchInputFieldAndApplySearch: function (text){
        $("input[placeholder='Search']").click().sendKeys(text);
        $("input[placeholder='Search']").click().sendKeys(protractor.Key.ENTER);
    },
    verifyFirstRowOfSearchResultHasTextAsId: function(text){
        browser.wait(EC.visibilityOf($(".td-data-table-row .td-data-table-cell")), 5000);
        expect($(".td-data-table-row .td-data-table-cell").getText()).toEqual(text);
    },
    waitForThePageToFinishLoading: function(){
        browser.wait(EC.not(EC.presenceOf($('.td-loading'))), 5000);
    },
    clickLinkShowForFirstRowInTable: function() {
        browser.wait(EC.visibilityOf($("tr td.td-data-table-cell button")), 5000);
        $("tr td.td-data-table-cell button").click();
    },
    clickBackButtonInTitleBar: function() {
        browser.wait(EC.visibilityOf($$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2)), 5000);
        $$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2).click();
    },
    clickLinkShowForRowWithId: function(identifier) {
        browser.wait(EC.invisibilityOf($("div[class='md-padding'] h3")), 5000);
        browser.sleep(1000);
        browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "SHOW"), 5000);
        $$('tbody tr').filter(function (elem, index) {
            return elem.$(".td-data-table-cell").getText().then(function (text) {
                return text === identifier;
            });
        }).$$(".td-data-table-cell").last().click();
    },
    verifyMessagePopupIsDisplayed: function(message){
        popup = $("simple-snack-bar");
        browser.wait(EC.visibilityOf(popup), 2000);
        browser.wait(EC.textToBePresentInElement(popup, message), 5000);
        browser.wait(EC.invisibilityOf(popup),5000);
    }
};