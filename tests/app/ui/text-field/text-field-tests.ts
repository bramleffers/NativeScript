﻿import * as TKUnit from "../../TKUnit";
import * as helper from "../helper";
import * as viewModule from "tns-core-modules/ui/core/view";
import * as pagesModule from "tns-core-modules/ui/page";
import * as textFieldTestsNative from "./text-field-tests-native";
import * as colorModule from "tns-core-modules/color";
import * as platform from "tns-core-modules/platform";
import * as formattedStringModule from "tns-core-modules/text/formatted-string";
import * as spanModule from "tns-core-modules/text/span";

// >> require-textfield
import * as textFieldModule from "tns-core-modules/ui/text-field";
// << require-textfield
// Other frequently used modules when working with buttons include:

import * as bindable from "tns-core-modules/ui/core/bindable";
// >> require-observable-textfield
import * as observable from "tns-core-modules/data/observable";
// << require-observable-textfield

// ### Binding two TextFields text property to observable view-model property.
// >> binding-text-property-textfield
function pageLoaded(args) {
    var page = args.object;
    var obj = new observable.Observable();
    obj.set("someProperty", "Please change this text!");
    page.bindingContext = obj;
}
exports.pageLoaded = pageLoaded;
// << binding-text-property-textfield

export function test_recycling() {
    helper.nativeView_recycling_test(_createTextFieldFunc);
}

var _createTextFieldFunc = function (): textFieldModule.TextField {
    // >> creating-textfield
    var textField = new textFieldModule.TextField();
    // << creating-textfield
    textField.text = "textField";
    return textField;
}

export var testSetText = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> setting-text-property
        textField.text = "Hello, world!";
        // << setting-text-property

        var expectedValue = "Hello, world!";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextNull = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.text = null;

        var expectedValue = "";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextUndefined = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.text = undefined;

        var expectedValue = "";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextToZero = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        (<any>textField).text = 0;

        var expectedValue = "0";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

function createFormattedString(value: any): formattedStringModule.FormattedString {
    var span = new spanModule.Span();
    span.text = value;
    var result = new formattedStringModule.FormattedString();
    result.spans.push(span);
    return result;
}

export var testSetTextWithSpan = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.formattedText = createFormattedString("Hello, world!");

        var expectedValue = "Hello, world!";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextNullWithSpan = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.formattedText = createFormattedString(null);

        var expectedValue = "";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextUndefinedWithSpan = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.formattedText = createFormattedString(undefined);

        var expectedValue = "";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

export var testSetTextToZeroWithSpan = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.formattedText = createFormattedString(0);

        var expectedValue = "0";
        var actualValue = textFieldTestsNative.getNativeText(textField);
        TKUnit.assertEqual(actualValue, expectedValue, "TextField native text");
    });
}

/* tslint:disable */
export var testSetHintToNumber = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var expectedValue = 1;

        // >> setting-hint-property
        textField.hint = <any>expectedValue;
        // << setting-hint-property

        var actualValue = textFieldTestsNative.getNativeHint(textField);
        TKUnit.assert(<any>actualValue == expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);

    });
}
/* tslint:enable */
export var testBindTextDirectlyToModel = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> binding-text-property-second
        var model = new observable.Observable();
        model.set("username", "john");
        var options: bindable.BindingOptions = {
            sourceProperty: "username",
            targetProperty: "text"
        }
        textField.bind(options, model);
        // textField.text is now "john"
        // >> (hide)
        TKUnit.assert(textField.text === "john", "Actual: " + textField.text + "; Expected: " + "john");
        TKUnit.assert(textFieldTestsNative.getNativeText(textField) === "john", "Actual: " + textFieldTestsNative.getNativeText(textField) + "; Expected: " + "john");
        // << (hide)
        model.set("username", "mary");
        // textField.text is now "mary"
        // >> (hide)
        TKUnit.assert(textField.text === "mary", "Actual: " + textField.text + "; Expected: " + "mary");
        TKUnit.assert(textFieldTestsNative.getNativeText(textField) === "mary", "Actual: " + textFieldTestsNative.getNativeText(textField) + "; Expected: " + "mary");
        // << (hide)
        // << binding-text-property-second
    });
}

