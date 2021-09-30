export class PriceList{
  Name: string;
  

    PriceListDetails: Array<PriceListDetails>;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
  ModifiedDate: Date;

}

export class PriceListDetails{
    Code: string;
  Category: string;
  LotNumber: string;
    // Variety: string;
    // Size: string;
    // Packing: string;
    // TP: string;
    // UnitPrice: string;
}

