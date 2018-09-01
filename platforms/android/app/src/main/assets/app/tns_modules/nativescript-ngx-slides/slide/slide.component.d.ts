import { ElementRef, EventEmitter } from '@angular/core';
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout';
import * as gestures from 'tns-core-modules/ui/gestures';
export declare class SlideComponent {
    slideLayout: ElementRef;
    cssClass: string;
    tap: EventEmitter<gestures.GestureEventData>;
    doubleTap: EventEmitter<gestures.GestureEventData>;
    pinch: EventEmitter<gestures.GestureEventData>;
    slideWidth: number;
    slideHeight: number | string;
    readonly layout: StackLayout;
    constructor();
    ngOnInit(): void;
    ngAfterViewInit(): void;
}
