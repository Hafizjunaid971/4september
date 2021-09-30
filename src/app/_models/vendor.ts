export class Vendor {
    Name: string;
    CompanyName: string;
    //my addition
    VendorDealsIn:Array<VendorDealsIn>;
    CompanyPhone:number;
    Country:string;
    City:string;
    Address1:string;
    Address2:string;
    EmailAddress:string;
    ContactPersonName1:string;
    Contact1:number;
    ContactPersonName2:string;
    Contact2:number;
    // Product: string;
  PriceList: string;
    // Phone: string;
    // Email: string;
    // Address: string;
    // City: string;
    ProductName:string;

    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class VendorDealsIn
{
  Name:string;
  Code:string;
  Category:string;
}
