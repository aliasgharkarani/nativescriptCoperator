"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Likes = /** @class */ (function () {
    function Likes(cooperId, userId, user, dateCreated) {
        this.cooperId = cooperId;
        this.userId = userId;
        this.user = user;
        this.dateCreated = dateCreated;
    }
    return Likes;
}());
var Rates = /** @class */ (function () {
    function Rates(cooperId, userId, rate, comment, user, dateCreated) {
        this.cooperId = cooperId;
        this.userId = userId;
        this.rate = rate;
        this.comment = comment;
        this.user = user;
        this.dateCreated = dateCreated;
    }
    return Rates;
}());
var Product = /** @class */ (function () {
    function Product() {
    }
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInByb2R1Y3QubW9kZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQTtJQUNJLGVBQ1csUUFBZ0IsRUFDaEIsTUFBYyxFQUNkLElBQVksRUFDWCxXQUFpQjtRQUhsQixhQUFRLEdBQVIsUUFBUSxDQUFRO1FBQ2hCLFdBQU0sR0FBTixNQUFNLENBQVE7UUFDZCxTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1gsZ0JBQVcsR0FBWCxXQUFXLENBQU07SUFHekIsQ0FBQztJQUNULFlBQUM7QUFBRCxDQUFDLEFBVEQsSUFTQztBQUdEO0lBQ0ksZUFDVyxRQUFnQixFQUNoQixNQUFjLEVBQ2QsSUFBWSxFQUNaLE9BQWUsRUFDZixJQUFZLEVBQ1gsV0FBaUI7UUFMbEIsYUFBUSxHQUFSLFFBQVEsQ0FBUTtRQUNoQixXQUFNLEdBQU4sTUFBTSxDQUFRO1FBQ2QsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQ1gsZ0JBQVcsR0FBWCxXQUFXLENBQU07SUFNekIsQ0FBQztJQUNULFlBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQUdEO0lBOEJJO0lBR0EsQ0FBQztJQUNMLGNBQUM7QUFBRCxDQUFDLEFBbENELElBa0NDO0FBbENZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbmNsYXNzIExpa2VzIHtcclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHB1YmxpYyBjb29wZXJJZDogU3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyB1c2VySWQ6IFN0cmluZyxcclxuICAgICAgICBwdWJsaWMgdXNlcjogU3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyAgZGF0ZUNyZWF0ZWQ6IERhdGVcclxuICAgICAgIFxyXG4gICAgXHJcbiAgICApIHsgfVxyXG59XHJcblxyXG5cclxuY2xhc3MgUmF0ZXMge1xyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHVibGljIGNvb3BlcklkOiBTdHJpbmcsXHJcbiAgICAgICAgcHVibGljIHVzZXJJZDogU3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyByYXRlOiBudW1iZXIsXHJcbiAgICAgICAgcHVibGljIGNvbW1lbnQ6IFN0cmluZyxcclxuICAgICAgICBwdWJsaWMgdXNlcjogU3RyaW5nLFxyXG4gICAgICAgIHB1YmxpYyAgZGF0ZUNyZWF0ZWQ6IERhdGVcclxuXHJcblxyXG4gICAgICAgXHJcbiAgICAgICBcclxuICAgIFxyXG4gICAgKSB7IH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9kdWN0e1xyXG5cclxuIFxyXG4gICAgcHVibGljICBfaWQ6IFN0cmluZztcclxuICAgIHB1YmxpYyAgcHJvZHVjdElkOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgIHZlbmRvcklkOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgIHByb2R1Y3ROYW1lOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgIHByb2R1Y3RCcmllZkRlc2M6IFN0cmluZztcclxuICAgIHB1YmxpYyAgcHJvZHVjdERldGFpbERlc2M6IFN0cmluZztcclxuICAgIHB1YmxpYyAgcHJvZHVjdFNwZWM6IFN0cmluZztcclxuICAgIHB1YmxpYyAgcHJvZHVjdEltYWdlOiBTdHJpbmc7XHJcbiAgICBwdWJsaWMgIHByb2R1Y3RCYWNrSW1hZ2U6IFN0cmluZztcclxuICAgIHB1YmxpYyAgcHJvZHVjdExlZnRJbWFnZTogU3RyaW5nO1xyXG4gICAgcHVibGljICBwcm9kdWN0UmlnaHRJbWFnZTogU3RyaW5nO1xyXG4gICAgcHVibGljICBicmFuZDogU3RyaW5nO1xyXG4gICAgcHVibGljICBsb2NhdGlvbjogU3RyaW5nO1xyXG4gICAgcHVibGljICBxdWFudGl0eTogbnVtYmVyO1xyXG4gICAgcHVibGljICBwcmljZTogbnVtYmVyO1xyXG4gICAgcHVibGljICBzdGF0dXM6IFN0cmluZztcclxuICAgIHB1YmxpYyAgZXhwaXJlczogRGF0ZTtcclxuICAgIHB1YmxpYyAgZGF0ZUNyZWF0ZWQ6IERhdGU7XHJcbiAgICBcclxuICAgIHB1YmxpYyAgZGF0ZU1vZGlmaWVkOiBEYXRlO1xyXG5cclxuICAgIHB1YmxpYyBsaWtlczogQXJyYXk8TGlrZXM+O1xyXG4gICAgcHVibGljIHJhdGVzOiBBcnJheTxSYXRlcz47XHJcblxyXG5cclxuICAgXHJcbiAgICBcclxuICAgIGNvbnN0cnVjdG9yKClcclxuICAgIHtcclxuICAgICAgICAgIFxyXG4gICAgfVxyXG59Il19