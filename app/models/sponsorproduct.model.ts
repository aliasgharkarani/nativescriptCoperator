
import { Product } from '../models/product.model';

export class SponsorProduct{

    public  categoryId: String;
    public  productId: String;
    public  ownerName: String;
    public  phoneNumber: String;
    public  status: String;
    public  email: String;
    public  firstName: String;
    public  lastName: String;
  
    public  startDate: Date;
    public  endDate: Date;
    public  dateCreated: Date;
    public  dateModified: Date;
    public  product: Product;
   
    constructor()
    {
          
    }
}