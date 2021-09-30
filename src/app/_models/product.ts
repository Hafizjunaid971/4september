export class Product{
    Name: string;
  Particulars: string;

    ProductDetails: Array<ProductDetails>;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class ProductDetails{
    Code: string;
  Category: string;
  Quantity: string;
  LotNumber: string;
  GodownName: string;
    // Variety: string;
    // Size: string;
    // Packing: string;
    // TP: string;
    // PieceInBox: string;
    // UnitPrice: string;
    // BoxPrice: string;
    // InInventory: string;
    // AddInventory: string;
    // Total: string;
    // NoOfUnits: string;
}

