namespace GetRid.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "gr.Products",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(nullable: false),
                        Description = c.String(nullable: false),
                        Reserved = c.Boolean(nullable: false),
                        Category = c.String(nullable: false),
                        ImageURL = c.String(),
                        Location_Id = c.Int(),
                        User_Id = c.String(maxLength: 128),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("gr.Locations", t => t.Location_Id)
                .ForeignKey("gr.AspNetUsers", t => t.User_Id)
                .Index(t => t.Location_Id)
                .Index(t => t.User_Id);
            
            CreateTable(
                "gr.Locations",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Suburb = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "gr.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                        Location_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("gr.Locations", t => t.Location_Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex")
                .Index(t => t.Location_Id);
            
            CreateTable(
                "gr.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("gr.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "gr.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("gr.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "gr.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("gr.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("gr.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "gr.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
        }
        
        public override void Down()
        {
            DropForeignKey("gr.AspNetUserRoles", "RoleId", "gr.AspNetRoles");
            DropForeignKey("gr.AspNetUserRoles", "UserId", "gr.AspNetUsers");
            DropForeignKey("gr.Products", "User_Id", "gr.AspNetUsers");
            DropForeignKey("gr.AspNetUserLogins", "UserId", "gr.AspNetUsers");
            DropForeignKey("gr.AspNetUsers", "Location_Id", "gr.Locations");
            DropForeignKey("gr.AspNetUserClaims", "UserId", "gr.AspNetUsers");
            DropForeignKey("gr.Products", "Location_Id", "gr.Locations");
            DropIndex("gr.AspNetRoles", "RoleNameIndex");
            DropIndex("gr.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("gr.AspNetUserRoles", new[] { "UserId" });
            DropIndex("gr.AspNetUserLogins", new[] { "UserId" });
            DropIndex("gr.AspNetUserClaims", new[] { "UserId" });
            DropIndex("gr.AspNetUsers", new[] { "Location_Id" });
            DropIndex("gr.AspNetUsers", "UserNameIndex");
            DropIndex("gr.Products", new[] { "User_Id" });
            DropIndex("gr.Products", new[] { "Location_Id" });
            DropTable("gr.AspNetRoles");
            DropTable("gr.AspNetUserRoles");
            DropTable("gr.AspNetUserLogins");
            DropTable("gr.AspNetUserClaims");
            DropTable("gr.AspNetUsers");
            DropTable("gr.Locations");
            DropTable("gr.Products");
        }
    }
}
