namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ProductExperiment : DbMigration
    {
        public override void Up()
        {
            AddColumn("gr.Products", "Reserved", c => c.Boolean(nullable: false));
            DropColumn("gr.Products", "Status");
        }
        
        public override void Down()
        {
            AddColumn("gr.Products", "Status", c => c.Boolean(nullable: false));
            DropColumn("gr.Products", "Reserved");
        }
    }
}
