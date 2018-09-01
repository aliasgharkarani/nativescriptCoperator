
import { Product } from "./product.model";
export class Transaction{

    public  _id: String;
    public  transactId: String;
    public  cooperId: String;
    public  cooperativeId: String;
    public  vendorId: String;
    public  subVendorId: String;
    public  staffId: String;
    public  transactRefNo: String;
    public  cooperativeTranId: String;
    public  authorizerPersonId: String;
    public  authorizationStatus: String;
    public  transactStatus: String;
    public  paymentStatus: String;
    public  transAmount: number;
    public  unitAmount: number;
    public  amountPaid: number;
    public  amountOutstanding: number;
    
    public  productId: String;
    public  batchId: String;
    public  productStatus: String;
    public  paymentType: String;
    public  paymentTypeSub: String;
    public  quantity: number;
    public  orderStatus: String;
    public  uploadInvoiceImage: String;
    public  status: String;
    public  transactionDate: Date;
    public  dateCreated: Date;
    
    public  dateModified: Date;
    public  product: Product;

   


   
    
    constructor()
    {
          
    }
}