"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CarouselItem = require('nativescript-carousel').CarouselItem;
var Carousel = require('nativescript-carousel').Carousel;
var platform_1 = require("tns-core-modules/platform");
function carouselItemFromView(view) {
    var item = new CarouselItem();
    item.addChild(view);
    return item;
}
function addItemToCarousel(carousel) {
    return function (item, index) {
        carousel.addChild(item);
        if (platform_1.isAndroid) {
            var adapter = carousel.android.getAdapter();
            if (adapter) {
                var count = index + 1;
                adapter.notifyDataSetChanged();
                carousel._pageIndicatorView.setCount(count);
                if (count === 1) {
                    carousel._pageIndicatorView.setSelection(item.android);
                }
            }
        }
    };
}
/**
 * @see https://github.com/manijak/nativescript-carousel/issues/5#issuecomment-325879416
 */
function renderCarouselSlides(carousel, items, slideRenderer) {
    items
        .map(slideRenderer)
        .map(carouselItemFromView)
        .map(addItemToCarousel(carousel));
    carousel.refresh();
}
exports.renderCarouselSlides = renderCarouselSlides;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3VwcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN1cHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxZQUFZLENBQUM7QUFDbkUsSUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDO0FBQzNELHNEQUFzRDtBQUd0RCw4QkFBOEIsSUFBVTtJQUNwQyxJQUFNLElBQUksR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQztBQUNoQixDQUFDO0FBRUQsMkJBQTJCLFFBQXlCO0lBQ2hELE1BQU0sQ0FBQyxVQUFDLElBQXlCLEVBQUUsS0FBYTtRQUM1QyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLG9CQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osSUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUU5QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLElBQU0sS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO2dCQUMvQixRQUFRLENBQUMsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUU1QyxFQUFFLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDZCxRQUFRLENBQUMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0QsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO0lBQ0wsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUVEOztHQUVHO0FBQ0gsOEJBQ0ksUUFBeUIsRUFDekIsS0FBWSxFQUNaLGFBQWtDO0lBRWxDLEtBQUs7U0FDQSxHQUFHLENBQUMsYUFBYSxDQUFDO1NBQ2xCLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQztTQUN6QixHQUFHLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUV0QyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdkIsQ0FBQztBQVhELG9EQVdDIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQ2Fyb3VzZWxJdGVtID0gcmVxdWlyZSgnbmF0aXZlc2NyaXB0LWNhcm91c2VsJykuQ2Fyb3VzZWxJdGVtO1xyXG5jb25zdCBDYXJvdXNlbCA9IHJlcXVpcmUoJ25hdGl2ZXNjcmlwdC1jYXJvdXNlbCcpLkNhcm91c2VsO1xyXG5pbXBvcnQgeyBpc0FuZHJvaWQgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQgeyBWaWV3IH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvY29yZS92aWV3XCI7XHJcblxyXG5mdW5jdGlvbiBjYXJvdXNlbEl0ZW1Gcm9tVmlldyh2aWV3OiBWaWV3KSB7XHJcbiAgICBjb25zdCBpdGVtID0gbmV3IENhcm91c2VsSXRlbSgpO1xyXG4gICAgaXRlbS5hZGRDaGlsZCh2aWV3KTtcclxuICAgIHJldHVybiBpdGVtO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRJdGVtVG9DYXJvdXNlbChjYXJvdXNlbDogdHlwZW9mIENhcm91c2VsKSB7XHJcbiAgICByZXR1cm4gKGl0ZW06IHR5cGVvZiBDYXJvdXNlbEl0ZW0sIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICBjYXJvdXNlbC5hZGRDaGlsZChpdGVtKTtcclxuXHJcbiAgICAgICAgaWYgKGlzQW5kcm9pZCkge1xyXG4gICAgICAgICAgICBjb25zdCBhZGFwdGVyID0gY2Fyb3VzZWwuYW5kcm9pZC5nZXRBZGFwdGVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoYWRhcHRlcikge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY291bnQgPSBpbmRleCArIDE7XHJcbiAgICAgICAgICAgICAgICBhZGFwdGVyLm5vdGlmeURhdGFTZXRDaGFuZ2VkKCk7XHJcbiAgICAgICAgICAgICAgICBjYXJvdXNlbC5fcGFnZUluZGljYXRvclZpZXcuc2V0Q291bnQoY291bnQpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhcm91c2VsLl9wYWdlSW5kaWNhdG9yVmlldy5zZXRTZWxlY3Rpb24oaXRlbS5hbmRyb2lkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21hbmlqYWsvbmF0aXZlc2NyaXB0LWNhcm91c2VsL2lzc3Vlcy81I2lzc3VlY29tbWVudC0zMjU4Nzk0MTZcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiByZW5kZXJDYXJvdXNlbFNsaWRlcyhcclxuICAgIGNhcm91c2VsOiB0eXBlb2YgQ2Fyb3VzZWwsXHJcbiAgICBpdGVtczogYW55W10sXHJcbiAgICBzbGlkZVJlbmRlcmVyOiAoaXRlbTogYW55KSA9PiBWaWV3XHJcbik6IHZvaWQge1xyXG4gICAgaXRlbXNcclxuICAgICAgICAubWFwKHNsaWRlUmVuZGVyZXIpXHJcbiAgICAgICAgLm1hcChjYXJvdXNlbEl0ZW1Gcm9tVmlldylcclxuICAgICAgICAubWFwKGFkZEl0ZW1Ub0Nhcm91c2VsKGNhcm91c2VsKSk7XHJcblxyXG4gICAgY2Fyb3VzZWwucmVmcmVzaCgpO1xyXG59Il19