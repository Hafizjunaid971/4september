export class Expense{
    Expense: string;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}

export class ExpenseInvoice{
    Date: Date;
    InvoiceNumber: string;
    Particulars: string;
    Amount: number;
    DebitCredit: string;
    ExpenseType: string;
    CreatedBy: string;
    CreatedDate: Date;
    ModifiedBy: string;
    ModifiedDate: Date;
}