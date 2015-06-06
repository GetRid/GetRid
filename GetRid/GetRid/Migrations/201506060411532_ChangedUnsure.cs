namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangedUnsure : DbMigration
    {
        public override void Up()
        {
            MoveTable(name: "dbo.Products", newSchema: "gr");
            MoveTable(name: "dbo.Categories", newSchema: "gr");
            MoveTable(name: "dbo.Locations", newSchema: "gr");
            MoveTable(name: "dbo.AspNetUsers", newSchema: "gr");
            MoveTable(name: "dbo.AspNetUserClaims", newSchema: "gr");
            MoveTable(name: "dbo.AspNetUserLogins", newSchema: "gr");
            MoveTable(name: "dbo.AspNetUserRoles", newSchema: "gr");
            MoveTable(name: "dbo.AspNetRoles", newSchema: "gr");
        }
        
        public override void Down()
        {
            MoveTable(name: "gr.AspNetRoles", newSchema: "dbo");
            MoveTable(name: "gr.AspNetUserRoles", newSchema: "dbo");
            MoveTable(name: "gr.AspNetUserLogins", newSchema: "dbo");
            MoveTable(name: "gr.AspNetUserClaims", newSchema: "dbo");
            MoveTable(name: "gr.AspNetUsers", newSchema: "dbo");
            MoveTable(name: "gr.Locations", newSchema: "dbo");
            MoveTable(name: "gr.Categories", newSchema: "dbo");
            MoveTable(name: "gr.Products", newSchema: "dbo");
        }
    }
}