// Supported for ios only.
if (platform.device.os === platform.platformNames.ios) {
    exports.test_set_color = function () {
        helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
            var textField = <textFieldModule.TextField>views[0];
            textField.color = new colorModule.Color("red");
            TKUnit.assertEqual(textField.color.ios.CGColor, textField.ios.textColor.CGColor, "textField.color");
        });
    }
}

export var testBindTextToBindingContext = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];

        var model = new observable.Observable();
        model.set("username", "john");
        page.bindingContext = model;

        var options: bindable.BindingOptions = {
            sourceProperty: "username",
            targetProperty: "text"
        }

        textField.bind(options);
        TKUnit.assert(textField.text === "john", "Actual: " + textField.text + "; Expected: " + "john");
        TKUnit.assert(textFieldTestsNative.getNativeText(textField) === "john", "Actual: " + textFieldTestsNative.getNativeText(textField) + "; Expected: " + "john");

        model.set("username", "mary");
        TKUnit.assert(textField.text === "mary", "Actual: " + textField.text + "; Expected: " + "mary");
        TKUnit.assert(textFieldTestsNative.getNativeText(textField) === "mary", "Actual: " + textFieldTestsNative.getNativeText(textField) + "; Expected: " + "mary");
    });
}

export var testTextIsUpdatedWhenUserTypes = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        textField.updateTextTrigger = "focusLost";

        var expectedValue = "Hello, world!";
        textFieldTestsNative.typeTextNatively(textField, expectedValue);

        var actualValue = textField.text;
        TKUnit.assert(actualValue === expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);
    });
}

export var testSetHint = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> setting-hint-text
        textField.hint = "type your username here";
        // << setting-hint-text

        var expectedValue = "type your username here";
        var actualValue = textFieldTestsNative.getNativeHint(textField);
        TKUnit.assert(actualValue === expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);
    });
}

export var testBindHintDirectlyToModel = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> binding-hint-property-textfield
        var model = new observable.Observable();
        model.set("hint", "type your username here");
        var options: bindable.BindingOptions = {
            sourceProperty: "hint",
            targetProperty: "hint"
        }
        textField.bind(options, model);
        // textField.hint is now "type your username here"
        // >> (hide)
        TKUnit.assert(textField.hint === "type your username here", "Actual: " + textField.text + "; Expected: " + "type your username here");
        TKUnit.assert(textFieldTestsNative.getNativeHint(textField) === "type your username here", "Actual: " + textFieldTestsNative.getNativeHint(textField) + "; Expected: " + "type your username here");
        // << (hide)
        model.set("hint", "type your password here");
        // textField.hint is now "type your password here"
        // >> (hide)
        TKUnit.assert(textField.hint === "type your password here", "Actual: " + textField.text + "; Expected: " + "type your password here");
        TKUnit.assert(textFieldTestsNative.getNativeHint(textField) === "type your password here", "Actual: " + textFieldTestsNative.getNativeHint(textField) + "; Expected: " + "type your password here");
        // << (hide)
        // << binding-hint-property-textfield
    });
}

export var testBindHintToBindingConext = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];

        var model = new observable.Observable();
        model.set("hint", "type your username here");
        page.bindingContext = model;

        var options: bindable.BindingOptions = {
            sourceProperty: "hint",
            targetProperty: "hint"
        }

        textField.bind(options);
        TKUnit.assert(textField.hint === "type your username here", "Actual: " + textField.hint + "; Expected: " + "type your username here");
        TKUnit.assert(textFieldTestsNative.getNativeHint(textField) === "type your username here", "Actual: " + textFieldTestsNative.getNativeHint(textField) + "; Expected: " + "type your username here");

        model.set("hint", "type your password here");
        TKUnit.assert(textField.hint === "type your password here", "Actual: " + textField.text + "; Expected: " + "type your password here");
        TKUnit.assert(textFieldTestsNative.getNativeHint(textField) === "type your password here", "Actual: " + textFieldTestsNative.getNativeHint(textField) + "; Expected: " + "type your password here");
    });
}

