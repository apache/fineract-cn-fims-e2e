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