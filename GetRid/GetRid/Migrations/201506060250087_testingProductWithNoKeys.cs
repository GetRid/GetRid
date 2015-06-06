namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class testingProductWithNoKeys : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Products", "Category_Id", "dbo.Categories");
            DropIndex("dbo.Products", new[] { "Category_Id" });
            RenameColumn(table: "dbo.Products", name: "User_Id", newName: "ApplicationUser_Id");
            RenameIndex(table: "dbo.Products", name: "IX_User_Id", newName: "IX_ApplicationUser_Id");
            DropColumn("dbo.Products", "Category_Id");
            DropTable("dbo.Categories");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CategoryType = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("dbo.Products", "Category_Id", c => c.Int());
            RenameIndex(table: "dbo.Products", name: "IX_ApplicationUser_Id", newName: "IX_User_Id");
            RenameColumn(table: "dbo.Products", name: "ApplicationUser_Id", newName: "User_Id");
            CreateIndex("dbo.Products", "Category_Id");
            AddForeignKey("dbo.Products", "Category_Id", "dbo.Categories", "Id");
        }
    }
}