export var testSetSecure = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> setting-secure-property
        textField.secure = true;
        // << setting-secure-property

        var expectedValue = true;
        var actualValue = textFieldTestsNative.getNativeSecure(textField);
        TKUnit.assert(actualValue === expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);
    });
}

export var testSetSecureAndKeyboardTypeNumber = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.secure = true;
        textField.keyboardType = "number";

        var expectedValue = true;
        var actualValue = textFieldTestsNative.getNativeSecure(textField);
        TKUnit.assert(actualValue === expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);
    });
}

export var testSetKeyboardTypeNumberAndSecure = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        textField.keyboardType = "number";
        textField.secure = true;

        var expectedValue = true;
        var actualValue = textFieldTestsNative.getNativeSecure(textField);
        TKUnit.assert(actualValue === expectedValue, "Actual: " + actualValue + "; Expected: " + expectedValue);
    });
}

export var testBindSecureDirectlyToModel = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];

        // >> binding-secure-property
        var model = new observable.Observable();
        model.set("secure", true);
        var options: bindable.BindingOptions = {
            sourceProperty: "secure",
            targetProperty: "secure"
        }
        textField.bind(options, model);
        // textField.secure is now true
        // >> (hide)
        TKUnit.assert(textField.secure === true, "Actual: " + textField.secure + "; Expected: " + true);
        TKUnit.assert(textFieldTestsNative.getNativeSecure(textField) === true, "Actual: " + textFieldTestsNative.getNativeSecure(textField) + "; Expected: " + true);
        // << (hide)
        model.set("secure", false);
        // textField.secure is now false
        // >> (hide)
        TKUnit.assert(textField.secure === false, "Actual: " + textField.secure + "; Expected: " + false);
        TKUnit.assert(textFieldTestsNative.getNativeSecure(textField) === false, "Actual: " + textFieldTestsNative.getNativeSecure(textField) + "; Expected: " + false);
        // << (hide)
        // << binding-secure-property
    });
}

export var testBindSecureToBindingConext = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];

        var model = new observable.Observable();
        model.set("secure", true);
        page.bindingContext = model;

        var options: bindable.BindingOptions = {
            sourceProperty: "secure",
            targetProperty: "secure"
        }

        textField.bind(options);
        TKUnit.assert(textField.secure === true, "Actual: " + textField.secure + "; Expected: " + true);
        TKUnit.assert(textFieldTestsNative.getNativeSecure(textField) === true, "Actual: " + textFieldTestsNative.getNativeSecure(textField) + "; Expected: " + true);

        model.set("secure", false);
        TKUnit.assert(textField.secure === false, "Actual: " + textField.secure + "; Expected: " + false);
        TKUnit.assert(textFieldTestsNative.getNativeSecure(textField) === false, "Actual: " + textFieldTestsNative.getNativeSecure(textField) + "; Expected: " + false);
    });
}

var expectedFontSize = 42;
export var testLocalFontSizeFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];

        page.css = "textfield { font-size: " + expectedFontSize + "; }";
        var actualResult = textField.style.fontSize;
        TKUnit.assert(actualResult === expectedFontSize, "Actual: " + actualResult + "; Expected: " + expectedFontSize);
    });
}

export var testNativeFontSizeFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { font-size: " + expectedFontSize + "; }";

        var actualResult = textFieldTestsNative.getNativeFontSize(textField);
        helper.assertAreClose(actualResult, expectedFontSize, "FontSizeFromCss");
    });
}

export var testNativeFontSizeFromLocal = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        textField.style.fontSize = expectedFontSize;

        var actualResult = textFieldTestsNative.getNativeFontSize(textField);
        helper.assertAreClose(actualResult, expectedFontSize, "FontSizeFromLocal");
    });
}

