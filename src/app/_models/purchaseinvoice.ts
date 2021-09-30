export class PurchaseInvoice{
    Date: Date;
    InvoiceNumber: string;
    Particulars: string;

  // mene add kia ha
    Product: string;
  // mene add kia ha
    Vendor: string;
    Details: Array<Details>;
    GrossTotal: number;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class Details{
    ItemName: string;
    Quantity: number;
    UnitPrice: number;
    Total: number;
}
