using System.Data.Entity;
using System.Data.Entity.Spatial;
using GetRid.Controllers;
using GetRid.Models;
using GetRid.Providers;
using Moq;
using NUnit.Framework;

namespace GetRid.Tests.Providers
{
    [TestFixture]
    public class GeoCoderProviderTest
    {
        [Test]
        public void AssertThatGoogleGeoCoordinatesIsWorking()
        {   
            //Arrange
            GeoCoderProvider geoCoderProvider = new GeoCoderProvider();
            var expect = DbGeography.FromText("POINT(174.7741981 -41.2966591)"); 
            
            //Act
            DbGeography latLong = geoCoderProvider.AddressToDbGeography("275 Cuba St Te Aro, Wellington 6011");

            //Assert
            Assert.That(expect.Latitude, Is.EqualTo(latLong.Latitude).Within(0.0005));
            Assert.That(expect.Longitude, Is.EqualTo(latLong.Longitude).Within(0.0005));
        }
    }
}