var expectedColorHex = "#FFFF0000";
var expectedNormalizedColorHex = "#FF0000";
export var testLocalColorFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { color: " + expectedColorHex + "; }";

        var actualResult = textField.style.color.hex;
        TKUnit.assert(actualResult === expectedNormalizedColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedColorHex);
    });
}

export var testNativeColorFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { color: " + expectedColorHex + "; }";

        var actualResult = textFieldTestsNative.getNativeColor(textField).hex;
        TKUnit.assert(actualResult === expectedNormalizedColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedColorHex);
    });
}

export var testNativeColorFromLocal = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        textField.style.color = new colorModule.Color(expectedColorHex);

        var actualResult = textFieldTestsNative.getNativeColor(textField).hex;
        TKUnit.assert(actualResult === expectedNormalizedColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedColorHex);
    });
}

var expectedBackgroundColorHex = "#FF00FF00";
var expectedNormalizedBackgroundColorHex = "#00FF00";
export var testLocalBackgroundColorFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { background-color: " + expectedBackgroundColorHex + "; }";

        var actualResult = textField.style.backgroundColor.hex;
        TKUnit.assert(actualResult === expectedNormalizedBackgroundColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedBackgroundColorHex);
    });
}

export var testNativeBackgroundColorFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { background-color: " + expectedBackgroundColorHex + "; }";

        helper.waitUntilLayoutReady(textField);

        var actualResult = textFieldTestsNative.getNativeBackgroundColor(textField).hex;
        TKUnit.assert(actualResult === expectedNormalizedBackgroundColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedBackgroundColorHex);
    });
}

export var testNativeBackgroundColorFromLocal = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var textField = <textFieldModule.TextField>views[0];
        textField.style.backgroundColor = new colorModule.Color(expectedBackgroundColorHex);

        helper.waitUntilLayoutReady(textField);

        var actualResult = textFieldTestsNative.getNativeBackgroundColor(textField).hex;
        TKUnit.assert(actualResult === expectedNormalizedBackgroundColorHex, "Actual: " + actualResult + "; Expected: " + expectedNormalizedBackgroundColorHex);
    });
}

var expectedTextAlignment: "right" = "right";
export var testLocalTextAlignmentFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var view = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { text-align: " + expectedTextAlignment + "; }";

        var actualResult = view.style.textAlignment;
        TKUnit.assert(actualResult === expectedTextAlignment, "Actual: " + actualResult + "; Expected: " + expectedTextAlignment);
    });
}

export var testNativeTextAlignmentFromCss = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var view = <textFieldModule.TextField>views[0];
        var page = <pagesModule.Page>views[1];
        page.css = "textfield { text-align: " + expectedTextAlignment + "; }";

        var actualResult = textFieldTestsNative.getNativeTextAlignment(view);
        TKUnit.assert(actualResult === expectedTextAlignment, "Actual: " + actualResult + "; Expected: " + expectedTextAlignment);
    });
}

export var testNativeTextAlignmentFromLocal = function () {
    helper.buildUIAndRunTest(_createTextFieldFunc(), function (views: Array<viewModule.View>) {
        var view = <textFieldModule.TextField>views[0];
        view.style.textAlignment = expectedTextAlignment;

        var actualResult = textFieldTestsNative.getNativeTextAlignment(view);
        TKUnit.assert(actualResult === expectedTextAlignment, "Actual: " + actualResult + "; Expected: " + expectedTextAlignment);
    });
}

export var testMemoryLeak = function (done) {
    helper.buildUIWithWeakRefAndInteract(_createTextFieldFunc, function (textField) {
        textFieldTestsNative.typeTextNatively(textField, "Hello, world!");
    }, done);
}

