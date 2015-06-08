using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GetRid;
using GetRid.Controllers;

namespace GetRid.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }

        [TestMethod]
        public void Blob()
        {
            // Arrange
            ProductsController productsController = new ProductsController();

            // Act
            //ViewResult result = controller.Index() as ViewResult;
            productsController.BlobStorage();
            // Assert
            //Assert.IsNotNull(result);
            //Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
