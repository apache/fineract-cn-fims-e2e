//CustomFields.js

//Actions specific to custom fields

var EC = protractor.ExpectedConditions;

//create custom fields
var nameInput = $("fims-text-input[controlname='name'] input");
var descriptionInput = $("textarea[formcontrolname='description']");
var identifierInput = $$("fims-id-input[controlname='identifier'] input");
var labelInput = $$("fims-custom-field-form fims-text-input[controlname='label'] input");
var hintInput = $$("fims-text-input[controlname='hint'] input");
var checkboxMandatory = $$("mat-checkbox[formcontrolname='mandatory']");
var descriptionInputField = $$("textarea[formcontrolname='description']");
var radioButtonGroupDataType = $$("mat-radio-group[formcontrolname='dataType']");

var lengthInput = $$("fims-text-input[controlname='length'] input");
var maxDigitsInput = $$("fims-text-input[controlname='precision'] input");
var minValueInput = $$("fims-text-input[controlname='minValue'] input");
var maxValueInput = $$("fims-text-input[controlname='maxValue'] input");

//general elements
var linkCustomFields = $("a[href='/customers/catalog/detail']");
var primaryButtons =  $$(".mat-raised-button.mat-primary");
var buttons = $$("button");

module.exports = {
    clickLinkCreateCustomFieldsForCustomers: function() {
        browser.wait(EC.visibilityOf(linkCustomFields), 5000);
        linkCustomFields.click();
    },
    verifyNoCustomFieldsFoundYet: function() {
        browser.wait(EC.visibilityOf($("td-message .td-message-label")), 5000);
        expect($("td-message .td-message-label").getText()).toEqual("No custom fields found");
    },
    clickButtonCreateCustomFields: function(){
        $("td-message .mat-button").click();
    },
    enterTextIntoNameInputField: function (text) {
        browser.wait(EC.visibilityOf(nameInput), 3000);
        nameInput.click().sendKeys(text);
    },
    enterTextIntoDescriptionInputField: function (text) {
        browser.wait(EC.visibilityOf(descriptionInput), 3000);
        descriptionInput.click().sendKeys(text);
    },
    clickButtonAddField: function(){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add field";
            });
        }).click();
    },
    enterTextIntoIdentifierInputFieldForField: function(text, fieldNumber) {
        browser.wait(EC.elementToBeClickable(identifierInput.get(fieldNumber-1)), 5000);
        identifierInput.get(fieldNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoLabelInputField: function(text, fieldNumber) {
        browser.wait(EC.elementToBeClickable(labelInput.get(fieldNumber-1)), 5000);
        labelInput.get(fieldNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoHintInputFieldForField: function(text, fieldNumber) {
        browser.wait(EC.elementToBeClickable(hintInput.get(fieldNumber-1)), 5000);
        hintInput.get(fieldNumber-1).click().clear().sendKeys(text);
    },
    enterTextIntoDescriptionInputFieldForField: function(text, fieldNumber) {
        browser.wait(EC.elementToBeClickable(descriptionInputField.get(fieldNumber)), 5000);
        descriptionInputField.get(fieldNumber).click().clear().sendKeys(text);
    },
    verifyRadioTextIsSelectedForField: function(fieldNumber) {
        expect(radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(0).getAttribute("class")).toMatch("mat-radio-checked");
    },
    verifyRadioTextIsDisabledForField: function(fieldNumber) {
        expect(radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(0).getAttribute("class")).toMatch("mat-radio-disabled");
    },
    selectRadioButtonNumberForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(1).click();
    },
    selectRadioButtonDateForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(2).click();
    },
    selectRadioButtonSingleSelectionForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(3).click();
    },
    selectRadioButtonMultiSelectionForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("mat-radio-button").get(4).click();
    },
    enterTextIntoLengthInputFieldForField: function(text, fieldNumber) {
        browser.wait(EC.elementToBeClickable(lengthInput.get(fieldNumber-1)), 5000);
        lengthInput.get(fieldNumber-1).click().clear().sendKeys(text);
    },
    enterNumberIntoMaxDigitsInputFieldForField: function(number, fieldNumber) {
        browser.wait(EC.elementToBeClickable(maxDigitsInput.get(fieldNumber-1)), 5000);
        maxDigitsInput.get(fieldNumber-1).click().clear().sendKeys(number);
    },
    enterNumberIntoMinValueInputFieldForField: function(number, fieldNumber) {
        browser.wait(EC.elementToBeClickable(minValueInput.get(fieldNumber-1)), 5000);
        minValueInput.get(fieldNumber-1).click().clear().sendKeys(number);
    },
    enterNumberIntoMaxValueInputFieldForField: function(number, fieldNumber) {
        browser.wait(EC.elementToBeClickable(maxValueInput.get(fieldNumber-1)), 5000);
        maxValueInput.get(fieldNumber-1).click().clear().sendKeys(number);
    },
    clickButtonAddOption: function(optionNumber){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add option";
            });
        }).get(optionNumber-1).click();
    },
    enterTextIntoLabelInputFieldForOption: function(text, option){
        $$("div[formarrayname='options'] fims-text-input[controlname='label'] input").get(option-1).click().clear().sendKeys(text);
    },
    enterTextIntoValueInputFieldForOption: function(text, option){
        $$("div[formarrayname='options'] fims-text-input[controlname='value'] input").get(option-1).click().clear().sendKeys(text);
    },
    clickButtonRemoveField: function(fieldNumber){
        removePaymentButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Remove field";
            });
        }).get(fieldNumber-1).click();
    },

    clickCreateCustomFieldsButton: function () {
        browser.executeScript("arguments[0].scrollIntoView();", primaryButtons.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButtons.first()), 5000);
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE CUSTOM FIELDS";
            });
        }).click();
    },
    verifyButtonCreateCustomFieldsDisabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE CUSTOM FIELDS";
            });
        }).first().isEnabled()).toBe(false);
    },
    verifyButtonCreateCustomFieldsEnabled: function(){
        expect(primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "CREATE CUSTOM FIELDS";
            });
        }).first().isEnabled()).toBe(true);
    },
    clickUpdateCustomFieldsButton: function () {
        browser.sleep(500);
        browser.executeScript("arguments[0].scrollIntoView();", primaryButtons.first().getWebElement());
        browser.wait(EC.elementToBeClickable(primaryButtons.first()), 5000);
        primaryButtons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "UPDATE CUSTOM FIELD";
            });
        }).click();
    },
    clickButtonEditCustomFieldForField: function(identifier) {
        link = "/customers/catalog/detail/field/detail/" + identifier + "/edit";
        a = $('a[href= "' + link +'"]');
        browser.wait(EC.visibilityOf(a), 5000);
        a.click();
    },
    clickDeleteFieldButton: function(){
        $("button[title='Delete this field']").click();
    },
    clickDeleteCatalogButton: function(){
        $("button[title='Delete this catalog']").click();
    },
    checkCheckboxMandatoryForField: function(fieldNumber){
        checkboxMandatory.get(fieldNumber-1).click();
    },
    verifyNameForCatalogIs: function(name) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Name";
            });
        }).first().$("p").getText().then(function (text) {
            return text === name;
        })).toBe(true);
    },
    verifyDescriptionForCatalogIs: function(desc) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Description";
            });
        }).first().$("p").getText().then(function (text) {
            return text === desc;
        })).toBe(true);
    },
    verifyCreatedByForCatalogIs: function(createdBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Created by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(createdBy) >= 0;
        })).toBe(true);
    },
    verifyLastModifiedByForCatalogIs: function(lastModifiedBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Last modified by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(lastModifiedBy) >= 0;
        })).toBe(true);
    },
    verifyDataTypeForRow: function(dataType, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(dataType);
    },
    verifyLabelForRow: function(label, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(2).getText()).toEqual(label);
    },
    verifyHintForRow: function(hint, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(3).getText()).toEqual(hint);
    },
    verifyDescriptionForRow: function(description, row) {
        browser.wait(EC.visibilityOf($("table tbody")), 3000);
        expect($$("table tbody tr").get(row - 1).$$(".td-data-table-cell").get(1).getText()).toEqual(description);
    },
    verifyDataTypeForFieldIs: function(dataType) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Data type";
            });
        }).first().$("p").getText().then(function (text) {
            return text === dataType;
        })).toBe(true);
    },
    verifyLabelForFieldIs: function(label) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Label";
            });
        }).first().$("p").getText().then(function (text) {
            return text === label;
        })).toBe(true);
    },
    verifyHintForFieldIs: function(hint) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Hint";
            });
        }).first().$("p").getText().then(function (text) {
            return text === hint;
        })).toBe(true);
    },
    verifyMandatoryForFieldIs: function(mandatory) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Mandatory";
            });
        }).first().$("p").getText().then(function (text) {
            return text === mandatory;
        })).toBe(true);
    },
    verifyLengthForFieldIs: function(length) {
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Length";
            });
        }).first().$("p").getText().then(function (text) {
            return text === length;
        })).toBe(true);
    },
    verifyCreatedByForFieldIs: function(createdBy){
        expect($$("fims-layout-card-over .mat-list-text").filter(function (elem, index) {
            return elem.$("h3").getText().then(function (text) {
                return text === "Created by";
            });
        }).first().$("p").getText().then(function (text) {
            return text.indexOf(createdBy) >= 0;
        })).toBe(true);
    },
    verifyCustomFieldsTitle: function(title){
        browser.wait(EC.visibilityOf($("fims-custom-fields-component form h4")), 2000);
        expect($("fims-custom-fields-component form h4").getText()).toEqual(title);
    },
    enterTextIntoCustomFieldOfTypeText: function(text, fieldId){
        elem = $('input[id= "' + fieldId +'"]');
        elem.clear().click().sendKeys(text);
    },
    enterTextIntoCustomFieldOfTypeNumber: function(text, fieldId){
        elem = $('input[id= "' + fieldId +'"]');
        elem.clear().click().sendKeys(text);
    },
    enterTextIntoCustomDateInputField: function (date, fieldId) {
        elem = $('input[id= "' + fieldId +'"]');
        elem.click().sendKeys(protractor.Key.ARROW_LEFT);
        elem.sendKeys(protractor.Key.ARROW_LEFT);
        elem.sendKeys(date);
    },
    selectRadioButtonForSingleSelection: function(optionNumber, fieldId){
        elem = $('mat-radio-group[ng-reflect-name= "' + fieldId +'"]');
        elem.$$("mat-radio-button").get(optionNumber-1).click();
    },
    selectOptionForMultiSelection: function(option, fieldId){
        elem = $('td-chips[ng-reflect-name= "' + fieldId +'"]');
        elem.click();
        browser.wait(EC.visibilityOf($(".mat-option")), 5000);
        element(by.cssContainingText('.mat-option',option)).click();
    },
    verifyCustomTextFieldInputHasError: function(fieldId, errorMessage) {
        elem = $('input[id= "' + fieldId +'"]');
        expect(elem.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toEqual(errorMessage);
    },
    verifyCustomNumberFieldInputHasError: function(fieldId, errorMessage) {
        elem = $('input[id= "' + fieldId +'"]');
        expect(elem.element(by.xpath("..")).element(by.xpath("..")).element(by.xpath("..")).$("mat-error").getText()).toEqual(errorMessage);
    },
};
