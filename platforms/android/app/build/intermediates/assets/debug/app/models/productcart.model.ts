import { ValueList, DropDown } from "nativescript-drop-down";
import { ValueListNew } from "../models/valuelist.model";

class Likes {
    constructor(
        public cooperId: String,
        public userId: String,
        public user: String,
        public  dateCreated: Date
       
    
    ) { }
}


class Rates {
    constructor(
        public cooperId: String,
        public userId: String,
        public rate: number,
        public comment: String,
        public user: String,
        public  dateCreated: Date

        
       
       
    
    ) { }
}

export class ProductCart{

    public  _id: String;
    public  productId: String;
    public  vendorId: String;
    public  productName: String;
    public  productBriefDesc: String;
    public  productDetailDesc: String;
    public  productSpec: String;
    public  productImage: String;
    public  productBackImage: String;
    public  productLeftImage: String;
    public  productRightImage: String;
    public  brand: String;
    public  location: String;
    public  quantity: number;
    public  price: number;
    public  status: String;
    public  expires: Date;
    public  dateCreated: Date;
    public  amount: number;
    
    public  dateModified: Date;
    public  qty: number;
    public  likesCount: number;
    public  quantitySold: number;
    
    public selectedQtyIndex: number;
    public qtyList:  ValueList<string>;
    public qtyList2: Array<ValueListNew> = [];
    public isSelected: boolean;
   


    public likes: Array<Likes>;
    public rates: Array<Rates>;
   
    
    constructor()
    {
          
    }
}