export var test_WhenFormattedTextPropertyChanges_TextIsUpdated_TextBase = function () {
    var firstSpan = new spanModule.Span();
    firstSpan.fontSize = 10;
    firstSpan.text = "First";
    var secondSpan = new spanModule.Span();
    secondSpan.fontSize = 15;
    secondSpan.text = "Second";
    var thirdSpan = new spanModule.Span();
    thirdSpan.fontSize = 20;
    thirdSpan.text = "Third";
    var formattedString1 = new formattedStringModule.FormattedString();
    formattedString1.spans.push(firstSpan);
    var formattedString2 = new formattedStringModule.FormattedString();
    formattedString2.spans.push(secondSpan);
    formattedString2.spans.push(thirdSpan);

    var view = new textFieldModule.TextField();
    helper.buildUIAndRunTest(view, function (views: Array<viewModule.View>) {
        TKUnit.assertEqual(view.text, "");

        view.formattedText = formattedString1;
        TKUnit.assertEqual(view.text, "First");

        view.formattedText = formattedString2;
        TKUnit.assertEqual(view.text, "SecondThird");

        formattedString2.spans.getItem(0).text = "Mecond";
        TKUnit.assertEqual(view.text, "MecondThird");

        view.formattedText = null;
        TKUnit.assertEqual(view.text, "");
    });
}

export function test_IntegrationTest_Transform_Decoration_Spacing_WithoutFormattedText_DoesNotCrash() {
    let view = new textFieldModule.TextField();
    helper.buildUIAndRunTest(view, function (views: Array<viewModule.View>) {
        TKUnit.assertEqual(view.text, "", "Text");
        TKUnit.assertEqual(view.style.textTransform, "initial", "TextTransform default value");
        TKUnit.assertEqual(view.style.textDecoration, "none", "TextDecoration default value");
        TKUnit.assertTrue(view.style.letterSpacing === 0, "LetterSpacing default value");

        view.text = "NormalText";
        view.setInlineStyle("text-transform: uppercase; text-decoration: underline; letter-spacing: 1;");

        TKUnit.assertEqual(view.style.textTransform, "uppercase", "TextTransform");
        TKUnit.assertEqual(view.style.textDecoration, "underline", "TextDecoration");
        TKUnit.assertEqual(view.style.letterSpacing, 1, "LetterSpacing");
    });
}

export function test_IntegrationTest_Transform_Decoration_Spacing_WithFormattedText_DoesNotCrash() {
    let view = new textFieldModule.TextField();
    let formattedString = helper._generateFormattedString();
    helper.buildUIAndRunTest(view, function (views: Array<viewModule.View>) {
        view.formattedText = formattedString;
        view.setInlineStyle("text-transform: uppercase; text-decoration: underline; letter-spacing: 1;");

        TKUnit.assertEqual(view.style.textTransform, "uppercase", "TextTransform");
        TKUnit.assertEqual(view.style.textDecoration, "underline", "TextDecoration");
        TKUnit.assertEqual(view.style.letterSpacing, 1, "LetterSpacing");
    });
}

export function test_set_placeholder_color() {
    let view = new textFieldModule.TextField();
    let expectedColorHex = "#FFFF0000";
    let expectedNormalizedColorHex = "#FF0000";
    helper.buildUIAndRunTest(view, function (views: Array<viewModule.View>) {
        view.hint = "Some text for hint";
        view.setInlineStyle("placeholder-color: " + expectedColorHex + ";");
        let actualColorHex = textFieldTestsNative.getNativePlaceholderColor(view).hex;
        TKUnit.assertEqual(actualColorHex, expectedNormalizedColorHex);
    });
}

export function test_set_placeholder_color_when_hint_is_not_set() {
    let view = new textFieldModule.TextField();
    let expectedColorHex = "#FFFF0000";
    let expectedNormalizedColorHex = "#FF0000";
    helper.buildUIAndRunTest(view, function (views: Array<viewModule.View>) {
        view.setInlineStyle("placeholder-color: " + expectedColorHex + ";");
        let actualColorHex = textFieldTestsNative.getNativePlaceholderColor(view).hex;
        TKUnit.assertEqual(actualColorHex, expectedNormalizedColorHex);
    });
}
