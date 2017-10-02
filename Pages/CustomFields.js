//CustomFields.js

//Actions specific to custom fields

var EC = protractor.ExpectedConditions;

//create custom fields
var nameInput = $("fims-text-input[controlname='name'] input");
var descriptionInput = $("textarea[formcontrolname='description']");
var identifierInput = $$("fims-id-input[controlname='identifier'] input");
var labelInput = $$("fims-text-input[controlname='label'] input");
var hintInput = $$("fims-text-input[controlname='hint'] input");
var checkboxMandatory = $("md-checkbox[formcontrolname='mandatory']");
var descriptionInputField = $$("textarea[formcontrolname='description']");
var radioButtonGroupDataType = $$("md-radio-group[formcontrolname='dataType']");

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
    enterTextIntoLabelInputFieldForField: function(text, fieldNumber) {
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
        expect(radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(0).getAttribute("class")).toMatch("mat-radio-checked");
    },
    verifyRadioTextIsDisabledForField: function(fieldNumber) {
        expect(radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(0).getAttribute("class")).toMatch("mat-radio-disabled");
    },
    selectRadioButtonNumberForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(1).click();
    },
    selectRadioButtonDateForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(2).click();
    },
    selectRadioButtonSingleSelectionForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(3).click();
    },
    selectRadioButtonMultiSelectionForField: function(fieldNumber){
        radioButtonGroupDataType.get(fieldNumber-1).$$("md-radio-button").get(4).click();
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
    clickButtonAddOption: function(){
        buttons.filter(function(elem, index) {
            return elem.$("span").getText().then(function(text) {
                return text === "Add option";
            });
        }).click();
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
    checkCheckboxMandatory: function(){
        checkboxMandatory.click();
    }
};
