import { PriceListDetails } from 'src/app/_models/price-list';

export class VendorLedger{
    Date: Date;
    InvoiceNumber: string;
    Particulars: string;

    GrossTotal: any;
    LotNumber: string;
    QuantityGodown:string

  Vendor: string;
  Product: string;
  Code: string;
    Details: Array<Details>;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class Details{
  PriceList: string;

  Product: string;
  PriceListDetails: string;
  //ye mene add kye ha
  GodownSetup: string;
  Code: string;
  GDName: string;
  //9th auguyst ko
    ItemName: string;
    Quantity: number;
    UnitPrice: number;
    Total: number;
}
