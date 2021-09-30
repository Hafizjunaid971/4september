export class ReturnInvoice{
    InvoiceNumber: string;
    InvoiceDate: string;
    Particulars: string;
    Company: string;
    ProductInventoryList: Array<Product>;
    TotalPayment: string;
    Discount: string;
    DiscountAmount: string;
    NetAmount: string;
    PaymentDone: string;
    PaymentDue: string;
    Remarks: string;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class Product{
    Product: string;
    Code: string;
    Category: string;
    Variety: string;
    Size: string;
    UnitPrice: string;
    InInventory: string;
    NoOfUnits: string;
    Total: string;
}