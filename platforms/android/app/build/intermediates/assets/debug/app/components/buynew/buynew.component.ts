import { Component, OnInit } from "@angular/core";


@Component({
    moduleId: module.id,
    selector: "ns-buynew",
    templateUrl: "./buynew.component.html",
    styleUrls: [ "./buynew.component.css"]
   
  
})

export class BuyNewComponent implements OnInit  {
   

    public constructor(
      ) {
          
    
           
        
        }
    
      
    
        public ngOnInit() {
    
    
            // this.productId = this.activatedRoute.snapshot.params["id"];
    
            // var dataObject = JSON.parse(LS.getItem('currentUser'));
    
           
    
            
            //   if(dataObject._id)
            //   {
            //       this.userId = dataObject._id;
            //       this.cooperId = dataObject.cooperId;
                 
            //   }
            // this.getProductById(this.productId,this.userId);
    
            //console.log("Current URL " + this.router.url);
    
           
           
    
        }

        // getProductById(productId: String, userId: String) {
        //     console.log("Product Id Buy" + productId);
        //     this.product = null;
    
        //     this.productService.getproduct(productId,userId).subscribe(
        //         data => {
                   
        //            // console.log("Single Product " + JSON.stringify(data["data"]));
        //             this.product = data["data"];
    
        //             var checkIfLikeExist = this.product.likes.filter(n => n.cooperId === this.cooperId);
    
        //             if(checkIfLikeExist.length > 0)
        //             {
        //                 this.likedThisProduct = true;
        //                 this.likeLabelClass = "fa like";
        //                this._changeDetectionRef.detectChanges();
                       
        //            }
    
        //            if (this.product.likesCount) {
    
                    
        //             } else {
    
        //                 this.product.likesCount = 0;
        //             }
                    
    
        //         },
        //         err => {
        //             console.log(err);
    
        //         }
        //     );
        // }

   

}