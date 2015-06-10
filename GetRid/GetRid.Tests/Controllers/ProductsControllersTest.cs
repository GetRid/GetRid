using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Runtime.Remoting;
using System.Web.Http;
using System.Web.Http.Results;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using GetRid;
using GetRid.Controllers;
using GetRid.Models;
using GetRid.Providers;

using Newtonsoft.Json;
using NUnit.Framework;

using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace GetRid.Tests.Controllers

{
    [TestFixture]
    public class ProductControllerTests
    {
       [Test]
       public void GetProducts()
        {
           ProductsController productsController = new ProductsController();

           var ressult = productsController.GetProducts("-41.2966591", "174.7741981");


           var something = 2;
           //Arrange
           //ProductsController productsController = new ProductsController();
           //IQueryable<Product> expect;
           //var expect = new EnumerableQuery<Product>();
           //Act
           //IQueryable<Product> result = productsController.GetProducts("-41.2966591", "174.7741981");

           //Assert
           //NUnit.Framework.Assert.That(expect, Is.TypeOf(result.GetType()));
           //NUnit.Framework.Assert.That();
        }

    }
}
