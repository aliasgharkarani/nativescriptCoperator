
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


export class Product{

 
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
    
    public  dateModified: Date;

    public likes: Array<Likes>;
    public rates: Array<Rates>;


   
    
    constructor()
    {
          
    }
}