"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var page_1 = require("ui/page");
var nativescript_bottom_navigation_1 = require("nativescript-bottom-navigation");
var Profile1Component = /** @class */ (function () {
    function Profile1Component(page) {
        this.page = page;
        this.selectedTab = 0;
        this.tabs = [
            new nativescript_bottom_navigation_1.BottomNavigationTab('First', 'shop'),
            new nativescript_bottom_navigation_1.BottomNavigationTab('Second', 'box', false),
            new nativescript_bottom_navigation_1.BottomNavigationTab('Third', 'accept'),
            new nativescript_bottom_navigation_1.BottomNavigationTab('Fourth', 'user')
        ];
    }
    Profile1Component.prototype.ngOnInit = function () {
        this._bottomNavigation = this.page.getViewById('bottomNavigation');
    };
    Profile1Component.prototype.onBottomNavigationTabSelected = function (args) {
        this.selectedTab = args.newIndex;
        if (this.selectedTab === 1) {
            alert('This item has selectable: false, and should be used to perform actions');
        }
        console.log("old tab index:  " + args.oldIndex);
        console.log("selected tab index:  " + args.newIndex);
    };
    Profile1Component = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-profile1',
            templateUrl: './profile1.component.html',
            styleUrls: ['./profile1.component.scss']
        }),
        __metadata("design:paramtypes", [page_1.Page])
    ], Profile1Component);
    return Profile1Component;
}());
exports.Profile1Component = Profile1Component;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZmlsZTEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvZmlsZTEuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlFO0FBU2pFLGdDQUErQjtBQWUvQixpRkFJd0M7QUFjeEM7SUFXRSwyQkFBb0IsSUFBVTtRQUFWLFNBQUksR0FBSixJQUFJLENBQU07UUFWdkIsZ0JBQVcsR0FBVyxDQUFDLENBQUM7UUFDeEIsU0FBSSxHQUEwQjtZQUNuQyxJQUFJLG9EQUFtQixDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUM7WUFDeEMsSUFBSSxvREFBbUIsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQztZQUMvQyxJQUFJLG9EQUFtQixDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUM7WUFDMUMsSUFBSSxvREFBbUIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDO1NBQzFDLENBQUM7SUFJZ0MsQ0FBQztJQUVuQyxvQ0FBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDckUsQ0FBQztJQUVELHlEQUE2QixHQUE3QixVQUE4QixJQUE0QjtRQUN4RCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7UUFDakMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLEtBQUssQ0FBQyx3RUFBd0UsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFtQixJQUFJLENBQUMsUUFBVSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBd0IsSUFBSSxDQUFDLFFBQVUsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUF4QlUsaUJBQWlCO1FBTjdCLGdCQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGNBQWM7WUFDeEIsV0FBVyxFQUFFLDJCQUEyQjtZQUN4QyxTQUFTLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztTQUN6QyxDQUFDO3lDQVkwQixXQUFJO09BWG5CLGlCQUFpQixDQTBCN0I7SUFBRCx3QkFBQztDQUFBLEFBMUJELElBMEJDO0FBMUJZLDhDQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBBZnRlclZpZXdJbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IFJvdXRlciwgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBMb2NhdGlvbiB9IGZyb20gXCJAYW5ndWxhci9jb21tb25cIjtcbmltcG9ydCB7IFNuYWNrQmFyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1zbmFja2JhclwiO1xuaW1wb3J0ICogYXMgQXBwbGljYXRpb25TZXR0aW5ncyBmcm9tIFwiYXBwbGljYXRpb24tc2V0dGluZ3NcIjtcbmltcG9ydCB7IGNvbm5lY3Rpb25UeXBlLCBnZXRDb25uZWN0aW9uVHlwZSB9IGZyb20gXCJjb25uZWN0aXZpdHlcIjtcbmltcG9ydCB7IEFuaW1hdGlvbiB9IGZyb20gXCJ1aS9hbmltYXRpb25cIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwidWkvY29yZS92aWV3XCI7XG5pbXBvcnQgeyBwcm9tcHQgfSBmcm9tIFwidWkvZGlhbG9nc1wiO1xuaW1wb3J0IHsgUGFnZSB9IGZyb20gXCJ1aS9wYWdlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuXG5pbXBvcnQgeyBWYWx1ZUxpc3QsIERyb3BEb3duIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IFNlbGVjdGVkSW5kZXhDaGFuZ2VkRXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1kcm9wLWRvd25cIjtcbmltcG9ydCB7IENvb3BlcmF0aXZlLCBVc2VyIH0gZnJvbSBcIi4uLy4uL21vZGVscy9pbmRleFwiO1xuaW1wb3J0IHsgQ29vcGVyYXRpdmVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlLnNlcnZpY2VcIjtcbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmZTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL2Nvb3BlcmF0aXZlU3RhZmYuc2VydmljZVwiO1xuXG5pbXBvcnQgeyBNZW1iZXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21lbWJlci5zZXJ2aWNlXCI7XG5cbmltcG9ydCB7IENvb3BlcmF0aXZlU3RhZmYsIFZlcmlmeUF1dGggfSBmcm9tIFwiLi4vLi4vbW9kZWxzL2luZGV4XCI7XG5cbmltcG9ydCB7IFROU0ZhbmN5QWxlcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWZhbmN5YWxlcnRcIjtcblxuaW1wb3J0IHtcbiAgQm90dG9tTmF2aWdhdGlvbixcbiAgQm90dG9tTmF2aWdhdGlvblRhYixcbiAgT25UYWJTZWxlY3RlZEV2ZW50RGF0YVxufSBmcm9tIFwibmF0aXZlc2NyaXB0LWJvdHRvbS1uYXZpZ2F0aW9uXCI7XG5pbXBvcnQge1xuICBBbmRyb2lkRGF0YSxcbiAgRWxldmF0aW9uLFxuICBTaGFwZSxcbiAgU2hhcGVFbnVtXG59IGZyb20gXCJuYXRpdmVzY3JpcHQtbmctc2hhZG93XCI7XG5cbkBDb21wb25lbnQoe1xuICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICBzZWxlY3RvcjogJ2FwcC1wcm9maWxlMScsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcm9maWxlMS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3Byb2ZpbGUxLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgUHJvZmlsZTFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgc2VsZWN0ZWRUYWI6IG51bWJlciA9IDA7XG4gIHB1YmxpYyB0YWJzOiBCb3R0b21OYXZpZ2F0aW9uVGFiW10gPSBbXG4gICAgbmV3IEJvdHRvbU5hdmlnYXRpb25UYWIoJ0ZpcnN0JywgJ3Nob3AnKSxcbiAgICBuZXcgQm90dG9tTmF2aWdhdGlvblRhYignU2Vjb25kJywgJ2JveCcsIGZhbHNlKSxcbiAgICBuZXcgQm90dG9tTmF2aWdhdGlvblRhYignVGhpcmQnLCAnYWNjZXB0JyksXG4gICAgbmV3IEJvdHRvbU5hdmlnYXRpb25UYWIoJ0ZvdXJ0aCcsICd1c2VyJylcbiAgXTtcblxuICBwcml2YXRlIF9ib3R0b21OYXZpZ2F0aW9uOiBCb3R0b21OYXZpZ2F0aW9uO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcGFnZTogUGFnZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYm90dG9tTmF2aWdhdGlvbiA9IHRoaXMucGFnZS5nZXRWaWV3QnlJZCgnYm90dG9tTmF2aWdhdGlvbicpO1xuICB9XG5cbiAgb25Cb3R0b21OYXZpZ2F0aW9uVGFiU2VsZWN0ZWQoYXJnczogT25UYWJTZWxlY3RlZEV2ZW50RGF0YSk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBhcmdzLm5ld0luZGV4O1xuICAgIGlmICh0aGlzLnNlbGVjdGVkVGFiID09PSAxKSB7XG4gICAgICBhbGVydCgnVGhpcyBpdGVtIGhhcyBzZWxlY3RhYmxlOiBmYWxzZSwgYW5kIHNob3VsZCBiZSB1c2VkIHRvIHBlcmZvcm0gYWN0aW9ucycpO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhgb2xkIHRhYiBpbmRleDogICR7YXJncy5vbGRJbmRleH1gKTtcbiAgICBjb25zb2xlLmxvZyhgc2VsZWN0ZWQgdGFiIGluZGV4OiAgJHthcmdzLm5ld0luZGV4fWApO1xuICB9XG5cbn0iXX0=