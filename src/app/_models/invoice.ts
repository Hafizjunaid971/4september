import { Customer } from './customer';
import { ProductDetails } from './product';

export class Invoice {
    InvoiceNumber: string;
    InvoiceDate: string;
    Particulars: string;
    Company: any;
    ProductDetails: Array<ProductDetails>;
    ProductInventoryList: Array<ProductInventory>;
    TotalPayment: number;
    Discount: number;
    DiscountAmount: number;
    NetAmount: number;
    PaymentDone: number;
    PaymentDue: number;
    Remarks: string;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
    IsInvoiceFullyPaid: boolean;
}

export class ProductInventory {
    Product: any = [];
    Code: any = [];
    Category: any = [];
    Variety: any = [];
    Size: any = [];
    UnitPrice: number;
    InInventory: number;
    NoOfUnits: number;
    Total: number;
    _id: string;

}