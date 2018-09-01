// const validator = require("email-validator");


export class User{

  public  _id: String;
  public firstName: String;
  public lastName: String;
 
  public isActive: Boolean;
  public dateCreated:  Date;
  public email: String;
  public phoneNo: String;
  public  cooperId: String;
  public  staffId: String;
  public  token: String;
  public  gottoKnowBy: String;
  public  userTypeId: String;
  public  transPin: String;
  public  parentId: String;
  public  status: String;
  public  profilePixURL: String;
  public  rating: String;
  public  spendingCap: Number;
  public  resetPasswordToken: String;
  public  resetPasswordExpires:  Date ;
  public  userMode: String
 
  
  constructor()
  {
        
  }
}



// isValidEmail() {
  //   return validator.validate(this.email);
  // }