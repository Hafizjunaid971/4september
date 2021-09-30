export class User {
  // CreatedDate: string;
  // Email: string;
  // Name: string;
  // Status: boolean;
  // UserId: string;

  UserId: string;
  Name: string;
  Email: string;
  IsActive: boolean = true;
  Password: string;
  UserRights: any;
  AgentType: string;
  CreatedBy: string;
  CreatedDate: Date;
  ModifiedBy: string;
  ModifiedDate: Date;
}
