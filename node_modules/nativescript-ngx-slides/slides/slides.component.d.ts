import { OnInit, AfterViewInit, ChangeDetectorRef, OnDestroy, ElementRef, QueryList, EventEmitter } from '@angular/core';
import { SlideComponent } from '../slide/slide.component';
import * as gestures from 'tns-core-modules/ui/gestures';
import * as app from 'tns-core-modules/application';
export interface IIndicators {
    active: boolean;
}
export interface ISlideMap {
    slide: SlideComponent;
    index: number;
    left?: ISlideMap;
    right?: ISlideMap;
}
export declare class SlidesComponent implements OnInit, AfterViewInit, OnDestroy {
    private ref;
    slides: QueryList<SlideComponent>;
    footer: ElementRef;
    pageWidth: number;
    pageHeight: number;
    footerMarginTop: number;
    loop: boolean;
    pageIndicators: boolean;
    cssClass: string;
    zoomEnabled: boolean;
    autoInit: boolean;
    changed: EventEmitter<any>;
    finished: EventEmitter<any>;
    tap: EventEmitter<gestures.GestureEventData>;
    /** If auto init is turned off this flag indicates when the slides are ready to be rendered */
    private manualInitTriggered;
    private transitioning;
    private direction;
    private FOOTER_HEIGHT;
    indicators: IIndicators[];
    currentSlide: ISlideMap;
    _slideMap: ISlideMap[];
    currentScale: number;
    currentDeltaX: number;
    currentDeltaY: number;
    readonly hasNext: boolean;
    readonly hasPrevious: boolean;
    constructor(ref: ChangeDetectorRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    init(): void;
    /**
     * This method cannot be called directly from a using component but has to be called within ngAfterViewChecked().
     *
     * @private
     */
    private _init();
    ngOnDestroy(): void;
    onOrientationChanged(args: app.OrientationChangedEventData): void;
    setActivePageIndicator(activeIndex: number): void;
    private calculateFoorterMarginTop(pageHeight);
    private buildFooter(pageCount?);
    private setupPanel(slide);
    private positionSlides(slide);
    private showRightSlide(slideMap, offset?, endingVelocity?, duration?);
    private showLeftSlide(slideMap, offset?, endingVelocity?, duration?);
    applyGestures(): void;
    onSwipe(args: gestures.PanGestureEventData): void;
    onDoubleTap(args: gestures.GestureEventData): void;
    onPinch(args: gestures.PinchGestureEventData): void;
    onPan(args: gestures.PanGestureEventData): void;
    private buildSlideMap(slides);
    GoToSlide(num: number, traverseDuration?: number, landingDuration?: number): void;
    nextSlide(duration?: number): Promise<any>;
    previousSlide(duration?: number): Promise<any>;
}
