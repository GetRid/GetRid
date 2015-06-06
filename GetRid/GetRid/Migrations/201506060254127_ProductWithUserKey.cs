namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductWithUserKey : DbMigration
    {
        public override void Up()
        {
            RenameColumn(table: "dbo.Products", name: "ApplicationUser_Id", newName: "User_Id");
            RenameIndex(table: "dbo.Products", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
        }
        
        public override void Down()
        {
            RenameIndex(table: "dbo.Products", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            RenameColumn(table: "dbo.Products", name: "User_Id", newName: "ApplicationUser_Id");
        }
    }
}
