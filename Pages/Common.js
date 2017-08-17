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
        firstResult=$(".td-data-table-row .td-data-table-cell").getText();
        expect(firstResult).toEqual(text);
    },
    waitForThePageToFinishLoading: function(){
        browser.wait(EC.not(EC.presenceOf($('.td-loading'))), 10000);
    },
    clickLinkShowForFirstRowInTable: function() {
        browser.wait(EC.visibilityOf($("tr td.td-data-table-cell button")), 5000);
        $("tr td.td-data-table-cell button").click();
    },
    clickBackButtonInTitleBar: function() {
        browser.wait(EC.visibilityOf($$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2)), 5000);
        $$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2).click();
    },
    clickLinkShowForRowWithId: function(identifier){
        //if > page of entries, need to implement way to page in order to find correct row
        var firstCellPerRow = $$("tr td.td-data-table-cell");
        for (var x = 0; x < firstCellPerRow.size; x++){
            idRow = firstCellPerRow.get(x).getText();
                if (idRow.equals(identifier)){
                    firstCellPerRow.get(x).parent().$(".td-data-table-cell button").click();
                    break;
                };
        };
    }
};