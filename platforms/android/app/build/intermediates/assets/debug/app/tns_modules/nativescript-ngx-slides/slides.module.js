"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var slides_component_1 = require("./slides/slides.component");
var slide_component_1 = require("./slide/slide.component");
var slides_component_2 = require("./slides/slides.component");
exports.SlidesComponent = slides_component_2.SlidesComponent;
var slide_component_2 = require("./slide/slide.component");
exports.SlideComponent = slide_component_2.SlideComponent;
var SlidesModule = (function () {
    function SlidesModule() {
    }
    SlidesModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule],
                    exports: [slide_component_1.SlideComponent, slides_component_1.SlidesComponent],
                    declarations: [slides_component_1.SlidesComponent, slide_component_1.SlideComponent],
                    providers: [],
                    schemas: [
                        core_1.NO_ERRORS_SCHEMA
                    ]
                },] },
    ];
    /** @nocollapse */
    SlidesModule.ctorParameters = function () { return []; };
    return SlidesModule;
}());
exports.SlidesModule = SlidesModule;
