/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */
//Denominations.js
var Common = require('./Common.js');

//denominations
var noteValueInputs = $$("fims-text-input[controlname='value'] input");
var countInputs = $$("fims-text-input[controlname='count'] input");

//general elements
var primaryButton = $$(".mat-raised-button.mat-primary");
var createOfficeButton = $$(".mat-raised-button.mat-primary").first();
var buttons = $$(".mat-button");


//Actions specific to the Denominations section, in Offices > Teller management

var EC = protractor.ExpectedConditions;

module.exports = {
    enterTextIntoNoteValueInputField: function(text, number) {
        browser.wait(EC.visibilityOf(noteValueInputs.get(number-1)), 2000)
        noteValueInputs.get(number-1).clear().click().sendKeys(text);
    },
    enterTextIntoCountInputField: function(text, number) {
        browser.wait(EC.visibilityOf(countInputs.get(number-1)), 2000)
        countInputs.get(number-1).clear().click().sendKeys(text);
    },
    clickButtonAddDetail: function(){
        browser.sleep(200);
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add detail";
            });
        }).click();
    },
    removeDetailAtPosition: function(position){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Remove detail";
            });
        }).get(position-2).click();
    },
    verifyDenominationTotalIs: function(amount) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr b").get(1).getText()).toEqual(amount);
    },
    verifyCashOnHandTotalIs: function(amount) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr b").get(3).getText()).toEqual(amount);
    },
    clickCreateDenominationButton: function(){
        browser.executeScript("arguments[0].scrollIntoView();", primaryButton.get(0).getWebElement());
        primaryButton.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE DENOMINATION";
            });
        }).click();
    },
    verifyCountedTotalForDenominationInRow: function(countedTotal, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(0).getText()).toEqual(countedTotal);
    },
    verifyNoteForDenominationInRow: function(note, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(note);
    },
    verifyJournalEntryForDenominationInRow: function(entry, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(entry);
    },
    verifyCreatedByForDenominationInRow: function(createdBy, row){
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(4).getText()).toEqual(createdBy);
    },
    verifyCreateDenominationButtonIsDisabled: function(){
        expect($("a[title='Create denomination']").isEnabled()).toBe(false);
    },
    verifyCreateDenominationButtonIsEnabled: function(){
        expect($("a[title='Create denomination']").isEnabled()).toBe(true);
    }
}
