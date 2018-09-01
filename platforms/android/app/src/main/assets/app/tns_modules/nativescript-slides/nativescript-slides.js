"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("nativescript-dom");
var app = require("application");
var Platform = require("platform");
var absolute_layout_1 = require("ui/layouts/absolute-layout");
var stack_layout_1 = require("ui/layouts/stack-layout");
var button_1 = require("ui/button");
var label_1 = require("ui/label");
var AnimationModule = require("ui/animation");
var gestures = require("ui/gestures");
var enums_1 = require("ui/enums");
var SLIDE_INDICATOR_INACTIVE = 'slide-indicator-inactive';
var SLIDE_INDICATOR_ACTIVE = 'slide-indicator-active';
var SLIDE_INDICATOR_WRAP = 'slide-indicator-wrap';
var LayoutParams;
if (app.android) {
    LayoutParams = android.view.WindowManager.LayoutParams;
}
else {
    LayoutParams = {};
}
var Slide = /** @class */ (function (_super) {
    __extends(Slide, _super);
    function Slide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Slide;
}(stack_layout_1.StackLayout));
exports.Slide = Slide;
var direction;
(function (direction) {
    direction[direction["none"] = 0] = "none";
    direction[direction["left"] = 1] = "left";
    direction[direction["right"] = 2] = "right";
})(direction || (direction = {}));
var cancellationReason;
(function (cancellationReason) {
    cancellationReason[cancellationReason["user"] = 0] = "user";
    cancellationReason[cancellationReason["noPrevSlides"] = 1] = "noPrevSlides";
    cancellationReason[cancellationReason["noMoreSlides"] = 2] = "noMoreSlides";
})(cancellationReason || (cancellationReason = {}));
var SlideContainer = /** @class */ (function (_super) {
    __extends(SlideContainer, _super);
    function SlideContainer() {
        var _this = _super.call(this) || this;
        _this.transitioning = false;
        _this.direction = direction.none;
        _this.setupDefaultValues();
        // if being used in an ng2 app we want to prevent it from excuting the constructView
        // until it is called manually in ngAfterViewInit.
        _this.constructView(true);
        return _this;
    }
    Object.defineProperty(SlideContainer.prototype, "pageIndicators", {
        /* page indicator stuff*/
        get: function () {
            return this._pageIndicators;
        },
        set: function (value) {
            if (typeof value === 'string') {
                value = (value == 'true');
            }
            this._pageIndicators = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "pagerOffset", {
        get: function () {
            return this._pagerOffset;
        },
        set: function (value) {
            this._pagerOffset = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "hasNext", {
        get: function () {
            return !!this.currentPanel && !!this.currentPanel.right;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "hasPrevious", {
        get: function () {
            return !!this.currentPanel && !!this.currentPanel.left;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "loop", {
        get: function () {
            return this._loop;
        },
        set: function (value) {
            this._loop = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "disablePan", {
        get: function () {
            return this._disablePan;
        },
        set: function (value) {
            this._disablePan = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "pageWidth", {
        get: function () {
            if (!this.slideWidth) {
                return Platform.screen.mainScreen.widthDIPs;
            }
            return +this.slideWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "angular", {
        get: function () {
            return this._angular;
        },
        set: function (value) {
            this._angular = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "currentIndex", {
        get: function () {
            return this.currentPanel.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SlideContainer.prototype, "slideWidth", {
        get: function () {
            return this._slideWidth;
        },
        set: function (width) {
            this._slideWidth = width;
        },
        enumerable: true,
        configurable: true
    });
    SlideContainer.prototype.setupDefaultValues = function () {
        this.clipToBounds = true;
        this._loaded = false;
        if (this._loop == null) {
            this.loop = false;
        }
        this.transitioning = false;
        if (this._disablePan == null) {
            this.disablePan = false;
        }
        if (this._angular == null) {
            this.angular = false;
        }
        if (this._pageIndicators == null) {
            this._pageIndicators = false;
        }
        if (this._pagerOffset == null) {
            this._pagerOffset = '88%'; //defaults to white.
        }
    };
    SlideContainer.prototype.constructView = function (constructor) {
        var _this = this;
        if (constructor === void 0) { constructor = false; }
        this.on(absolute_layout_1.AbsoluteLayout.loadedEvent, function (data) {
            //// console.log('LOADDED EVENT');
            if (!_this._loaded) {
                _this._loaded = true;
                if (_this.angular === true && constructor === true) {
                    return;
                }
                var slides_1 = [];
                if (!_this.slideWidth) {
                    _this.slideWidth = _this.pageWidth;
                }
                _this.width = +(_this.slideWidth);
                _this.eachLayoutChild(function (view) {
                    if (view instanceof stack_layout_1.StackLayout) {
                        absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
                        view.width = _this.pageWidth;
                        view.height = '100%'; //get around compiler
                        slides_1.push(view);
                    }
                });
                if (_this.pageIndicators) {
                    _this._footer = _this.buildFooter(slides_1.length, 0);
                    _this.setActivePageIndicator(0);
                    _this.insertChild(_this._footer, _this.getChildrenCount());
                }
                _this.currentPanel = _this.buildSlideMap(slides_1);
                if (_this.currentPanel) {
                    _this.positionPanels(_this.currentPanel);
                    if (_this.disablePan === false) {
                        _this.applySwipe(_this.pageWidth);
                    }
                    if (app.ios) {
                        _this.ios.clipsToBound = true;
                    }
                    //handles application orientation change
                    app.on(app.orientationChangedEvent, function (args) {
                        //event and page orientation didn't seem to alwasy be on the same page so setting it in the time out addresses this.
                        setTimeout(function () {
                            // console.log('orientationChangedEvent');
                            _this.width = parseInt(_this.slideWidth);
                            _this.eachLayoutChild(function (view) {
                                if (view instanceof stack_layout_1.StackLayout) {
                                    absolute_layout_1.AbsoluteLayout.setLeft(view, _this.pageWidth);
                                    view.width = _this.pageWidth;
                                }
                            });
                            if (_this.disablePan === false) {
                                _this.applySwipe(_this.pageWidth);
                            }
                            if (_this.pageIndicators) {
                                absolute_layout_1.AbsoluteLayout.setTop(_this._footer, 0);
                                var pageIndicatorsLeftOffset = _this.pageWidth / 4;
                                absolute_layout_1.AbsoluteLayout.setLeft(_this._footer, pageIndicatorsLeftOffset);
                                _this._footer.width = _this.pageWidth / 2;
                                _this._footer.marginTop = _this._pagerOffset;
                            }
                            _this.positionPanels(_this.currentPanel);
                        }, 0);
                    });
                }
            }
        });
    };
    SlideContainer.prototype.nextSlide = function () {
        var _this = this;
        if (!this.hasNext) {
            this.triggerCancelEvent(cancellationReason.noMoreSlides);
            return;
        }
        this.direction = direction.left;
        this.transitioning = true;
        this.triggerStartEvent();
        this.showRightSlide(this.currentPanel).then(function () {
            _this.setupPanel(_this.currentPanel.right);
            _this.triggerChangeEventRightToLeft();
        });
    };
    SlideContainer.prototype.previousSlide = function () {
        var _this = this;
        if (!this.hasPrevious) {
            this.triggerCancelEvent(cancellationReason.noPrevSlides);
            return;
        }
        this.direction = direction.right;
        this.transitioning = true;
        this.triggerStartEvent();
        this.showLeftSlide(this.currentPanel).then(function () {
            _this.setupPanel(_this.currentPanel.left);
            _this.triggerChangeEventLeftToRight();
        });
    };
    SlideContainer.prototype.setupPanel = function (panel) {
        this.direction = direction.none;
        this.transitioning = false;
        this.currentPanel.panel.off('pan');
        this.currentPanel = panel;
        // sets up each panel so that they are positioned to transition either way.
        this.positionPanels(this.currentPanel);
        if (this.disablePan === false) {
            this.applySwipe(this.pageWidth);
        }
        if (this.pageIndicators) {
            this.setActivePageIndicator(this.currentPanel.index);
        }
    };
    SlideContainer.prototype.positionPanels = function (panel) {
        // sets up each panel so that they are positioned to transition either way.
        if (panel.left != null) {
            panel.left.panel.translateX = -this.pageWidth * 2;
        }
        panel.panel.translateX = -this.pageWidth;
        if (panel.right != null) {
            panel.right.panel.translateX = 0;
        }
    };
    SlideContainer.prototype.goToSlide = function (index) {
        if (this._slideMap && this._slideMap.length > 0 && index < this._slideMap.length) {
            var previousSlide = this.currentPanel;
            this.setupPanel(this._slideMap[index]);
            this.notify({
                eventName: SlideContainer.changedEvent,
                object: this,
                eventData: {
                    direction: direction.none,
                    newIndex: this.currentPanel.index,
                    oldIndex: previousSlide.index,
                }
            });
        }
        else {
            // console.log('invalid index');
        }
    };
    SlideContainer.prototype.applySwipe = function (pageWidth) {
        var _this = this;
        var previousDelta = -1; //hack to get around ios firing pan event after release
        var endingVelocity = 0;
        var startTime, deltaTime;
        this.currentPanel.panel.on('pan', function (args) {
            if (args.state === gestures.GestureStateTypes.began) {
                startTime = Date.now();
                previousDelta = 0;
                endingVelocity = 250;
                _this.triggerStartEvent();
            }
            else if (args.state === gestures.GestureStateTypes.ended) {
                deltaTime = Date.now() - startTime;
                // if velocityScrolling is enabled then calculate the velocitty
                // swiping left to right.
                if (args.deltaX > (pageWidth / 3)) {
                    if (_this.hasPrevious) {
                        _this.transitioning = true;
                        _this.showLeftSlide(_this.currentPanel, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentPanel.left);
                            _this.triggerChangeEventLeftToRight();
                        });
                    }
                    else {
                        //We're at the start
                        //Notify no more slides
                        _this.triggerCancelEvent(cancellationReason.noPrevSlides);
                    }
                    return;
                }
                else if (args.deltaX < (-pageWidth / 3)) {
                    if (_this.hasNext) {
                        _this.transitioning = true;
                        _this.showRightSlide(_this.currentPanel, args.deltaX, endingVelocity).then(function () {
                            _this.setupPanel(_this.currentPanel.right);
                            // Notify changed
                            _this.triggerChangeEventRightToLeft();
                            if (!_this.hasNext) {
                                // Notify finsihed
                                _this.notify({
                                    eventName: SlideContainer.finishedEvent,
                                    object: _this
                                });
                            }
                        });
                    }
                    else {
                        // We're at the end
                        // Notify no more slides
                        _this.triggerCancelEvent(cancellationReason.noMoreSlides);
                    }
                    return;
                }
                if (_this.transitioning === false) {
                    //Notify cancelled
                    _this.triggerCancelEvent(cancellationReason.user);
                    _this.transitioning = true;
                    _this.currentPanel.panel.animate({
                        translate: { x: -_this.pageWidth, y: 0 },
                        duration: 200,
                        curve: enums_1.AnimationCurve.easeOut
                    });
                    if (_this.hasNext) {
                        _this.currentPanel.right.panel.animate({
                            translate: { x: 0, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentPanel.right.panel.translateX = 0;
                    }
                    if (_this.hasPrevious) {
                        _this.currentPanel.left.panel.animate({
                            translate: { x: -_this.pageWidth * 2, y: 0 },
                            duration: 200,
                            curve: enums_1.AnimationCurve.easeOut
                        });
                        if (app.ios)
                            _this.currentPanel.left.panel.translateX = -_this.pageWidth;
                    }
                    if (app.ios)
                        _this.currentPanel.panel.translateX = -_this.pageWidth;
                    _this.transitioning = false;
                }
            }
            else {
                if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX < 0) {
                    if (_this.hasNext) {
                        _this.direction = direction.left;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.right.panel.translateX = args.deltaX;
                    }
                }
                else if (!_this.transitioning
                    && previousDelta !== args.deltaX
                    && args.deltaX != null
                    && args.deltaX > 0) {
                    if (_this.hasPrevious) {
                        _this.direction = direction.right;
                        _this.currentPanel.panel.translateX = args.deltaX - _this.pageWidth;
                        _this.currentPanel.left.panel.translateX = -(_this.pageWidth * 2) + args.deltaX;
                    }
                }
                if (args.deltaX !== 0) {
                    previousDelta = args.deltaX;
                }
            }
        });
    };
    SlideContainer.prototype.showRightSlide = function (panelMap, offset, endingVelocity) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 32; }
        var animationDuration;
        animationDuration = 300; // default value
        var transition = new Array();
        transition.push({
            target: panelMap.right.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: -this.pageWidth * 2, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlideContainer.prototype.showLeftSlide = function (panelMap, offset, endingVelocity) {
        if (offset === void 0) { offset = this.pageWidth; }
        if (endingVelocity === void 0) { endingVelocity = 32; }
        var animationDuration;
        animationDuration = 300; // default value
        var transition = new Array();
        transition.push({
            target: panelMap.left.panel,
            translate: { x: -this.pageWidth, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        transition.push({
            target: panelMap.panel,
            translate: { x: 0, y: 0 },
            duration: animationDuration,
            curve: enums_1.AnimationCurve.easeOut
        });
        var animationSet = new AnimationModule.Animation(transition, false);
        return animationSet.play();
    };
    SlideContainer.prototype.buildFooter = function (pageCount, activeIndex) {
        if (pageCount === void 0) { pageCount = 5; }
        if (activeIndex === void 0) { activeIndex = 0; }
        var footerInnerWrap = new stack_layout_1.StackLayout();
        //footerInnerWrap.height = 50;
        if (app.ios) {
            footerInnerWrap.clipToBounds = false;
        }
        footerInnerWrap.className = SLIDE_INDICATOR_WRAP;
        absolute_layout_1.AbsoluteLayout.setTop(footerInnerWrap, 0);
        footerInnerWrap.orientation = 'horizontal';
        footerInnerWrap.horizontalAlignment = 'center';
        footerInnerWrap.width = this.pageWidth / 2;
        var index = 0;
        while (index < pageCount) {
            footerInnerWrap.addChild(this.createIndicator(index));
            index++;
        }
        var pageIndicatorsLeftOffset = this.pageWidth / 4;
        absolute_layout_1.AbsoluteLayout.setLeft(footerInnerWrap, pageIndicatorsLeftOffset);
        footerInnerWrap.marginTop = this._pagerOffset;
        return footerInnerWrap;
    };
    SlideContainer.prototype.setwidthPercent = function (view, percentage) {
        view.width = percentage + '%';
    };
    SlideContainer.prototype.newFooterButton = function (name) {
        var button = new button_1.Button();
        button.id = 'btn-info-' + name.toLowerCase();
        button.text = name;
        this.setwidthPercent(button, 100);
        return button;
    };
    SlideContainer.prototype.buildSlideMap = function (views) {
        var _this = this;
        this._slideMap = [];
        views.forEach(function (view, index) {
            _this._slideMap.push({
                panel: view,
                index: index,
            });
        });
        this._slideMap.forEach(function (mapping, index) {
            if (_this._slideMap[index - 1] != null)
                mapping.left = _this._slideMap[index - 1];
            if (_this._slideMap[index + 1] != null)
                mapping.right = _this._slideMap[index + 1];
        });
        if (this.loop) {
            this._slideMap[0].left = this._slideMap[this._slideMap.length - 1];
            this._slideMap[this._slideMap.length - 1].right = this._slideMap[0];
        }
        return this._slideMap[0];
    };
    SlideContainer.prototype.triggerStartEvent = function () {
        this.notify({
            eventName: SlideContainer.startEvent,
            object: this,
            eventData: {
                currentIndex: this.currentPanel.index
            }
        });
    };
    SlideContainer.prototype.triggerChangeEventLeftToRight = function () {
        this.notify({
            eventName: SlideContainer.changedEvent,
            object: this,
            eventData: {
                direction: direction.left,
                newIndex: this.currentPanel.index,
                oldIndex: this.currentPanel.index + 1
            }
        });
    };
    SlideContainer.prototype.triggerChangeEventRightToLeft = function () {
        this.notify({
            eventName: SlideContainer.changedEvent,
            object: this,
            eventData: {
                direction: direction.right,
                newIndex: this.currentPanel.index,
                oldIndex: this.currentPanel.index - 1
            }
        });
    };
    SlideContainer.prototype.triggerCancelEvent = function (cancelReason) {
        this.notify({
            eventName: SlideContainer.cancelledEvent,
            object: this,
            eventData: {
                currentIndex: this.currentPanel.index,
                reason: cancelReason
            }
        });
    };
    SlideContainer.prototype.createIndicator = function (index) {
        var indicator = new label_1.Label();
        indicator.classList.add(SLIDE_INDICATOR_INACTIVE);
        return indicator;
    };
    SlideContainer.prototype.setActivePageIndicator = function (index) {
        var indicatorsToDeactivate = this._footer.getElementsByClassName(SLIDE_INDICATOR_ACTIVE);
        indicatorsToDeactivate.forEach(function (activeIndicator) {
            activeIndicator.classList.remove(SLIDE_INDICATOR_ACTIVE);
            activeIndicator.classList.add(SLIDE_INDICATOR_INACTIVE);
        });
        var activeIndicator = this._footer.getElementsByClassName(SLIDE_INDICATOR_INACTIVE)[index];
        if (activeIndicator) {
            activeIndicator.classList.remove(SLIDE_INDICATOR_INACTIVE);
            activeIndicator.classList.add(SLIDE_INDICATOR_ACTIVE);
        }
    };
    SlideContainer.prototype.iosProperty = function (theClass, theProperty) {
        if (typeof theProperty === "function") {
            // xCode 7 and below
            return theProperty.call(theClass);
        }
        else {
            // xCode 8+
            return theProperty;
        }
    };
    SlideContainer.startEvent = 'start';
    SlideContainer.changedEvent = 'changed';
    SlideContainer.cancelledEvent = 'cancelled';
    SlideContainer.finishedEvent = 'finished';
    return SlideContainer;
}(absolute_layout_1.AbsoluteLayout));
exports.SlideContainer = SlideContainer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF0aXZlc2NyaXB0LXNsaWRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm5hdGl2ZXNjcmlwdC1zbGlkZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUM1QixpQ0FBbUM7QUFDbkMsbUNBQXFDO0FBRXJDLDhEQUE0RDtBQUM1RCx3REFBc0Q7QUFFdEQsb0NBQW1DO0FBQ25DLGtDQUFpQztBQUNqQyw4Q0FBZ0Q7QUFDaEQsc0NBQXdDO0FBQ3hDLGtDQUF1RDtBQU92RCxJQUFNLHdCQUF3QixHQUFHLDBCQUEwQixDQUFDO0FBQzVELElBQU0sc0JBQXNCLEdBQUcsd0JBQXdCLENBQUM7QUFDeEQsSUFBTSxvQkFBb0IsR0FBRyxzQkFBc0IsQ0FBQztBQUNwRCxJQUFJLFlBQWlCLENBQUM7QUFDdEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDakIsWUFBWSxHQUFRLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQztBQUM3RCxDQUFDO0FBQUMsSUFBSSxDQUFDLENBQUM7SUFDUCxZQUFZLEdBQUcsRUFBRSxDQUFDO0FBQ25CLENBQUM7QUFFRDtJQUEyQix5QkFBVztJQUF0Qzs7SUFBeUMsQ0FBQztJQUFELFlBQUM7QUFBRCxDQUFDLEFBQTFDLENBQTJCLDBCQUFXLEdBQUk7QUFBN0Isc0JBQUs7QUFFbEIsSUFBSyxTQUlKO0FBSkQsV0FBSyxTQUFTO0lBQ2IseUNBQUksQ0FBQTtJQUNKLHlDQUFJLENBQUE7SUFDSiwyQ0FBSyxDQUFBO0FBQ04sQ0FBQyxFQUpJLFNBQVMsS0FBVCxTQUFTLFFBSWI7QUFFRCxJQUFLLGtCQUlKO0FBSkQsV0FBSyxrQkFBa0I7SUFDdEIsMkRBQUksQ0FBQTtJQUNKLDJFQUFZLENBQUE7SUFDWiwyRUFBWSxDQUFBO0FBQ2IsQ0FBQyxFQUpJLGtCQUFrQixLQUFsQixrQkFBa0IsUUFJdEI7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LFdBQVc7WUFDWCxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQ3BCLENBQUM7SUFDRixDQUFDO0lBM2pCYSx5QkFBVSxHQUFHLE9BQU8sQ0FBQztJQUNyQiwyQkFBWSxHQUFHLFNBQVMsQ0FBQztJQUN6Qiw2QkFBYyxHQUFHLFdBQVcsQ0FBQztJQUM3Qiw0QkFBYSxHQUFHLFVBQVUsQ0FBQztJQXlqQjFDLHFCQUFDO0NBQUEsQUEza0JELENBQW9DLGdDQUFjLEdBMmtCakQ7QUEza0JZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsicmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1kb21cIik7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuaW1wb3J0ICogYXMgUGxhdGZvcm0gZnJvbSAncGxhdGZvcm0nO1xuaW1wb3J0ICogYXMgdXRpbHMgZnJvbSAndG5zLWNvcmUtbW9kdWxlcy91dGlscy91dGlscyc7XG5pbXBvcnQgeyBBYnNvbHV0ZUxheW91dCB9IGZyb20gJ3VpL2xheW91dHMvYWJzb2x1dGUtbGF5b3V0JztcbmltcG9ydCB7IFN0YWNrTGF5b3V0IH0gZnJvbSAndWkvbGF5b3V0cy9zdGFjay1sYXlvdXQnO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJ3VpL2NvcmUvdmlldyc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICd1aS9idXR0b24nO1xuaW1wb3J0IHsgTGFiZWwgfSBmcm9tICd1aS9sYWJlbCc7XG5pbXBvcnQgKiBhcyBBbmltYXRpb25Nb2R1bGUgZnJvbSAndWkvYW5pbWF0aW9uJztcbmltcG9ydCAqIGFzIGdlc3R1cmVzIGZyb20gJ3VpL2dlc3R1cmVzJztcbmltcG9ydCB7IEFuaW1hdGlvbkN1cnZlLCBPcmllbnRhdGlvbiB9IGZyb20gJ3VpL2VudW1zJztcbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnY29sb3InO1xuaW1wb3J0IHsgSW1hZ2UgfSBmcm9tICd1aS9pbWFnZSc7XG5cbmRlY2xhcmUgY29uc3QgYW5kcm9pZDogYW55O1xuZGVjbGFyZSBjb25zdCBjb206IGFueTtcbmRlY2xhcmUgY29uc3QgamF2YTogYW55O1xuY29uc3QgU0xJREVfSU5ESUNBVE9SX0lOQUNUSVZFID0gJ3NsaWRlLWluZGljYXRvci1pbmFjdGl2ZSc7XG5jb25zdCBTTElERV9JTkRJQ0FUT1JfQUNUSVZFID0gJ3NsaWRlLWluZGljYXRvci1hY3RpdmUnO1xuY29uc3QgU0xJREVfSU5ESUNBVE9SX1dSQVAgPSAnc2xpZGUtaW5kaWNhdG9yLXdyYXAnO1xubGV0IExheW91dFBhcmFtczogYW55O1xuaWYgKGFwcC5hbmRyb2lkKSB7XG5cdExheW91dFBhcmFtcyA9IDxhbnk+YW5kcm9pZC52aWV3LldpbmRvd01hbmFnZXIuTGF5b3V0UGFyYW1zO1xufSBlbHNlIHtcblx0TGF5b3V0UGFyYW1zID0ge307XG59XG5cbmV4cG9ydCBjbGFzcyBTbGlkZSBleHRlbmRzIFN0YWNrTGF5b3V0IHsgfVxuXG5lbnVtIGRpcmVjdGlvbiB7XG5cdG5vbmUsXG5cdGxlZnQsXG5cdHJpZ2h0XG59XG5cbmVudW0gY2FuY2VsbGF0aW9uUmVhc29uIHtcblx0dXNlcixcblx0bm9QcmV2U2xpZGVzLFxuXHRub01vcmVTbGlkZXNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBJU2xpZGVNYXAge1xuXHRwYW5lbDogU3RhY2tMYXlvdXQ7XG5cdGluZGV4OiBudW1iZXI7XG5cdGxlZnQ/OiBJU2xpZGVNYXA7XG5cdHJpZ2h0PzogSVNsaWRlTWFwO1xufVxuXG5leHBvcnQgY2xhc3MgU2xpZGVDb250YWluZXIgZXh0ZW5kcyBBYnNvbHV0ZUxheW91dCB7XG5cdHByaXZhdGUgY3VycmVudFBhbmVsOiBJU2xpZGVNYXA7XG5cdHByaXZhdGUgdHJhbnNpdGlvbmluZzogYm9vbGVhbiA9IGZhbHNlO1xuXHRwcml2YXRlIGRpcmVjdGlvbjogZGlyZWN0aW9uID0gZGlyZWN0aW9uLm5vbmU7XG5cdHByaXZhdGUgX2xvYWRlZDogYm9vbGVhbjtcblx0cHJpdmF0ZSBfcGFnZVdpZHRoOiBudW1iZXI7XG5cdHByaXZhdGUgX2xvb3A6IGJvb2xlYW47XG5cdHByaXZhdGUgX3BhZ2VyT2Zmc2V0OiBzdHJpbmc7XG5cdHByaXZhdGUgX2FuZ3VsYXI6IGJvb2xlYW47XG5cdHByaXZhdGUgX2Rpc2FibGVQYW46IGJvb2xlYW47XG5cdHByaXZhdGUgX2Zvb3RlcjogU3RhY2tMYXlvdXQ7XG5cdHByaXZhdGUgX3BhZ2VJbmRpY2F0b3JzOiBib29sZWFuO1xuXHRwcml2YXRlIF9zbGlkZU1hcDogSVNsaWRlTWFwW107XG5cdHByaXZhdGUgX3NsaWRlV2lkdGg6IHN0cmluZztcblxuXHRwdWJsaWMgc3RhdGljIHN0YXJ0RXZlbnQgPSAnc3RhcnQnO1xuXHRwdWJsaWMgc3RhdGljIGNoYW5nZWRFdmVudCA9ICdjaGFuZ2VkJztcblx0cHVibGljIHN0YXRpYyBjYW5jZWxsZWRFdmVudCA9ICdjYW5jZWxsZWQnO1xuXHRwdWJsaWMgc3RhdGljIGZpbmlzaGVkRXZlbnQgPSAnZmluaXNoZWQnO1xuXG5cdC8qIHBhZ2UgaW5kaWNhdG9yIHN0dWZmKi9cblx0Z2V0IHBhZ2VJbmRpY2F0b3JzKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiB0aGlzLl9wYWdlSW5kaWNhdG9ycztcblx0fVxuXHRzZXQgcGFnZUluZGljYXRvcnModmFsdWU6IGJvb2xlYW4pIHtcblx0XHRpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuXHRcdFx0dmFsdWUgPSAoPGFueT52YWx1ZSA9PSAndHJ1ZScpO1xuXHRcdH1cblx0XHR0aGlzLl9wYWdlSW5kaWNhdG9ycyA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHBhZ2VyT2Zmc2V0KCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3BhZ2VyT2Zmc2V0O1xuXHR9XG5cdHNldCBwYWdlck9mZnNldCh2YWx1ZTogc3RyaW5nKSB7XG5cdFx0dGhpcy5fcGFnZXJPZmZzZXQgPSB2YWx1ZTtcblx0fVxuXG5cdGdldCBoYXNOZXh0KCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhIXRoaXMuY3VycmVudFBhbmVsICYmICEhdGhpcy5jdXJyZW50UGFuZWwucmlnaHQ7XG5cdH1cblx0Z2V0IGhhc1ByZXZpb3VzKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhIXRoaXMuY3VycmVudFBhbmVsICYmICEhdGhpcy5jdXJyZW50UGFuZWwubGVmdDtcblx0fVxuXG5cdGdldCBsb29wKCkge1xuXHRcdHJldHVybiB0aGlzLl9sb29wO1xuXHR9XG5cblx0c2V0IGxvb3AodmFsdWU6IGJvb2xlYW4pIHtcblx0XHR0aGlzLl9sb29wID0gdmFsdWU7XG5cdH1cblxuXHRnZXQgZGlzYWJsZVBhbigpIHtcblx0XHRyZXR1cm4gdGhpcy5fZGlzYWJsZVBhbjtcblx0fVxuXG5cdHNldCBkaXNhYmxlUGFuKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fZGlzYWJsZVBhbiA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IHBhZ2VXaWR0aCgpIHtcblx0XHRpZiAoIXRoaXMuc2xpZGVXaWR0aCkge1xuXHRcdFx0cmV0dXJuIFBsYXRmb3JtLnNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcztcblx0XHR9XG5cdFx0cmV0dXJuICt0aGlzLnNsaWRlV2lkdGg7XG5cdH1cblxuXHRnZXQgYW5ndWxhcigpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gdGhpcy5fYW5ndWxhcjtcblx0fVxuXG5cdHNldCBhbmd1bGFyKHZhbHVlOiBib29sZWFuKSB7XG5cdFx0dGhpcy5fYW5ndWxhciA9IHZhbHVlO1xuXHR9XG5cblx0Z2V0IGN1cnJlbnRJbmRleCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLmN1cnJlbnRQYW5lbC5pbmRleDtcblx0fVxuXG5cdGdldCBzbGlkZVdpZHRoKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuX3NsaWRlV2lkdGg7XG5cdH1cblx0c2V0IHNsaWRlV2lkdGgod2lkdGg6IHN0cmluZykge1xuXHRcdHRoaXMuX3NsaWRlV2lkdGggPSB3aWR0aDtcblx0fVxuXG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHN1cGVyKCk7XG5cdFx0dGhpcy5zZXR1cERlZmF1bHRWYWx1ZXMoKTtcblx0XHQvLyBpZiBiZWluZyB1c2VkIGluIGFuIG5nMiBhcHAgd2Ugd2FudCB0byBwcmV2ZW50IGl0IGZyb20gZXhjdXRpbmcgdGhlIGNvbnN0cnVjdFZpZXdcblx0XHQvLyB1bnRpbCBpdCBpcyBjYWxsZWQgbWFudWFsbHkgaW4gbmdBZnRlclZpZXdJbml0LlxuXG5cdFx0dGhpcy5jb25zdHJ1Y3RWaWV3KHRydWUpO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXR1cERlZmF1bHRWYWx1ZXMoKTogdm9pZCB7XG5cdFx0dGhpcy5jbGlwVG9Cb3VuZHMgPSB0cnVlO1xuXG5cblx0XHR0aGlzLl9sb2FkZWQgPSBmYWxzZTtcblx0XHRpZiAodGhpcy5fbG9vcCA9PSBudWxsKSB7XG5cdFx0XHR0aGlzLmxvb3AgPSBmYWxzZTtcblx0XHR9XG5cblx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9kaXNhYmxlUGFuID09IG51bGwpIHtcblx0XHRcdHRoaXMuZGlzYWJsZVBhbiA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9hbmd1bGFyID09IG51bGwpIHtcblx0XHRcdHRoaXMuYW5ndWxhciA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9wYWdlSW5kaWNhdG9ycyA9PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9wYWdlSW5kaWNhdG9ycyA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLl9wYWdlck9mZnNldCA9PSBudWxsKSB7XG5cdFx0XHR0aGlzLl9wYWdlck9mZnNldCA9ICc4OCUnOyAvL2RlZmF1bHRzIHRvIHdoaXRlLlxuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBjb25zdHJ1Y3RWaWV3KGNvbnN0cnVjdG9yOiBib29sZWFuID0gZmFsc2UpOiB2b2lkIHtcblx0XHR0aGlzLm9uKEFic29sdXRlTGF5b3V0LmxvYWRlZEV2ZW50LCAoZGF0YTogYW55KSA9PiB7XG5cdFx0XHQvLy8vIGNvbnNvbGUubG9nKCdMT0FEREVEIEVWRU5UJyk7XG5cdFx0XHRpZiAoIXRoaXMuX2xvYWRlZCkge1xuXHRcdFx0XHR0aGlzLl9sb2FkZWQgPSB0cnVlO1xuXHRcdFx0XHRpZiAodGhpcy5hbmd1bGFyID09PSB0cnVlICYmIGNvbnN0cnVjdG9yID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHNsaWRlczogU3RhY2tMYXlvdXRbXSA9IFtdO1xuXG5cdFx0XHRcdGlmICghdGhpcy5zbGlkZVdpZHRoKSB7XG5cdFx0XHRcdFx0dGhpcy5zbGlkZVdpZHRoID0gPGFueT50aGlzLnBhZ2VXaWR0aDtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLndpZHRoID0gKyh0aGlzLnNsaWRlV2lkdGgpO1xuXG5cdFx0XHRcdHRoaXMuZWFjaExheW91dENoaWxkKCh2aWV3OiBWaWV3KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHZpZXcgaW5zdGFuY2VvZiBTdGFja0xheW91dCkge1xuXHRcdFx0XHRcdFx0QWJzb2x1dGVMYXlvdXQuc2V0TGVmdCh2aWV3LCB0aGlzLnBhZ2VXaWR0aCk7XG5cdFx0XHRcdFx0XHR2aWV3LndpZHRoID0gdGhpcy5wYWdlV2lkdGg7XG5cdFx0XHRcdFx0XHQoPGFueT52aWV3KS5oZWlnaHQgPSAnMTAwJSc7IC8vZ2V0IGFyb3VuZCBjb21waWxlclxuXHRcdFx0XHRcdFx0c2xpZGVzLnB1c2godmlldyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAodGhpcy5wYWdlSW5kaWNhdG9ycykge1xuXHRcdFx0XHRcdHRoaXMuX2Zvb3RlciA9IHRoaXMuYnVpbGRGb290ZXIoc2xpZGVzLmxlbmd0aCwgMCk7XG5cdFx0XHRcdFx0dGhpcy5zZXRBY3RpdmVQYWdlSW5kaWNhdG9yKDApO1xuXHRcdFx0XHRcdHRoaXMuaW5zZXJ0Q2hpbGQodGhpcy5fZm9vdGVyLCB0aGlzLmdldENoaWxkcmVuQ291bnQoKSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHR0aGlzLmN1cnJlbnRQYW5lbCA9IHRoaXMuYnVpbGRTbGlkZU1hcChzbGlkZXMpO1xuXHRcdFx0XHRpZiAodGhpcy5jdXJyZW50UGFuZWwpIHtcblxuXHRcdFx0XHRcdHRoaXMucG9zaXRpb25QYW5lbHModGhpcy5jdXJyZW50UGFuZWwpO1xuXG5cdFx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZVBhbiA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdHRoaXMuYXBwbHlTd2lwZSh0aGlzLnBhZ2VXaWR0aCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChhcHAuaW9zKSB7XG5cdFx0XHRcdFx0XHR0aGlzLmlvcy5jbGlwc1RvQm91bmQgPSB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvL2hhbmRsZXMgYXBwbGljYXRpb24gb3JpZW50YXRpb24gY2hhbmdlXG5cdFx0XHRcdFx0YXBwLm9uKGFwcC5vcmllbnRhdGlvbkNoYW5nZWRFdmVudCwgKGFyZ3M6IGFwcC5PcmllbnRhdGlvbkNoYW5nZWRFdmVudERhdGEpID0+IHtcblx0XHRcdFx0XHRcdC8vZXZlbnQgYW5kIHBhZ2Ugb3JpZW50YXRpb24gZGlkbid0IHNlZW0gdG8gYWx3YXN5IGJlIG9uIHRoZSBzYW1lIHBhZ2Ugc28gc2V0dGluZyBpdCBpbiB0aGUgdGltZSBvdXQgYWRkcmVzc2VzIHRoaXMuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gY29uc29sZS5sb2coJ29yaWVudGF0aW9uQ2hhbmdlZEV2ZW50Jyk7XG5cdFx0XHRcdFx0XHRcdHRoaXMud2lkdGggPSBwYXJzZUludCh0aGlzLnNsaWRlV2lkdGgpO1xuXHRcdFx0XHRcdFx0XHR0aGlzLmVhY2hMYXlvdXRDaGlsZCgodmlldzogVmlldykgPT4ge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh2aWV3IGluc3RhbmNlb2YgU3RhY2tMYXlvdXQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdEFic29sdXRlTGF5b3V0LnNldExlZnQodmlldywgdGhpcy5wYWdlV2lkdGgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlldy53aWR0aCA9IHRoaXMucGFnZVdpZHRoO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMuZGlzYWJsZVBhbiA9PT0gZmFsc2UpIHtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLmFwcGx5U3dpcGUodGhpcy5wYWdlV2lkdGgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0aWYgKHRoaXMucGFnZUluZGljYXRvcnMpIHtcblx0XHRcdFx0XHRcdFx0XHRBYnNvbHV0ZUxheW91dC5zZXRUb3AodGhpcy5fZm9vdGVyLCAwKTtcblx0XHRcdFx0XHRcdFx0XHR2YXIgcGFnZUluZGljYXRvcnNMZWZ0T2Zmc2V0ID0gdGhpcy5wYWdlV2lkdGggLyA0O1xuXHRcdFx0XHRcdFx0XHRcdEFic29sdXRlTGF5b3V0LnNldExlZnQodGhpcy5fZm9vdGVyLCBwYWdlSW5kaWNhdG9yc0xlZnRPZmZzZXQpO1xuXHRcdFx0XHRcdFx0XHRcdHRoaXMuX2Zvb3Rlci53aWR0aCA9IHRoaXMucGFnZVdpZHRoIC8gMjtcblx0XHRcdFx0XHRcdFx0XHR0aGlzLl9mb290ZXIubWFyZ2luVG9wID0gPGFueT50aGlzLl9wYWdlck9mZnNldDtcblx0XHRcdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0XHRcdHRoaXMucG9zaXRpb25QYW5lbHModGhpcy5jdXJyZW50UGFuZWwpO1xuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHB1YmxpYyBuZXh0U2xpZGUoKTogdm9pZCB7XG5cdFx0aWYgKCF0aGlzLmhhc05leHQpIHtcblx0XHRcdHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XG5cdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHR0aGlzLnRyaWdnZXJTdGFydEV2ZW50KCk7XG5cdFx0dGhpcy5zaG93UmlnaHRTbGlkZSh0aGlzLmN1cnJlbnRQYW5lbCkudGhlbigoKSA9PiB7XG5cdFx0XHR0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50UGFuZWwucmlnaHQpO1xuXHRcdFx0dGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRSaWdodFRvTGVmdCgpO1xuXHRcdH0pO1xuXHR9XG5cdHB1YmxpYyBwcmV2aW91c1NsaWRlKCk6IHZvaWQge1xuXHRcdGlmICghdGhpcy5oYXNQcmV2aW91cykge1xuXHRcdFx0dGhpcy50cmlnZ2VyQ2FuY2VsRXZlbnQoY2FuY2VsbGF0aW9uUmVhc29uLm5vUHJldlNsaWRlcyk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XG5cdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHR0aGlzLnRyaWdnZXJTdGFydEV2ZW50KCk7XG5cdFx0dGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFBhbmVsKS50aGVuKCgpID0+IHtcblx0XHRcdHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRQYW5lbC5sZWZ0KTtcblx0XHRcdHRoaXMudHJpZ2dlckNoYW5nZUV2ZW50TGVmdFRvUmlnaHQoKTtcblx0XHR9KTtcblx0fVxuXG5cdHByaXZhdGUgc2V0dXBQYW5lbChwYW5lbDogSVNsaWRlTWFwKSB7XG5cdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ubm9uZTtcblx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHR0aGlzLmN1cnJlbnRQYW5lbC5wYW5lbC5vZmYoJ3BhbicpO1xuXHRcdHRoaXMuY3VycmVudFBhbmVsID0gcGFuZWw7XG5cblx0XHQvLyBzZXRzIHVwIGVhY2ggcGFuZWwgc28gdGhhdCB0aGV5IGFyZSBwb3NpdGlvbmVkIHRvIHRyYW5zaXRpb24gZWl0aGVyIHdheS5cblx0XHR0aGlzLnBvc2l0aW9uUGFuZWxzKHRoaXMuY3VycmVudFBhbmVsKTtcblxuXHRcdGlmICh0aGlzLmRpc2FibGVQYW4gPT09IGZhbHNlKSB7XG5cdFx0XHR0aGlzLmFwcGx5U3dpcGUodGhpcy5wYWdlV2lkdGgpO1xuXHRcdH1cblxuXHRcdGlmICh0aGlzLnBhZ2VJbmRpY2F0b3JzKSB7XG5cdFx0XHR0aGlzLnNldEFjdGl2ZVBhZ2VJbmRpY2F0b3IodGhpcy5jdXJyZW50UGFuZWwuaW5kZXgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgcG9zaXRpb25QYW5lbHMocGFuZWw6IElTbGlkZU1hcCkge1xuXHRcdC8vIHNldHMgdXAgZWFjaCBwYW5lbCBzbyB0aGF0IHRoZXkgYXJlIHBvc2l0aW9uZWQgdG8gdHJhbnNpdGlvbiBlaXRoZXIgd2F5LlxuXHRcdGlmIChwYW5lbC5sZWZ0ICE9IG51bGwpIHtcblx0XHRcdHBhbmVsLmxlZnQucGFuZWwudHJhbnNsYXRlWCA9IC10aGlzLnBhZ2VXaWR0aCAqIDI7XG5cdFx0fVxuXHRcdHBhbmVsLnBhbmVsLnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XG5cdFx0aWYgKHBhbmVsLnJpZ2h0ICE9IG51bGwpIHtcblx0XHRcdHBhbmVsLnJpZ2h0LnBhbmVsLnRyYW5zbGF0ZVggPSAwO1xuXHRcdH1cblx0fVxuXG5cdHB1YmxpYyBnb1RvU2xpZGUoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuXHRcdGlmICh0aGlzLl9zbGlkZU1hcCAmJiB0aGlzLl9zbGlkZU1hcC5sZW5ndGggPiAwICYmIGluZGV4IDwgdGhpcy5fc2xpZGVNYXAubGVuZ3RoKSB7XG5cdFx0XHRsZXQgcHJldmlvdXNTbGlkZSA9IHRoaXMuY3VycmVudFBhbmVsO1xuXG5cdFx0XHR0aGlzLnNldHVwUGFuZWwodGhpcy5fc2xpZGVNYXBbaW5kZXhdKTtcblxuXHRcdFx0dGhpcy5ub3RpZnkoe1xuXHRcdFx0XHRldmVudE5hbWU6IFNsaWRlQ29udGFpbmVyLmNoYW5nZWRFdmVudCxcblx0XHRcdFx0b2JqZWN0OiB0aGlzLFxuXHRcdFx0XHRldmVudERhdGE6IHtcblx0XHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvbi5ub25lLFxuXHRcdFx0XHRcdG5ld0luZGV4OiB0aGlzLmN1cnJlbnRQYW5lbC5pbmRleCxcblx0XHRcdFx0XHRvbGRJbmRleDogcHJldmlvdXNTbGlkZS5pbmRleCxcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIGNvbnNvbGUubG9nKCdpbnZhbGlkIGluZGV4Jyk7XG5cdFx0fVxuXHR9XG5cblx0cHVibGljIGFwcGx5U3dpcGUocGFnZVdpZHRoOiBudW1iZXIpOiB2b2lkIHtcblx0XHRsZXQgcHJldmlvdXNEZWx0YSA9IC0xOyAvL2hhY2sgdG8gZ2V0IGFyb3VuZCBpb3MgZmlyaW5nIHBhbiBldmVudCBhZnRlciByZWxlYXNlXG5cdFx0bGV0IGVuZGluZ1ZlbG9jaXR5ID0gMDtcblx0XHRsZXQgc3RhcnRUaW1lLCBkZWx0YVRpbWU7XG5cblx0XHR0aGlzLmN1cnJlbnRQYW5lbC5wYW5lbC5vbigncGFuJywgKGFyZ3M6IGdlc3R1cmVzLlBhbkdlc3R1cmVFdmVudERhdGEpOiB2b2lkID0+IHtcblx0XHRcdGlmIChhcmdzLnN0YXRlID09PSBnZXN0dXJlcy5HZXN0dXJlU3RhdGVUeXBlcy5iZWdhbikge1xuXHRcdFx0XHRzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXHRcdFx0XHRwcmV2aW91c0RlbHRhID0gMDtcblx0XHRcdFx0ZW5kaW5nVmVsb2NpdHkgPSAyNTA7XG5cblx0XHRcdFx0dGhpcy50cmlnZ2VyU3RhcnRFdmVudCgpO1xuXHRcdFx0fSBlbHNlIGlmIChhcmdzLnN0YXRlID09PSBnZXN0dXJlcy5HZXN0dXJlU3RhdGVUeXBlcy5lbmRlZCkge1xuXHRcdFx0XHRkZWx0YVRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuXHRcdFx0XHQvLyBpZiB2ZWxvY2l0eVNjcm9sbGluZyBpcyBlbmFibGVkIHRoZW4gY2FsY3VsYXRlIHRoZSB2ZWxvY2l0dHlcblxuXHRcdFx0XHQvLyBzd2lwaW5nIGxlZnQgdG8gcmlnaHQuXG5cdFx0XHRcdGlmIChhcmdzLmRlbHRhWCA+IChwYWdlV2lkdGggLyAzKSkge1xuXHRcdFx0XHRcdGlmICh0aGlzLmhhc1ByZXZpb3VzKSB7XG5cdFx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdFx0XHRcdFx0dGhpcy5zaG93TGVmdFNsaWRlKHRoaXMuY3VycmVudFBhbmVsLCBhcmdzLmRlbHRhWCwgZW5kaW5nVmVsb2NpdHkpLnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0XHR0aGlzLnNldHVwUGFuZWwodGhpcy5jdXJyZW50UGFuZWwubGVmdCk7XG5cblx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRMZWZ0VG9SaWdodCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdC8vV2UncmUgYXQgdGhlIHN0YXJ0XG5cdFx0XHRcdFx0XHQvL05vdGlmeSBubyBtb3JlIHNsaWRlc1xuXHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyQ2FuY2VsRXZlbnQoY2FuY2VsbGF0aW9uUmVhc29uLm5vUHJldlNsaWRlcyk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQvLyBzd2lwaW5nIHJpZ2h0IHRvIGxlZnRcblx0XHRcdFx0ZWxzZSBpZiAoYXJncy5kZWx0YVggPCAoLXBhZ2VXaWR0aCAvIDMpKSB7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTmV4dCkge1xuXHRcdFx0XHRcdFx0dGhpcy50cmFuc2l0aW9uaW5nID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMuc2hvd1JpZ2h0U2xpZGUodGhpcy5jdXJyZW50UGFuZWwsIGFyZ3MuZGVsdGFYLCBlbmRpbmdWZWxvY2l0eSkudGhlbigoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHRoaXMuc2V0dXBQYW5lbCh0aGlzLmN1cnJlbnRQYW5lbC5yaWdodCk7XG5cblx0XHRcdFx0XHRcdFx0Ly8gTm90aWZ5IGNoYW5nZWRcblx0XHRcdFx0XHRcdFx0dGhpcy50cmlnZ2VyQ2hhbmdlRXZlbnRSaWdodFRvTGVmdCgpO1xuXG5cdFx0XHRcdFx0XHRcdGlmICghdGhpcy5oYXNOZXh0KSB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gTm90aWZ5IGZpbnNpaGVkXG5cdFx0XHRcdFx0XHRcdFx0dGhpcy5ub3RpZnkoe1xuXHRcdFx0XHRcdFx0XHRcdFx0ZXZlbnROYW1lOiBTbGlkZUNvbnRhaW5lci5maW5pc2hlZEV2ZW50LFxuXHRcdFx0XHRcdFx0XHRcdFx0b2JqZWN0OiB0aGlzXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBXZSdyZSBhdCB0aGUgZW5kXG5cdFx0XHRcdFx0XHQvLyBOb3RpZnkgbm8gbW9yZSBzbGlkZXNcblx0XHRcdFx0XHRcdHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi5ub01vcmVTbGlkZXMpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy50cmFuc2l0aW9uaW5nID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdC8vTm90aWZ5IGNhbmNlbGxlZFxuXHRcdFx0XHRcdHRoaXMudHJpZ2dlckNhbmNlbEV2ZW50KGNhbmNlbGxhdGlvblJlYXNvbi51c2VyKTtcblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSB0cnVlO1xuXHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLnBhbmVsLmFuaW1hdGUoe1xuXHRcdFx0XHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxuXHRcdFx0XHRcdFx0ZHVyYXRpb246IDIwMCxcblx0XHRcdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0aWYgKHRoaXMuaGFzTmV4dCkge1xuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UGFuZWwucmlnaHQucGFuZWwuYW5pbWF0ZSh7XG5cdFx0XHRcdFx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHRcdFx0XHRcdGR1cmF0aW9uOiAyMDAsXG5cdFx0XHRcdFx0XHRcdGN1cnZlOiBBbmltYXRpb25DdXJ2ZS5lYXNlT3V0XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdGlmIChhcHAuaW9zKSAvL2ZvciBzb21lIHJlYXNvbiBpIGhhdmUgdG8gc2V0IHRoZXNlIGluIGlvcyBvciB0aGVyZSBpcyBzb21lIHNvcnQgb2YgYm91bmNlIGJhY2suXG5cdFx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLnJpZ2h0LnBhbmVsLnRyYW5zbGF0ZVggPSAwO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAodGhpcy5oYXNQcmV2aW91cykge1xuXHRcdFx0XHRcdFx0dGhpcy5jdXJyZW50UGFuZWwubGVmdC5wYW5lbC5hbmltYXRlKHtcblx0XHRcdFx0XHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCAqIDIsIHk6IDAgfSxcblx0XHRcdFx0XHRcdFx0ZHVyYXRpb246IDIwMCxcblx0XHRcdFx0XHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0aWYgKGFwcC5pb3MpXG5cdFx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLmxlZnQucGFuZWwudHJhbnNsYXRlWCA9IC10aGlzLnBhZ2VXaWR0aDtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoYXBwLmlvcylcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLnBhbmVsLnRyYW5zbGF0ZVggPSAtdGhpcy5wYWdlV2lkdGg7XG5cblx0XHRcdFx0XHR0aGlzLnRyYW5zaXRpb25pbmcgPSBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKCF0aGlzLnRyYW5zaXRpb25pbmdcblx0XHRcdFx0XHQmJiBwcmV2aW91c0RlbHRhICE9PSBhcmdzLmRlbHRhWFxuXHRcdFx0XHRcdCYmIGFyZ3MuZGVsdGFYICE9IG51bGxcblx0XHRcdFx0XHQmJiBhcmdzLmRlbHRhWCA8IDApIHtcblxuXHRcdFx0XHRcdGlmICh0aGlzLmhhc05leHQpIHtcblx0XHRcdFx0XHRcdHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uLmxlZnQ7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYW5lbC5wYW5lbC50cmFuc2xhdGVYID0gYXJncy5kZWx0YVggLSB0aGlzLnBhZ2VXaWR0aDtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLnJpZ2h0LnBhbmVsLnRyYW5zbGF0ZVggPSBhcmdzLmRlbHRhWDtcblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmICghdGhpcy50cmFuc2l0aW9uaW5nXG5cdFx0XHRcdFx0JiYgcHJldmlvdXNEZWx0YSAhPT0gYXJncy5kZWx0YVhcblx0XHRcdFx0XHQmJiBhcmdzLmRlbHRhWCAhPSBudWxsXG5cdFx0XHRcdFx0JiYgYXJncy5kZWx0YVggPiAwKSB7XG5cblx0XHRcdFx0XHRpZiAodGhpcy5oYXNQcmV2aW91cykge1xuXHRcdFx0XHRcdFx0dGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb24ucmlnaHQ7XG5cdFx0XHRcdFx0XHR0aGlzLmN1cnJlbnRQYW5lbC5wYW5lbC50cmFuc2xhdGVYID0gYXJncy5kZWx0YVggLSB0aGlzLnBhZ2VXaWR0aDtcblx0XHRcdFx0XHRcdHRoaXMuY3VycmVudFBhbmVsLmxlZnQucGFuZWwudHJhbnNsYXRlWCA9IC0odGhpcy5wYWdlV2lkdGggKiAyKSArIGFyZ3MuZGVsdGFYO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChhcmdzLmRlbHRhWCAhPT0gMCkge1xuXHRcdFx0XHRcdHByZXZpb3VzRGVsdGEgPSBhcmdzLmRlbHRhWDtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHNob3dSaWdodFNsaWRlKHBhbmVsTWFwOiBJU2xpZGVNYXAsIG9mZnNldDogbnVtYmVyID0gdGhpcy5wYWdlV2lkdGgsIGVuZGluZ1ZlbG9jaXR5OiBudW1iZXIgPSAzMik6IEFuaW1hdGlvbk1vZHVsZS5BbmltYXRpb25Qcm9taXNlIHtcblx0XHRsZXQgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlcjtcblx0XHRhbmltYXRpb25EdXJhdGlvbiA9IDMwMDsgLy8gZGVmYXVsdCB2YWx1ZVxuXG5cdFx0bGV0IHRyYW5zaXRpb24gPSBuZXcgQXJyYXkoKTtcblxuXHRcdHRyYW5zaXRpb24ucHVzaCh7XG5cdFx0XHR0YXJnZXQ6IHBhbmVsTWFwLnJpZ2h0LnBhbmVsLFxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxuXHRcdFx0ZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcblx0XHR9KTtcblx0XHR0cmFuc2l0aW9uLnB1c2goe1xuXHRcdFx0dGFyZ2V0OiBwYW5lbE1hcC5wYW5lbCxcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAtdGhpcy5wYWdlV2lkdGggKiAyLCB5OiAwIH0sXG5cdFx0XHRkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxuXHRcdH0pO1xuXHRcdGxldCBhbmltYXRpb25TZXQgPSBuZXcgQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvbih0cmFuc2l0aW9uLCBmYWxzZSk7XG5cblx0XHRyZXR1cm4gYW5pbWF0aW9uU2V0LnBsYXkoKTtcblx0fVxuXG5cdHByaXZhdGUgc2hvd0xlZnRTbGlkZShwYW5lbE1hcDogSVNsaWRlTWFwLCBvZmZzZXQ6IG51bWJlciA9IHRoaXMucGFnZVdpZHRoLCBlbmRpbmdWZWxvY2l0eTogbnVtYmVyID0gMzIpOiBBbmltYXRpb25Nb2R1bGUuQW5pbWF0aW9uUHJvbWlzZSB7XG5cblx0XHRsZXQgYW5pbWF0aW9uRHVyYXRpb246IG51bWJlcjtcblx0XHRhbmltYXRpb25EdXJhdGlvbiA9IDMwMDsgLy8gZGVmYXVsdCB2YWx1ZVxuXHRcdGxldCB0cmFuc2l0aW9uID0gbmV3IEFycmF5KCk7XG5cblx0XHR0cmFuc2l0aW9uLnB1c2goe1xuXHRcdFx0dGFyZ2V0OiBwYW5lbE1hcC5sZWZ0LnBhbmVsLFxuXHRcdFx0dHJhbnNsYXRlOiB7IHg6IC10aGlzLnBhZ2VXaWR0aCwgeTogMCB9LFxuXHRcdFx0ZHVyYXRpb246IGFuaW1hdGlvbkR1cmF0aW9uLFxuXHRcdFx0Y3VydmU6IEFuaW1hdGlvbkN1cnZlLmVhc2VPdXRcblx0XHR9KTtcblx0XHR0cmFuc2l0aW9uLnB1c2goe1xuXHRcdFx0dGFyZ2V0OiBwYW5lbE1hcC5wYW5lbCxcblx0XHRcdHRyYW5zbGF0ZTogeyB4OiAwLCB5OiAwIH0sXG5cdFx0XHRkdXJhdGlvbjogYW5pbWF0aW9uRHVyYXRpb24sXG5cdFx0XHRjdXJ2ZTogQW5pbWF0aW9uQ3VydmUuZWFzZU91dFxuXHRcdH0pO1xuXHRcdGxldCBhbmltYXRpb25TZXQgPSBuZXcgQW5pbWF0aW9uTW9kdWxlLkFuaW1hdGlvbih0cmFuc2l0aW9uLCBmYWxzZSk7XG5cblx0XHRyZXR1cm4gYW5pbWF0aW9uU2V0LnBsYXkoKTtcblxuXHR9XG5cblx0cHJpdmF0ZSBidWlsZEZvb3RlcihwYWdlQ291bnQ6IG51bWJlciA9IDUsIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwKTogU3RhY2tMYXlvdXQge1xuXHRcdGxldCBmb290ZXJJbm5lcldyYXAgPSBuZXcgU3RhY2tMYXlvdXQoKTtcblxuXHRcdC8vZm9vdGVySW5uZXJXcmFwLmhlaWdodCA9IDUwO1xuXHRcdGlmIChhcHAuaW9zKSB7XG5cdFx0XHRmb290ZXJJbm5lcldyYXAuY2xpcFRvQm91bmRzID0gZmFsc2U7XG5cdFx0fVxuXHRcdGZvb3RlcklubmVyV3JhcC5jbGFzc05hbWUgPSBTTElERV9JTkRJQ0FUT1JfV1JBUDtcblxuXG5cdFx0QWJzb2x1dGVMYXlvdXQuc2V0VG9wKGZvb3RlcklubmVyV3JhcCwgMCk7XG5cblx0XHRmb290ZXJJbm5lcldyYXAub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG5cdFx0Zm9vdGVySW5uZXJXcmFwLmhvcml6b250YWxBbGlnbm1lbnQgPSAnY2VudGVyJztcblx0XHRmb290ZXJJbm5lcldyYXAud2lkdGggPSB0aGlzLnBhZ2VXaWR0aCAvIDI7XG5cblx0XHRsZXQgaW5kZXggPSAwO1xuXHRcdHdoaWxlIChpbmRleCA8IHBhZ2VDb3VudCkge1xuXHRcdFx0Zm9vdGVySW5uZXJXcmFwLmFkZENoaWxkKHRoaXMuY3JlYXRlSW5kaWNhdG9yKGluZGV4KSk7XG5cdFx0XHRpbmRleCsrO1xuXHRcdH1cblxuXHRcdGxldCBwYWdlSW5kaWNhdG9yc0xlZnRPZmZzZXQgPSB0aGlzLnBhZ2VXaWR0aCAvIDQ7XG5cdFx0QWJzb2x1dGVMYXlvdXQuc2V0TGVmdChmb290ZXJJbm5lcldyYXAsIHBhZ2VJbmRpY2F0b3JzTGVmdE9mZnNldCk7XG5cdFx0Zm9vdGVySW5uZXJXcmFwLm1hcmdpblRvcCA9IDxhbnk+dGhpcy5fcGFnZXJPZmZzZXQ7XG5cblx0XHRyZXR1cm4gZm9vdGVySW5uZXJXcmFwO1xuXHR9XG5cblx0cHJpdmF0ZSBzZXR3aWR0aFBlcmNlbnQodmlldzogVmlldywgcGVyY2VudGFnZTogbnVtYmVyKSB7XG5cdFx0KDxhbnk+dmlldykud2lkdGggPSBwZXJjZW50YWdlICsgJyUnO1xuXHR9XG5cblx0cHJpdmF0ZSBuZXdGb290ZXJCdXR0b24obmFtZTogc3RyaW5nKTogQnV0dG9uIHtcblx0XHRsZXQgYnV0dG9uID0gbmV3IEJ1dHRvbigpO1xuXHRcdGJ1dHRvbi5pZCA9ICdidG4taW5mby0nICsgbmFtZS50b0xvd2VyQ2FzZSgpO1xuXHRcdGJ1dHRvbi50ZXh0ID0gbmFtZTtcblx0XHR0aGlzLnNldHdpZHRoUGVyY2VudChidXR0b24sIDEwMCk7XG5cdFx0cmV0dXJuIGJ1dHRvbjtcblx0fVxuXG5cdHByaXZhdGUgYnVpbGRTbGlkZU1hcCh2aWV3czogU3RhY2tMYXlvdXRbXSkge1xuXHRcdHRoaXMuX3NsaWRlTWFwID0gW107XG5cdFx0dmlld3MuZm9yRWFjaCgodmlldzogU3RhY2tMYXlvdXQsIGluZGV4OiBudW1iZXIpID0+IHtcblx0XHRcdHRoaXMuX3NsaWRlTWFwLnB1c2goe1xuXHRcdFx0XHRwYW5lbDogdmlldyxcblx0XHRcdFx0aW5kZXg6IGluZGV4LFxuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0dGhpcy5fc2xpZGVNYXAuZm9yRWFjaCgobWFwcGluZzogSVNsaWRlTWFwLCBpbmRleDogbnVtYmVyKSA9PiB7XG5cdFx0XHRpZiAodGhpcy5fc2xpZGVNYXBbaW5kZXggLSAxXSAhPSBudWxsKVxuXHRcdFx0XHRtYXBwaW5nLmxlZnQgPSB0aGlzLl9zbGlkZU1hcFtpbmRleCAtIDFdO1xuXHRcdFx0aWYgKHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV0gIT0gbnVsbClcblx0XHRcdFx0bWFwcGluZy5yaWdodCA9IHRoaXMuX3NsaWRlTWFwW2luZGV4ICsgMV07XG5cdFx0fSk7XG5cblx0XHRpZiAodGhpcy5sb29wKSB7XG5cdFx0XHR0aGlzLl9zbGlkZU1hcFswXS5sZWZ0ID0gdGhpcy5fc2xpZGVNYXBbdGhpcy5fc2xpZGVNYXAubGVuZ3RoIC0gMV07XG5cdFx0XHR0aGlzLl9zbGlkZU1hcFt0aGlzLl9zbGlkZU1hcC5sZW5ndGggLSAxXS5yaWdodCA9IHRoaXMuX3NsaWRlTWFwWzBdO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5fc2xpZGVNYXBbMF07XG5cdH1cblxuXHRwcml2YXRlIHRyaWdnZXJTdGFydEV2ZW50KCkge1xuXHRcdHRoaXMubm90aWZ5KHtcblx0XHRcdGV2ZW50TmFtZTogU2xpZGVDb250YWluZXIuc3RhcnRFdmVudCxcblx0XHRcdG9iamVjdDogdGhpcyxcblx0XHRcdGV2ZW50RGF0YToge1xuXHRcdFx0XHRjdXJyZW50SW5kZXg6IHRoaXMuY3VycmVudFBhbmVsLmluZGV4XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHRyaWdnZXJDaGFuZ2VFdmVudExlZnRUb1JpZ2h0KCkge1xuXHRcdHRoaXMubm90aWZ5KHtcblx0XHRcdGV2ZW50TmFtZTogU2xpZGVDb250YWluZXIuY2hhbmdlZEV2ZW50LFxuXHRcdFx0b2JqZWN0OiB0aGlzLFxuXHRcdFx0ZXZlbnREYXRhOiB7XG5cdFx0XHRcdGRpcmVjdGlvbjogZGlyZWN0aW9uLmxlZnQsXG5cdFx0XHRcdG5ld0luZGV4OiB0aGlzLmN1cnJlbnRQYW5lbC5pbmRleCxcblx0XHRcdFx0b2xkSW5kZXg6IHRoaXMuY3VycmVudFBhbmVsLmluZGV4ICsgMVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHJpdmF0ZSB0cmlnZ2VyQ2hhbmdlRXZlbnRSaWdodFRvTGVmdCgpIHtcblx0XHR0aGlzLm5vdGlmeSh7XG5cdFx0XHRldmVudE5hbWU6IFNsaWRlQ29udGFpbmVyLmNoYW5nZWRFdmVudCxcblx0XHRcdG9iamVjdDogdGhpcyxcblx0XHRcdGV2ZW50RGF0YToge1xuXHRcdFx0XHRkaXJlY3Rpb246IGRpcmVjdGlvbi5yaWdodCxcblx0XHRcdFx0bmV3SW5kZXg6IHRoaXMuY3VycmVudFBhbmVsLmluZGV4LFxuXHRcdFx0XHRvbGRJbmRleDogdGhpcy5jdXJyZW50UGFuZWwuaW5kZXggLSAxXG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRwcml2YXRlIHRyaWdnZXJDYW5jZWxFdmVudChjYW5jZWxSZWFzb246IGNhbmNlbGxhdGlvblJlYXNvbikge1xuXHRcdHRoaXMubm90aWZ5KHtcblx0XHRcdGV2ZW50TmFtZTogU2xpZGVDb250YWluZXIuY2FuY2VsbGVkRXZlbnQsXG5cdFx0XHRvYmplY3Q6IHRoaXMsXG5cdFx0XHRldmVudERhdGE6IHtcblx0XHRcdFx0Y3VycmVudEluZGV4OiB0aGlzLmN1cnJlbnRQYW5lbC5pbmRleCxcblx0XHRcdFx0cmVhc29uOiBjYW5jZWxSZWFzb25cblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGNyZWF0ZUluZGljYXRvcihpbmRleDogbnVtYmVyKTogTGFiZWwge1xuXHRcdGxldCBpbmRpY2F0b3IgPSBuZXcgTGFiZWwoKTtcblxuXHRcdCg8YW55PmluZGljYXRvcikuY2xhc3NMaXN0LmFkZChTTElERV9JTkRJQ0FUT1JfSU5BQ1RJVkUpO1xuXHRcdHJldHVybiBpbmRpY2F0b3I7XG5cdH1cblxuXHRzZXRBY3RpdmVQYWdlSW5kaWNhdG9yKGluZGV4OiBudW1iZXIpIHtcblx0XHRsZXQgaW5kaWNhdG9yc1RvRGVhY3RpdmF0ZSA9ICg8YW55PnRoaXMuX2Zvb3RlcikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTTElERV9JTkRJQ0FUT1JfQUNUSVZFKTtcblxuXHRcdGluZGljYXRvcnNUb0RlYWN0aXZhdGUuZm9yRWFjaChhY3RpdmVJbmRpY2F0b3IgPT4ge1xuXHRcdFx0YWN0aXZlSW5kaWNhdG9yLmNsYXNzTGlzdC5yZW1vdmUoU0xJREVfSU5ESUNBVE9SX0FDVElWRSk7XG5cdFx0XHRhY3RpdmVJbmRpY2F0b3IuY2xhc3NMaXN0LmFkZChTTElERV9JTkRJQ0FUT1JfSU5BQ1RJVkUpO1xuXHRcdH0pO1xuXG5cdFx0bGV0IGFjdGl2ZUluZGljYXRvciA9ICg8YW55PnRoaXMuX2Zvb3RlcikuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShTTElERV9JTkRJQ0FUT1JfSU5BQ1RJVkUpW2luZGV4XTtcblx0XHRpZiAoYWN0aXZlSW5kaWNhdG9yKSB7XG5cdFx0XHRhY3RpdmVJbmRpY2F0b3IuY2xhc3NMaXN0LnJlbW92ZShTTElERV9JTkRJQ0FUT1JfSU5BQ1RJVkUpO1xuXHRcdFx0YWN0aXZlSW5kaWNhdG9yLmNsYXNzTGlzdC5hZGQoU0xJREVfSU5ESUNBVE9SX0FDVElWRSk7XG5cdFx0fVxuXG5cdH1cblxuXHRpb3NQcm9wZXJ0eSh0aGVDbGFzcywgdGhlUHJvcGVydHkpIHtcblx0XHRpZiAodHlwZW9mIHRoZVByb3BlcnR5ID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdC8vIHhDb2RlIDcgYW5kIGJlbG93XG5cdFx0XHRyZXR1cm4gdGhlUHJvcGVydHkuY2FsbCh0aGVDbGFzcyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIHhDb2RlIDgrXG5cdFx0XHRyZXR1cm4gdGhlUHJvcGVydHk7XG5cdFx0fVxuXHR9XG59XG4iXX0=