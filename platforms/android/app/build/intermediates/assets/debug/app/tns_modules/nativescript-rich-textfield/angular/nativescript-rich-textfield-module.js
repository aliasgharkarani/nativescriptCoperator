"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var element_registry_1 = require("nativescript-angular/element-registry");
var nativescript_rich_textfield_directives_1 = require("./nativescript-rich-textfield-directives");
var RichTextFieldModule = (function () {
    function RichTextFieldModule() {
    }
    return RichTextFieldModule;
}());
RichTextFieldModule = __decorate([
    core_1.NgModule({
        declarations: [nativescript_rich_textfield_directives_1.DIRECTIVES],
        exports: [nativescript_rich_textfield_directives_1.DIRECTIVES],
    })
], RichTextFieldModule);
exports.RichTextFieldModule = RichTextFieldModule;
element_registry_1.registerElement("RichTextField", function () { return require("../").RichTextField; });
//# sourceMappingURL=nativescript-rich-textfield-module.js.map