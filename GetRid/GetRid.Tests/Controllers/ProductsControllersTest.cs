using System;
using System.Collections.Generic;
using GetRid.Controllers;
using GetRid.Models;
using NUnit.Framework;

namespace GetRid.Tests.Controllers

{
    [TestFixture]
    public class ProductControllerTests
    {
       [Test]
       public void AssertThatDatabaseIsNotNull()
        {
           //Arrange
           ProductsController productsController = new ProductsController();

           //Act
           var result = productsController.GetProducts("-41.2966591", "174.7741981");

           //Assert
           Assert.That(result, Is.Not.Null);
        }

       public void AssertThatDatabaseIsReturningTypeOfProductDto()
       {
           //Arrange
           ProductsController productsController = new ProductsController();

           //Act
           var result = productsController.GetProducts("-41.2966591", "174.7741981");

           //Assert
            Assert.That(result, Is.TypeOf(typeof(List<ProductDTO>)));

       }

       public void AssertThatDatabaseIsReturningSpecificProduct()
       {
           //Arrange
           ProductsController productsController = new ProductsController();
           
           //Act
           //var result = productsController.GetProduct();
           
           //Assert
           //Assert.That(result, Is.TypeOf(typeof(List<ProductDTO>)));

       }

    }
}
