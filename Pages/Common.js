//Common.js
var helper = require('../helper.js');

var EC = protractor.ExpectedConditions;
var titleRow = $("fims-layout-card-over .mat-toolbar-row span");

module.exports = {
    verifyCardHasTitle: function(text) {
        browser.wait(EC.textToBePresentInElement(titleRow, text), 5000);
    },
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
        browser.sleep(2000);
        browser.wait(EC.visibilityOf($("tr td.td-data-table-cell button")), 5000);
        $("tr td.td-data-table-cell button").click();
    },
    clickBackButtonInTitleBar: function() {
        browser.sleep(500);
        browser.wait(EC.visibilityOf($$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2)), 5000);
        $$(".mat-toolbar .mat-toolbar-row .mat-icon-button").get(2).click();
    },
    clickLinkShowForRowWithId: function(identifier) {
        browser.wait(EC.invisibilityOf($("div[class='md-padding'] h3")), 5000);
        browser.sleep(1500);
        browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "SHOW"), 5000);
        $$('tbody tr').filter(function (elem, index) {
            return elem.$(".td-data-table-cell").getText().then(function (text) {
                return text === identifier;
            });
        }).$$(".td-data-table-cell").last().click();
    },
    verifyMessagePopupIsDisplayed: function(message){
        popup = $("simple-snack-bar");
        browser.wait(EC.visibilityOf(popup), 3000);
        browser.wait(EC.textToBePresentInElement(popup, message), 5000);
        browser.wait(EC.invisibilityOf(popup),5000);
    },
    verifyErrorMessageDisplayedWithTitleAndText: function(title, message){
        browser.wait(EC.visibilityOf($("td-alert-dialog")), 2000);
        expect($("td-dialog-title").getText()).toEqual(title);
        expect($("td-dialog-content").getText()).toEqual(message);
    },
    clickButtonOKInErrorMessage: function(){
        $("td-dialog-actions button").click();
    },
    clickLinkShowForRowWithId2: function(identifier) {
        numberPages = 1;
        i = 1;
        browser.wait(EC.invisibilityOf($("div[class='md-padding'] h3")), 5000);
        browser.sleep(1000);
        numberAccounts = $$("td-paging-bar div div span").get(6).getText().then(function(text){
           console.log(text);
        });
        numberAccountsTrimmed = numberAccounts.trim();
        numberAccountsInt = parseInt(numberAccountsTrimmed);
        console.log(numberAccounts);
        console.log(numberAccountsTrimmed);
        console.log(numberAccountsInt);
;       if (numberAccountsInt > 10) {
            console.log(numberAccountsInt);
            x = numberAccounts%10;
            console.log(x);
            if(x>0){
                numberPages = (numberAccounts-x)/10 + 1;
            } else {
                numberPages = numberAccounts/10;
            }
        }
        if (numberPages === 1) {
            browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "SHOW"), 5000);
            $$('tbody tr').filter(function (elem, index) {
                return elem.$(".td-data-table-cell").getText().then(function (text) {
                    return text === identifier;
                });
            }).$$(".td-data-table-cell").last().click();
        } else {
            while(i <= numberPages) {
                i++;
                browser.wait(EC.textToBePresentInElement($$("tbody tr .td-data-table-cell").last(), "SHOW"), 5000);
                rowIamLookingFor = $$('tbody tr').filter(function (elem, index) {
                    return elem.$(".td-data-table-cell").getText().then(function (text) {
                        return text === identifier;
                    });
                });
                if (rowIamLookingFor.count() === 0) {
                    $$(".td-paging-bar-navigation button").get(2).click();
                } else {
                    rowIamLookingFor.$$(".td-data-table-cell").last().click();
                }
                ;
            }
        }
    },
};