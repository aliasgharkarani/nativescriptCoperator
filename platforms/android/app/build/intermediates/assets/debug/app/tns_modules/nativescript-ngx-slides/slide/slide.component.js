"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SlideComponent = (function () {
    function SlideComponent() {
        this.cssClass = '';
        this.tap = new core_1.EventEmitter();
        this.doubleTap = new core_1.EventEmitter();
        this.pinch = new core_1.EventEmitter();
        this.cssClass = this.cssClass ? this.cssClass : '';
    }
    Object.defineProperty(SlideComponent.prototype, "slideWidth", {
        set: function (width) {
            this.layout.width = width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideComponent.prototype, "slideHeight", {
        set: function (height) {
            this.layout.height = height;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideComponent.prototype, "layout", {
        get: function () {
            return this.slideLayout.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    SlideComponent.prototype.ngOnInit = function () {
    };
    SlideComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.slideLayout.nativeElement.on('tap', function (args) {
            _this.tap.next(args);
        });
        this.slideLayout.nativeElement.on('doubleTap', function (args) {
            _this.doubleTap.next(args);
        });
        this.slideLayout.nativeElement.on('pinch', function (args) {
            _this.pinch.next(args);
        });
    };
    SlideComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'slide',
                    template: "\n\t<StackLayout #slideLayout [class]=\"cssClass\">\n\t\t<ng-content></ng-content>\n\t</StackLayout>\n\t",
                    encapsulation: core_1.ViewEncapsulation.None
                },] },
    ];
    /** @nocollapse */
    SlideComponent.ctorParameters = function () { return []; };
    SlideComponent.propDecorators = {
        "slideLayout": [{ type: core_1.ViewChild, args: ['slideLayout',] },],
        "cssClass": [{ type: core_1.Input, args: ['class',] },],
        "tap": [{ type: core_1.Output, args: ['tap',] },],
        "doubleTap": [{ type: core_1.Output, args: ['doubleTap',] },],
        "pinch": [{ type: core_1.Output, args: ['pinch',] },],
    };
    return SlideComponent;
}());
exports.SlideComponent = SlideComponent;
