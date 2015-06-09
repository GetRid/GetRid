namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    using System.Data.Entity.Spatial;
    
    public partial class GeoCoords : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("gr.Products", "Location_Id", "gr.Locations");
            DropForeignKey("gr.AspNetUsers", "Location_Id", "gr.Locations");
            DropIndex("gr.Products", new[] { "Location_Id" });
            DropIndex("gr.AspNetUsers", new[] { "Location_Id" });
            AddColumn("gr.Products", "Location", c => c.Geography());
            AddColumn("gr.AspNetUsers", "Location", c => c.Geography());
            DropColumn("gr.Products", "Location_Id");
            DropColumn("gr.AspNetUsers", "Location_Id");
            DropTable("gr.Locations");
        }
        
        public override void Down()
        {
            CreateTable(
                "gr.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Suburb = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            AddColumn("gr.AspNetUsers", "Location_Id", c => c.Int());
            AddColumn("gr.Products", "Location_Id", c => c.Int());
            DropColumn("gr.AspNetUsers", "Location");
            DropColumn("gr.Products", "Location");
            CreateIndex("gr.AspNetUsers", "Location_Id");
            CreateIndex("gr.Products", "Location_Id");
            AddForeignKey("gr.AspNetUsers", "Location_Id", "gr.Locations", "Id");
            AddForeignKey("gr.Products", "Location_Id", "gr.Locations", "Id");
        }
    }
}
