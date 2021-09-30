export class DOSETUP{

_id:false;
  SNO: string;
  serialnumber: string;
  Quantity: number;
  //ye doni peche lene ha per table aik ha
  // LotNumber: any;
  AddInventoryStock: any; //ye aya lotnumber comment ker k peche se
  // Grade: any;
  AddGrade: any; //ye b bhhr se grade la data schema laya hu


  AssignedToAgent: any;
//or ye godown se import hoga
  Godown: any;

  Customer: any;
  stock: any;
  DODate: Date;
  // sir faraz bhai ne add kerwaye upper take pdf do ka sahe aye
  AgentDate: Date;

  //
  Validity: string;
  Denomation: any;
  Denomation2: any;
  Payble: any;
  Rao: any;
  Quantity2: number;
  Quantity3: number;
  Available: number;
  DOSETUPDETAILS: Array<DOSETUPDETAILS>;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}


export class DOSETUPDETAILS{
  AgentDate: Date;
  DODate: Date;
  Validity: string;
  Denomation: any;
  Denomation3: number;
  Quantity: number;
  Quantity2: number;
  // Quantity3: number;

  //24 september
  SNO: string;
  AddInventoryStock: any;
  Customer: any;


}
