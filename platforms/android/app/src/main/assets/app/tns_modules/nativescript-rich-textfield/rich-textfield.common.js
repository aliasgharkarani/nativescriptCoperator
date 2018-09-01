"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var textFieldModule = require("ui/text-field");
var label = require("ui/label");
var color = require("color");
var stack = require("ui/layouts/stack-layout");
var dependency_observable_1 = require("ui/core/dependency-observable");
var proxy_1 = require("ui/core/proxy");
var platform_1 = require("platform");
var propertyMetadataSettings = platform_1.isAndroid ? dependency_observable_1.PropertyMetadataSettings.None : dependency_observable_1.PropertyMetadataSettings.AffectsLayout;
function onPropertyChanged(data) {
    var richTextField = data.object;
    richTextField.onPropertyChanged(data);
}
var RichTextField = (function (_super) {
    __extends(RichTextField, _super);
    function RichTextField() {
        var _this = _super.call(this) || this;
        _this.textField = new textFieldModule.TextField();
        _this.label = new label.Label();
        _this.fieldHeight = 40;
        _this.height = _this.fieldHeight;
        _this.textField.hint = "Custom hint";
        _this.textField.setInlineStyle("placeholder-color:rgba(255,255,255, 0.5); padding-left: 20;padding-right:40;width: 100%;color:rgba(255,255,255, 1);");
        _this.textField.setInlineStyle("background-color:rgba(255,255,255, 0.4);padding-top: 12;padding-bottom: 8;");
        _this.textField.height = _this.fieldHeight;
        _this.textField.borderColor = new color.Color("white");
        _this.iconSize = 20;
        _this.label.text = "\uf007";
        _this.label.setInlineStyle("background-color: rgba(255,255,255, 0.4);color:rgba(255,255,255, 0.5);padding-left: 40;margin-top: 0;");
        _this.label.setInlineStyle("padding-top: 10;padding-bottom: 10;font-family: FontAwesome,fontawesome-webfont;vertical-align: center;");
        _this.label.height = _this.fieldHeight;
        _this.label.fontSize = _this.iconSize;
        _this.label.borderColor = new color.Color("white");
        _this.orientation = "horizontal";
        _this.addChild(_this.label);
        _this.addChild(_this.textField);
        _this.addEventListener(stack.StackLayout.loadedEvent, _this.onLoad, _this);
        return _this;
    }
    Object.defineProperty(RichTextField.prototype, "secure", {
        get: function () {
            return this._getValue(RichTextField.secureProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.secureProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "textPaddingLeft", {
        get: function () {
            return this._getValue(RichTextField.textPaddingLeftProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.textPaddingLeftProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldPaddingTop", {
        get: function () {
            return this._getValue(RichTextField.fieldPaddingTopProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldPaddingTopProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "iconColor", {
        get: function () {
            return this._getValue(RichTextField.iconColorProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.iconColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "icon", {
        get: function () {
            return this._getValue(RichTextField.iconProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.iconProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "iconSize", {
        get: function () {
            return this._getValue(RichTextField.iconSizeProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.iconSizeProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldHeight", {
        get: function () {
            return this._getValue(RichTextField.fieldHeightProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldHeightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldColor", {
        get: function () {
            return this._getValue(RichTextField.fieldColorProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldPaddingLeft", {
        get: function () {
            return this._getValue(RichTextField.fieldPaddingLeftProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldPaddingLeftProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldPaddingRight", {
        get: function () {
            return this._getValue(RichTextField.fieldPaddingRightProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldPaddingRightProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldBackgroundColor", {
        get: function () {
            return this._getValue(RichTextField.fieldBackgroundColorProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldBackgroundColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldHint", {
        get: function () {
            return this._getValue(RichTextField.fieldHintProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldHintProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldHintColor", {
        get: function () {
            return this._getValue(RichTextField.fieldHintColorProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldHintColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldBorderColor", {
        get: function () {
            return this._getValue(RichTextField.fieldBorderColorProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldBorderColorProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldBorderWidth", {
        get: function () {
            return this._getValue(RichTextField.fieldBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldLeftBorderWidth", {
        get: function () {
            return this._getValue(RichTextField.fieldLeftBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldLeftBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldRightBorderWidth", {
        get: function () {
            return this._getValue(RichTextField.fieldRightBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldRightBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldTopBorderWidth", {
        get: function () {
            return this._getValue(RichTextField.fieldTopBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldTopBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RichTextField.prototype, "fieldBottomBorderWidth", {
        get: function () {
            return this._getValue(RichTextField.fieldBottomBorderWidthProperty);
        },
        set: function (value) {
            this._setValue(RichTextField.fieldBottomBorderWidthProperty, value);
        },
        enumerable: true,
        configurable: true
    });
    RichTextField.prototype.onLoad = function (eventData) {
        var stackLayout = eventData.object;
        if (Number(stackLayout.fieldHeight) > 40) {
            this.textField.setInlineStyle("padding-bottom:10;");
        }
        if (stackLayout.fieldHeight) {
            this.label.setInlineStyle("height: " + stackLayout.fieldHeight + ";");
            this.textField.setInlineStyle("height: " + stackLayout.fieldHeight + ";");
            var labelPadding = this.calculateLabelPadding(stackLayout);
            this.label.setInlineStyle("padding-top: " + labelPadding + ";");
            if (this.height < stackLayout.fieldHeight) {
                this.height = stackLayout.fieldHeight;
            }
        }
        if (stackLayout.fieldPaddingTop) {
            this.label.setInlineStyle("padding-top: " + stackLayout.fieldPaddingTop + ";");
        }
    };
    RichTextField.prototype.onPropertyChanged = function (data) {
        switch (data.property.name) {
            case "iconColor": {
                this.label.setInlineStyle("color: " + data.newValue + ";");
                break;
            }
            case "fieldPaddingTop": {
                this.label.setInlineStyle("padding-top: " + data.newValue + ";");
                break;
            }
            case "secure": {
                this.textField.secure = data.newValue;
                break;
            }
            case "icon": {
                var icon = data.newValue;
                if (typeof icon === "number") {
                    icon = String.fromCharCode(icon);
                }
                this.label.text = icon;
                break;
            }
            case "fieldHeight": {
                this.label.setInlineStyle("height: " + data.newValue + ";");
                this.textField.setInlineStyle("height: " + data.newValue + ";");
                var labelPadding = this.calculateLabelPadding(data.object);
                this.label.setInlineStyle("padding-top: " + labelPadding + ";");
                if (this.height < Number(data.newValue)) {
                    this.height = data.newValue;
                }
                break;
            }
            case "textPaddingLeft": {
                this.textField.setInlineStyle("padding-left: " + data.newValue + ";");
                break;
            }
            case "fieldPaddingRight": {
                this.textField.setInlineStyle("padding-right: " + data.newValue + ";");
                break;
            }
            case "fieldPaddingLeft": {
                this.label.setInlineStyle("padding-left: " + data.newValue + ";");
                break;
            }
            case "fieldBackgroundColor": {
                this.label.setInlineStyle("background-color: " + data.newValue + ";");
                this.textField.setInlineStyle("background-color: " + data.newValue + ";");
                break;
            }
            case "fieldColor": {
                this.textField.setInlineStyle("color: " + data.newValue + ";");
                break;
            }
            case "iconSize": {
                this.iconSize = data.newValue;
                this.label.fontSize = data.newValue;
                break;
            }
            case "fieldHint": {
                this.textField.hint = data.newValue;
                break;
            }
            case "fieldHintColor": {
                this.textField.setInlineStyle("placeholder-color: " + data.newValue + ";");
                break;
            }
            case "fieldBorderColor": {
                this.textField.setInlineStyle("border-color: " + data.newValue + ";");
                this.label.setInlineStyle("border-color: " + data.newValue + ";");
                break;
            }
            case "fieldBorderWidth": {
                var fieldBorder = data.newValue;
                this.textField.borderTopWidth = fieldBorder;
                this.textField.borderBottomWidth = fieldBorder;
                this.textField.borderRightWidth = fieldBorder;
                this.label.borderTopWidth = fieldBorder;
                this.label.borderBottomWidth = fieldBorder;
                this.label.borderLeftWidth = fieldBorder;
                break;
            }
            case "fieldLeftBorderWidth": {
                this.label.borderLeftWidth = data.newValue;
                break;
            }
            case "fieldRightBorderWidth": {
                this.textField.borderRightWidth = data.newValue;
                break;
            }
            case "fieldTopBorderWidth": {
                this.textField.borderTopWidth = data.newValue;
                this.label.borderTopWidth = data.newValue;
                break;
            }
            case "fieldBottomBorderWidth": {
                this.textField.borderBottomWidth = data.newValue;
                this.label.borderBottomWidth = data.newValue;
                break;
            }
        }
    };
    RichTextField.prototype.calculateLabelPadding = function (stackLayout) {
        var labelPadding = (Number(stackLayout.fieldHeight) - Number(this.iconSize)) / 2;
        if (stackLayout.fieldBorderWidth) {
            labelPadding = labelPadding - Number(stackLayout.fieldBorderWidth);
        }
        else if (stackLayout.fieldTopBorderWidth) {
            labelPadding = labelPadding - Number(stackLayout.fieldTopBorderWidth) / 2;
        }
        else if (stackLayout.fieldBottomBorderWidth) {
            labelPadding = labelPadding - Number(stackLayout.fieldBottomBorderWidth) / 2;
        }
        return labelPadding;
    };
    return RichTextField;
}(stack.StackLayout));
RichTextField.secureProperty = new dependency_observable_1.Property("secure", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.textPaddingLeftProperty = new dependency_observable_1.Property("textPaddingLeft", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldPaddingTopProperty = new dependency_observable_1.Property("fieldPaddingTop", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.iconColorProperty = new dependency_observable_1.Property("iconColor", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.iconProperty = new dependency_observable_1.Property("icon", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.iconSizeProperty = new dependency_observable_1.Property("iconSize", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldHeightProperty = new dependency_observable_1.Property("fieldHeight", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldColorProperty = new dependency_observable_1.Property("fieldColor", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldPaddingLeftProperty = new dependency_observable_1.Property("fieldPaddingLeft", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldPaddingRightProperty = new dependency_observable_1.Property("fieldPaddingRight", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldBackgroundColorProperty = new dependency_observable_1.Property("fieldBackgroundColor", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldHintProperty = new dependency_observable_1.Property("fieldHint", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldHintColorProperty = new dependency_observable_1.Property("fieldHintColor", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldBorderColorProperty = new dependency_observable_1.Property("fieldBorderColor", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldBorderWidthProperty = new dependency_observable_1.Property("fieldBorderWidth", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldLeftBorderWidthProperty = new dependency_observable_1.Property("fieldLeftBorderWidth", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldRightBorderWidthProperty = new dependency_observable_1.Property("fieldRightBorderWidth", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldTopBorderWidthProperty = new dependency_observable_1.Property("fieldTopBorderWidth", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
RichTextField.fieldBottomBorderWidthProperty = new dependency_observable_1.Property("fieldBottomBorderWidth", "RichTextField", new proxy_1.PropertyMetadata("", propertyMetadataSettings, onPropertyChanged));
exports.RichTextField = RichTextField;
//# sourceMappingURL=rich-textfield.common.js.map