using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GetRid;
using GetRid.Controllers;
using GetRid.Models;
using GetRid.Providers;
using Newtonsoft.Json;

namespace GetRid.Tests.Controllers
{
    [TestClass]
    public class ProductsControllersTest
    {
            [TestMethod]
            public void Index()
            {
                // Arrange
                //ProductsController productsController = new ProductsController();

                GeoCoderProvider geoCoderProvider = new GeoCoderProvider();
                geoCoderProvider.addressToDbGeography("107 Thorndon Quay, Pipitea, Wellington 6011");

                
                //geoCoderProvider.
                // Act
                //ViewResult result = controller.Index() as ViewResult;
                //productsController.BlobStorage();
                // Assert
                //Assert.IsNotNull(result);
                //Assert.AreEqual("Home Page", result.ViewBag.Title);
            }
        }
    
}
