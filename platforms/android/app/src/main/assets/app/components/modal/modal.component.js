"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_1 = require("platform");
var enums_1 = require("ui/enums");
var gestures_1 = require("ui/gestures");
var page_1 = require("ui/page");
var application_1 = require("application");
// No support for Array#includes here
function includes(container, value) {
    var returnValue = false;
    var pos = container.indexOf(value);
    if (pos >= 0) {
        returnValue = true;
    }
    return returnValue;
}
var GestureRecognizer, Interop;
if (application_1.ios) {
    GestureRecognizer = NSObject;
    Interop = interop;
}
else {
    GestureRecognizer = /** @class */ (function () {
        function A() {
        }
        return A;
    }());
    Interop = { types: { id: void 0, void: void 0 } };
}
var HideGestureRecognizerImpl = /** @class */ (function (_super) {
    __extends(HideGestureRecognizerImpl, _super);
    function HideGestureRecognizerImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideGestureRecognizerImpl.initWithOwner = function (owner) {
        var handler = new HideGestureRecognizerImpl();
        handler._owner = owner;
        return handler;
    };
    HideGestureRecognizerImpl.prototype.tap = function () {
        this._owner.ios.resignFirstResponder();
        if (this.func) {
            this.func();
        }
    };
    HideGestureRecognizerImpl.ObjCExposedMethods = {
        "tap": { returns: Interop.types.void, params: [Interop.types.id] }
    };
    return HideGestureRecognizerImpl;
}(GestureRecognizer));
// Keep external state of views
var targetHandler = null;
var targetHandler2 = null;
var ModalComponent = /** @class */ (function () {
    function ModalComponent(hostEl, page) {
        var _this = this;
        this.hostEl = hostEl;
        this.page = page;
        this.isShowing = false;
        this.durationScale = .75;
        this.data = null; // Optional data parameter
        this.size = "sm"; // sm | md | lg
        this.dismissable = true;
        this.alignment = "center"; // center | stretch | middle | top | bottom
        this.duration = 250; // in milliseconds
        this.open = new core_1.EventEmitter();
        this.close = new core_1.EventEmitter();
        this.onTapHide = function () {
            if (platform_1.isAndroid && _this.dismissable) {
                _this.hide();
            }
        };
        if (platform_1.isAndroid) {
            this.page.on(page_1.Page.loadedEvent, function () {
                application_1.android.on(application_1.AndroidApplication.activityBackPressedEvent, function (args) {
                    if (_this.isShowing) {
                        args.cancel = true;
                        _this.hide();
                    }
                });
            });
            this.page.on(page_1.Page.unloadedEvent, function () {
                application_1.android.off(application_1.AndroidApplication.activityBackPressedEvent);
            });
        }
    }
    ModalComponent.prototype.ngOnInit = function () {
        this.pageHeight = this.pageHeight ? this.pageHeight : platform_1.screen.mainScreen.heightDIPs;
        this.hostView.style.translateY = this.pageHeight;
    };
    ModalComponent.prototype.show = function (data) {
        var _this = this;
        if (data === void 0) { data = null; }
        if (!this.overlayView) {
            return;
        }
        this.hostView.style.translateY = 0;
        return this.overlayView.animate({
            translate: { x: 0, y: 0 }, duration: 0,
        }).then(function () { return _this.overlayView.animate({
            opacity: 1, duration: _this.timing * _this.durationScale,
        }); }).then(function () { return _this.bodyView.animate({
            translate: { x: 0, y: 0 },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.bodyView.animate({
            scale: { x: 1, y: 1 },
            opacity: 1,
            duration: _this.timing,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () {
            _this.open.emit(_this.data = data);
            _this.isShowing = true;
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.hide = function () {
        var _this = this;
        return this.bodyView.animate({
            opacity: 0,
            duration: this.timing * this.durationScale,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }).then(function () { return _this.bodyView.animate({
            scale: { x: .6, y: .6 },
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.cubicBezier(.12, .3, .58, .44),
        }); }).then(function () { return _this.overlayView.animate({
            opacity: 0, duration: _this.timing * _this.durationScale,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function () { return _this.overlayView.animate({
            translate: { x: 0, y: _this.pageHeight },
            duration: 0,
            curve: enums_1.AnimationCurve.easeInOut,
        }); }).then(function (data) {
            _this.hostView.style.translateY = _this.pageHeight;
            _this.close.emit(_this.data);
            _this.isShowing = false;
            return Promise.resolve(_this.data);
        }).catch(function () { return 0; });
    };
    ModalComponent.prototype.onLoad = function (_a) {
        var _this = this;
        var object = _a.object;
        this.overlayView = object;
        this.contentView.off([gestures_1.GestureTypes.touch, gestures_1.GestureTypes.tap].join(","));
        // Event Propagation
        if (application_1.ios) {
            targetHandler = HideGestureRecognizerImpl.initWithOwner(this.overlayView);
            if (this.dismissable) {
                targetHandler.func = function () { return _this.hide(); };
            }
            var gesture = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler, "tap");
            this.overlayView.ios.addGestureRecognizer(gesture);
            targetHandler2 = HideGestureRecognizerImpl.initWithOwner(this.bodyView);
            var gesture2 = UITapGestureRecognizer.alloc().initWithTargetAction(targetHandler2, "tap");
            gesture2.cancelsTouchesInView = true;
            this.bodyView.ios.addGestureRecognizer(gesture2);
        }
    };
    Object.defineProperty(ModalComponent.prototype, "timing", {
        get: function () {
            return +this.duration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "translateY", {
        get: function () {
            return this.pageHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "hostView", {
        get: function () {
            return this.hostEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "bodyView", {
        get: function () {
            return this.bodyEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "contentView", {
        get: function () {
            return this.contentEl.nativeElement;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalWidth", {
        get: function () {
            switch (this.size) {
                case "sm": return "65%";
                case "lg": return "98%";
                case "md":
                default: return "85%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "modalHeight", {
        get: function () {
            switch (this.size) {
                case "sm": return "50%";
                case "lg": return "98%";
                case "md":
                default: return "65%";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ModalComponent.prototype, "vAlignment", {
        get: function () {
            if (includes(["center", "stretch", "middle", "top", "bottom"], this.alignment)) {
                return this.alignment;
            }
            return "center";
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "size", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Boolean)
    ], ModalComponent.prototype, "dismissable", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", String)
    ], ModalComponent.prototype, "alignment", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], ModalComponent.prototype, "duration", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "open", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", Object)
    ], ModalComponent.prototype, "close", void 0);
    __decorate([
        core_1.ViewChild("bodyEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "bodyEl", void 0);
    __decorate([
        core_1.ViewChild("contentEl"),
        __metadata("design:type", core_1.ElementRef)
    ], ModalComponent.prototype, "contentEl", void 0);
    ModalComponent = __decorate([
        core_1.Component({
            selector: "modal, [modal]",
            template: "\n\t\t<GridLayout (loaded)=\"onLoad($event)\" (tap)=\"onTapHide()\" [translateY]=\"translateY\" opacity=\"0\" class=\"overlay\">\n\t\t\t<GridLayout #bodyEl [verticalAlignment]=\"vAlignment\" [width]=\"modalWidth\" [height]=\"modalHeight\" [translateY]=\"translateY\" scaleY=\".6\" scaleX=\".6\" opacity=\"0\"\n\t\t\tclass=\"overlay-body\">\n\t\t\t\t<StackLayout #contentEl class=\"overlay-content\">\n\t\t\t\t\t<ng-content></ng-content>\n\t\t\t\t</StackLayout>\n\t\t\t</GridLayout>\n\t\t</GridLayout>\n\t",
            styles: ["\n\t\t.overlay {\n\t\t\tbackground-color: rgba(0, 0, 0, 0.8);\n\t\t\tz-index: 999999;\n\t\t}\n\t\t.overlay .overlay-body { }\n\t\t.overlay .overlay-body .overlay-content {\n\t\t\tvertical-align: center;\n\t\t}\n\t\t.overlay .overlay-body >>> .close {\n\t\t\tcolor: red;\n\t\t\tfont-size: 16;\n\t\t}\n\t"]
        }),
        __metadata("design:paramtypes", [core_1.ElementRef,
            page_1.Page])
    ], ModalComponent);
    return ModalComponent;
}());
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kYWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNHO0FBRXRHLHFDQUE2QztBQUM3QyxrQ0FBMEM7QUFDMUMsd0NBQTJDO0FBQzNDLGdDQUErQjtBQUMvQiwyQ0FBb0c7QUFJcEcscUNBQXFDO0FBQ3JDLGtCQUFrQixTQUFTLEVBQUUsS0FBSztJQUM5QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDeEIsSUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNYLFdBQVcsR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUNELE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQUVELElBQUksaUJBQWlCLEVBQUUsT0FBTyxDQUFDO0FBQy9CLEVBQUUsQ0FBQyxDQUFDLGlCQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ04saUJBQWlCLEdBQUcsUUFBUSxDQUFDO0lBQzdCLE9BQU8sR0FBRyxPQUFPLENBQUM7QUFDdEIsQ0FBQztBQUFDLElBQUksQ0FBQyxDQUFDO0lBQ0osaUJBQWlCO1FBQUc7UUFBVSxDQUFDO1FBQUQsUUFBQztJQUFELENBQUMsQUFBWCxHQUFXLENBQUM7SUFDaEMsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUM7QUFDdEQsQ0FBQztBQUVEO0lBQXdDLDZDQUFpQjtJQUF6RDs7SUFtQkEsQ0FBQztJQWhCVSx1Q0FBYSxHQUFwQixVQUFxQixLQUFLO1FBQ3RCLElBQU0sT0FBTyxHQUFHLElBQUkseUJBQXlCLEVBQUUsQ0FBQztRQUNoRCxPQUFPLENBQUMsTUFBTSxH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QUFFOztnREFBd0M7SUFDdkM7UUFBVCxhQUFNLEVBQUU7O2lEQUF5QztJQUM3QjtRQUFwQixnQkFBUyxDQUFDLFFBQVEsQ0FBQztrQ0FBaUIsaUJBQVU7a0RBQUM7SUFDeEI7UUFBdkIsZ0JBQVMsQ0FBQyxXQUFXLENBQUM7a0NBQW9CLGlCQUFVO3FEQUFDO0lBYjdDLGNBQWM7UUE1QjFCLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsZ0JBQWdCO1lBQzFCLFFBQVEsRUFBRSwwZkFTWjtZQUNFLE1BQU0sRUFBRSxDQUFDLGdUQWFYLENBQUM7U0FDRixDQUFDO3lDQWtCc0IsaUJBQVU7WUFDWixXQUFJO09BakJiLGNBQWMsQ0ErSjFCO0lBQUQscUJBQUM7Q0FBQSxBQS9KRCxJQStKQztBQS9KWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBJbnB1dCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XHJcbmltcG9ydCB7IHNjcmVlbiwgaXNBbmRyb2lkIH0gZnJvbSBcInBsYXRmb3JtXCI7XHJcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlIH0gZnJvbSBcInVpL2VudW1zXCI7XHJcbmltcG9ydCB7IEdlc3R1cmVUeXBlcyB9IGZyb20gXCJ1aS9nZXN0dXJlc1wiO1xyXG5pbXBvcnQgeyBQYWdlIH0gZnJvbSBcInVpL3BhZ2VcIjtcclxuaW1wb3J0IHsgYW5kcm9pZCwgQW5kcm9pZEFwcGxpY2F0aW9uLCBBbmRyb2lkQWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50RGF0YSwgaW9zIH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XHJcblxyXG5kZWNsYXJlIGNvbnN0IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIsIGludGVyb3AsIE5TT2JqZWN0O1xyXG5cclxuLy8gTm8gc3VwcG9ydCBmb3IgQXJyYXkjaW5jbHVkZXMgaGVyZVxyXG5mdW5jdGlvbiBpbmNsdWRlcyhjb250YWluZXIsIHZhbHVlKSB7XHJcbiAgICB2YXIgcmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgIHZhciBwb3MgPSBjb250YWluZXIuaW5kZXhPZih2YWx1ZSk7XHJcbiAgICBpZiAocG9zID49IDApIHtcclxuICAgICAgICByZXR1cm5WYWx1ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcmV0dXJuVmFsdWU7XHJcbn1cclxuXHJcbmxldCBHZXN0dXJlUmVjb2duaXplciwgSW50ZXJvcDtcclxuaWYgKGlvcykge1xyXG4gICAgR2VzdHVyZVJlY29nbml6ZXIgPSBOU09iamVjdDtcclxuICAgIEludGVyb3AgPSBpbnRlcm9wO1xyXG59IGVsc2Uge1xyXG4gICAgR2VzdHVyZVJlY29nbml6ZXIgPSBjbGFzcyBBIHsgfTtcclxuICAgIEludGVyb3AgPSB7IHR5cGVzOiB7IGlkOiB2b2lkIDAsIHZvaWQ6IHZvaWQgMCB9IH07XHJcbn1cclxuXHJcbmNsYXNzIEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwgZXh0ZW5kcyBHZXN0dXJlUmVjb2duaXplciB7XHJcbiAgICBwdWJsaWMgZnVuYzogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBzdGF0aWMgaW5pdFdpdGhPd25lcihvd25lcikge1xyXG4gICAgICAgIGNvbnN0IGhhbmRsZXIgPSBuZXcgSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbCgpO1xyXG4gICAgICAgIGhhbmRsZXIuX293bmVyID0gb3duZXI7XHJcbiAgICAgICAgcmV0dXJuIGhhbmRsZXI7XHJcbiAgICB9XHJcblxyXG4gICAgdGFwKCkge1xyXG4gICAgICAgIHRoaXMuX293bmVyLmlvcy5yZXNpZ25GaXJzdFJlc3BvbmRlcigpO1xyXG4gICAgICAgIGlmICh0aGlzLmZ1bmMpIHtcclxuICAgICAgICAgICAgdGhpcy5mdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyBPYmpDRXhwb3NlZE1ldGhvZHMgPSB7XHJcbiAgICAgICAgXCJ0YXBcIjogeyByZXR1cm5zOiBJbnRlcm9wLnR5cGVzLnZvaWQsIHBhcmFtczogW0ludGVyb3AudHlwZXMuaWRdIH1cclxuICAgIH07XHJcbn1cclxuXHJcbi8vIEtlZXAgZXh0ZXJuYWwgc3RhdGUgb2Ygdmlld3NcclxubGV0IHRhcmdldEhhbmRsZXIgPSBudWxsO1xyXG5sZXQgdGFyZ2V0SGFuZGxlcjIgPSBudWxsO1xyXG5cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6IFwibW9kYWwsIFttb2RhbF1cIixcclxuICAgIHRlbXBsYXRlOiBgXHJcblx0XHQ8R3JpZExheW91dCAobG9hZGVkKT1cIm9uTG9hZCgkZXZlbnQpXCIgKHRhcCk9XCJvblRhcEhpZGUoKVwiIFt0cmFuc2xhdGVZXT1cInRyYW5zbGF0ZVlcIiBvcGFjaXR5PVwiMFwiIGNsYXNzPVwib3ZlcmxheVwiPlxyXG5cdFx0XHQ8R3JpZExheW91dCAjYm9keUVsIFt2ZXJ0aWNhbEFsaWdubWVudF09XCJ2QWxpZ25tZW50XCIgW3dpZHRoXT1cIm1vZGFsV2lkdGhcIiBbaGVpZ2h0XT1cIm1vZGFsSGVpZ2h0XCIgW3RyYW5zbGF0ZVldPVwidHJhbnNsYXRlWVwiIHNjYWxlWT1cIi42XCIgc2NhbGVYPVwiLjZcIiBvcGFjaXR5PVwiMFwiXHJcblx0XHRcdGNsYXNzPVwib3ZlcmxheS1ib2R5XCI+XHJcblx0XHRcdFx0PFN0YWNrTGF5b3V0ICNjb250ZW50RWwgY2xhc3M9XCJvdmVybGF5LWNvbnRlbnRcIj5cclxuXHRcdFx0XHRcdDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuXHRcdFx0XHQ8L1N0YWNrTGF5b3V0PlxyXG5cdFx0XHQ8L0dyaWRMYXlvdXQ+XHJcblx0XHQ8L0dyaWRMYXlvdXQ+XHJcblx0YCxcclxuICAgIHN0eWxlczogW2BcclxuXHRcdC5vdmVybGF5IHtcclxuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xyXG5cdFx0XHR6LWluZGV4OiA5OTk5OTk7XHJcblx0XHR9XHJcblx0XHQub3ZlcmxheSAub3ZlcmxheS1ib2R5IHsgfVxyXG5cdFx0Lm92ZXJsYXkgLm92ZXJsYXktYm9keSAub3ZlcmxheS1jb250ZW50IHtcclxuXHRcdFx0dmVydGljYWwtYWxpZ246IGNlbnRlcjtcclxuXHRcdH1cclxuXHRcdC5vdmVybGF5IC5vdmVybGF5LWJvZHkgPj4+IC5jbG9zZSB7XHJcblx0XHRcdGNvbG9yOiByZWQ7XHJcblx0XHRcdGZvbnQtc2l6ZTogMTY7XHJcblx0XHR9XHJcblx0YF1cclxufSlcclxuXHJcbmV4cG9ydCBjbGFzcyBNb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBwcml2YXRlIGlzU2hvd2luZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBwYWdlSGVpZ2h0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGR1cmF0aW9uU2NhbGU6IG51bWJlciA9IC43NTtcclxuICAgIHByaXZhdGUgb3ZlcmxheVZpZXc6IFZpZXc7XHJcbiAgICBwcml2YXRlIGRhdGE6IGFueSA9IG51bGw7IC8vIE9wdGlvbmFsIGRhdGEgcGFyYW1ldGVyXHJcbiAgICBASW5wdXQoKSBwcml2YXRlIHNpemU6IHN0cmluZyA9IFwic21cIjsgLy8gc20gfCBtZCB8IGxnXHJcbiAgICBASW5wdXQoKSBwcml2YXRlIGRpc21pc3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIHByaXZhdGUgYWxpZ25tZW50OiBzdHJpbmcgPSBcImNlbnRlclwiOyAvLyBjZW50ZXIgfCBzdHJldGNoIHwgbWlkZGxlIHwgdG9wIHwgYm90dG9tXHJcbiAgICBASW5wdXQoKSBwcml2YXRlIGR1cmF0aW9uOiBudW1iZXIgPSAyNTA7IC8vIGluIG1pbGxpc2Vjb25kc1xyXG4gICAgQE91dHB1dCgpIHByaXZhdGUgb3BlbiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQE91dHB1dCgpIHByaXZhdGUgY2xvc2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBWaWV3Q2hpbGQoXCJib2R5RWxcIikgcHJpdmF0ZSBib2R5RWw6IEVsZW1lbnRSZWY7XHJcbiAgICBAVmlld0NoaWxkKFwiY29udGVudEVsXCIpIHByaXZhdGUgY29udGVudEVsOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgaG9zdEVsOiBFbGVtZW50UmVmLFxyXG4gICAgICAgIHByaXZhdGUgcGFnZTogUGFnZVxyXG4gICAgKSB7XHJcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2Uub24oUGFnZS5sb2FkZWRFdmVudCwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYW5kcm9pZC5vbihBbmRyb2lkQXBwbGljYXRpb24uYWN0aXZpdHlCYWNrUHJlc3NlZEV2ZW50LCAoYXJnczogQW5kcm9pZEFjdGl2aXR5QmFja1ByZXNzZWRFdmVudERhdGEpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1Nob3dpbmcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJncy5jYW5jZWwgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZS5vbihQYWdlLnVubG9hZGVkRXZlbnQsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFuZHJvaWQub2ZmKEFuZHJvaWRBcHBsaWNhdGlvbi5hY3Rpdml0eUJhY2tQcmVzc2VkRXZlbnQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlSGVpZ2h0ID0gdGhpcy5wYWdlSGVpZ2h0ID8gdGhpcy5wYWdlSGVpZ2h0IDogc2NyZWVuLm1haW5TY3JlZW4uaGVpZ2h0RElQcztcclxuICAgICAgICB0aGlzLmhvc3RWaWV3LnN0eWxlLnRyYW5zbGF0ZVkgPSB0aGlzLnBhZ2VIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvdyhkYXRhOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm92ZXJsYXlWaWV3KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ob3N0Vmlldy5zdHlsZS50cmFuc2xhdGVZID0gMDtcclxuICAgICAgICByZXR1cm4gdGhpcy5vdmVybGF5Vmlldy5hbmltYXRlKHtcclxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSwgZHVyYXRpb246IDAsXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiB0aGlzLm92ZXJsYXlWaWV3LmFuaW1hdGUoe1xyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLCBkdXJhdGlvbjogdGhpcy50aW1pbmcgKiB0aGlzLmR1cmF0aW9uU2NhbGUsXHJcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcclxuICAgICAgICAgICAgdHJhbnNsYXRlOiB7IHg6IDAsIHk6IDAgfSxcclxuICAgICAgICAgICAgZHVyYXRpb246IDAsXHJcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXHJcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4gdGhpcy5ib2R5Vmlldy5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2NhbGU6IHsgeDogMSwgeTogMSB9LFxyXG4gICAgICAgICAgICBvcGFjaXR5OiAxLFxyXG4gICAgICAgICAgICBkdXJhdGlvbjogdGhpcy50aW1pbmcsXHJcbiAgICAgICAgICAgIGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5jdWJpY0JlemllciguMTIsIC4zLCAuNTgsIC40NCksXHJcbiAgICAgICAgfSkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9wZW4uZW1pdCh0aGlzLmRhdGEgPSBkYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5pc1Nob3dpbmcgPSB0cnVlO1xyXG4gICAgICAgIH0pLmNhdGNoKCgpID0+IDApO1xyXG4gICAgfVxyXG5cclxuICAgIGhpZGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcclxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmN1YmljQmV6aWVyKC4xMiwgLjMsIC41OCwgLjQ0KSxcclxuICAgICAgICB9KS50aGVuKCgpID0+IHRoaXMuYm9keVZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjYWxlOiB7IHg6IC42LCB5OiAuNiB9LFxyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxyXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuY3ViaWNCZXppZXIoLjEyLCAuMywgLjU4LCAuNDQpLFxyXG4gICAgICAgIH0pKS50aGVuKCgpID0+IHRoaXMub3ZlcmxheVZpZXcuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIG9wYWNpdHk6IDAsIGR1cmF0aW9uOiB0aGlzLnRpbWluZyAqIHRoaXMuZHVyYXRpb25TY2FsZSxcclxuICAgICAgICAgICAgY3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VJbk91dCxcclxuICAgICAgICB9KSkudGhlbigoKSA9PiB0aGlzLm92ZXJsYXlWaWV3LmFuaW1hdGUoe1xyXG4gICAgICAgICAgICB0cmFuc2xhdGU6IHsgeDogMCwgeTogdGhpcy5wYWdlSGVpZ2h0IH0sXHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAwLFxyXG4gICAgICAgICAgICBjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZUluT3V0LFxyXG4gICAgICAgIH0pKS50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmhvc3RWaWV3LnN0eWxlLnRyYW5zbGF0ZVkgPSB0aGlzLnBhZ2VIZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2UuZW1pdCh0aGlzLmRhdGEpO1xyXG4gICAgICAgICAgICB0aGlzLmlzU2hvd2luZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgfSkuY2F0Y2goKCkgPT4gMCk7XHJcbiAgICB9XHJcblxyXG4gICAgb25UYXBIaWRlID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChpc0FuZHJvaWQgJiYgdGhpcy5kaXNtaXNzYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLmhpZGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKHsgb2JqZWN0IH0pIHtcclxuICAgICAgICB0aGlzLm92ZXJsYXlWaWV3ID0gPFZpZXc+b2JqZWN0O1xyXG5cclxuICAgICAgICB0aGlzLmNvbnRlbnRWaWV3Lm9mZihbR2VzdHVyZVR5cGVzLnRvdWNoLCBHZXN0dXJlVHlwZXMudGFwXS5qb2luKFwiLFwiKSk7XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IFByb3BhZ2F0aW9uXHJcbiAgICAgICAgaWYgKGlvcykge1xyXG4gICAgICAgICAgICB0YXJnZXRIYW5kbGVyID0gSGlkZUdlc3R1cmVSZWNvZ25pemVySW1wbC5pbml0V2l0aE93bmVyKHRoaXMub3ZlcmxheVZpZXcpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kaXNtaXNzYWJsZSkge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0SGFuZGxlci5mdW5jID0gKCkgPT4gdGhpcy5oaWRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZSA9IFVJVGFwR2VzdHVyZVJlY29nbml6ZXIuYWxsb2MoKS5pbml0V2l0aFRhcmdldEFjdGlvbih0YXJnZXRIYW5kbGVyLCBcInRhcFwiKTtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5Vmlldy5pb3MuYWRkR2VzdHVyZVJlY29nbml6ZXIoZ2VzdHVyZSk7XHJcblxyXG4gICAgICAgICAgICB0YXJnZXRIYW5kbGVyMiA9IEhpZGVHZXN0dXJlUmVjb2duaXplckltcGwuaW5pdFdpdGhPd25lcih0aGlzLmJvZHlWaWV3KTtcclxuICAgICAgICAgICAgY29uc3QgZ2VzdHVyZTIgPSBVSVRhcEdlc3R1cmVSZWNvZ25pemVyLmFsbG9jKCkuaW5pdFdpdGhUYXJnZXRBY3Rpb24odGFyZ2V0SGFuZGxlcjIsIFwidGFwXCIpO1xyXG4gICAgICAgICAgICBnZXN0dXJlMi5jYW5jZWxzVG91Y2hlc0luVmlldyA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMuYm9keVZpZXcuaW9zLmFkZEdlc3R1cmVSZWNvZ25pemVyKGdlc3R1cmUyKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgdGltaW5nKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuICt0aGlzLmR1cmF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHJhbnNsYXRlWSgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgaG9zdFZpZXcoKTogVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaG9zdEVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgYm9keVZpZXcoKTogVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9keUVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXQgY29udGVudFZpZXcoKTogVmlldyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29udGVudEVsLm5hdGl2ZUVsZW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb2RhbFdpZHRoKCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoICh0aGlzLnNpemUpIHtcclxuICAgICAgICAgICAgY2FzZSBcInNtXCI6IHJldHVybiBcIjY1JVwiO1xyXG4gICAgICAgICAgICBjYXNlIFwibGdcIjogcmV0dXJuIFwiOTglXCI7XHJcbiAgICAgICAgICAgIGNhc2UgXCJtZFwiOlxyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gXCI4NSVcIjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBtb2RhbEhlaWdodCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5zaXplKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCJzbVwiOiByZXR1cm4gXCI1MCVcIjtcclxuICAgICAgICAgICAgY2FzZSBcImxnXCI6IHJldHVybiBcIjk4JVwiO1xyXG4gICAgICAgICAgICBjYXNlIFwibWRcIjpcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIFwiNjUlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdkFsaWdubWVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChpbmNsdWRlcyhbXCJjZW50ZXJcIiwgXCJzdHJldGNoXCIsIFwibWlkZGxlXCIsIFwidG9wXCIsIFwiYm90dG9tXCJdLCB0aGlzLmFsaWdubWVudCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuYWxpZ25tZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJjZW50ZXJcIjtcclxuICAgIH1cclxufVxyXG5cclxuIl19