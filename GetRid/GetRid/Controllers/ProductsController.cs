using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Data.Entity.Spatial;
using System.Device.Location;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using AutoMapper;
using GetRid.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;


namespace GetRid.Controllers
{

    public class ProductsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Products
        public List<ProductDTO> GetProducts(string latitude, string longitude, string category = "All",
            int radius = 10000)
        {
            var geoCoords = DbGeography.FromText(string.Format("POINT({0} {1})", longitude, latitude), 4326);
            Mapper.CreateMap<Product, ProductDTO>();
            var productDTOs = new List<ProductDTO>();
            if (category == "All")
            {
                var productsList = db.Products.Where(x => geoCoords.Distance(x.Location) < radius).Where(x => x.Reserved == false).ToList();

                foreach (var product in productsList)
                {
                    ProductDTO dto = Mapper.Map<ProductDTO>(product);

                    GeoCoordinate locA = new GeoCoordinate((double) product.Location.Latitude,
                        (double) product.Location.Longitude);
                    var locB = new GeoCoordinate((double) geoCoords.Latitude, (double) geoCoords.Longitude);
                    double distance = locA.GetDistanceTo(locB); // metres
                    var distanceRound = Math.Round(distance) / 1000;
                    dto.DistanceToUser = distanceRound.ToString() + " km";
                    productDTOs.Add(dto);
                }

                return productDTOs;
            }

            var productsListElse = db.Products.Where(x => geoCoords.Distance(x.Location) < radius)
                .Where(x => x.Reserved == false)
                .Where(x => x.Category == category).ToList();

            foreach (var product in productsListElse)
            {
                ProductDTO dto = Mapper.Map<ProductDTO>(product);

                GeoCoordinate locA = new GeoCoordinate((double) product.Location.Latitude,
                    (double) product.Location.Longitude);
                var locB = new GeoCoordinate((double) geoCoords.Latitude, (double) geoCoords.Longitude);
                double distance = locA.GetDistanceTo(locB); // metres
                var distanceRound = Math.Round(distance)/1000;
                dto.DistanceToUser = distanceRound.ToString() + " km";
                productDTOs.Add(dto);
            }
            return productDTOs;
        }
    

    // GET: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult GetProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        // PUT: api/Products/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProduct(int id, Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != product.Id)
            {
                return BadRequest();
            }

            //db.Entry(product).State = EntityState.Modified;
            var updateProduct = db.Products.Find(id);
            updateProduct.Reserved = product.Reserved;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Products
        [ResponseType(typeof(Product))]
        public IHttpActionResult PostProduct(Product product)
        {
            //BlobStorage blobStorage = new BlobStorage();
            if (User.Identity.IsAuthenticated)
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var id = HttpContext.Current.User.Identity.GetUserId();
                var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));

                var user = manager.FindById(id);
                product.User = user;
                product.Location = user.Location;
                //var blobURL = blobStorage.BlobingTheStorage(product.ImageURL);
                //product.ImageURL = blobURL;

                db.Products.Add(product);
                db.SaveChanges();
                return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
            }

            return InternalServerError();
        }

        //// POST: api/Products/id
        //[ResponseType(typeof(Product))]
        //public IHttpActionResult PostReserved(int id)
        //{
        //    if (User.Identity.IsAuthenticated)
        //    {
        //        if (!ModelState.IsValid)
        //        {
        //            return BadRequest(ModelState);
        //        }
        //        //product.User


        //        var id = HttpContext.Current.User.Identity.GetUserId();
        //        var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));

        //        product.User = manager.FindById(id);


        //        db.Products.Add(product);
        //        db.SaveChanges();
        //        return CreatedAtRoute("DefaultApi", new { id = product.Id }, product);
        //    }

        //    return InternalServerError();
        //}

        // DELETE: api/Products/5
        [ResponseType(typeof(Product))]
        public IHttpActionResult DeleteProduct(int id)
        {
            Product product = db.Products.Find(id);
            if (product == null)
            {
                return NotFound();
            }

            db.Products.Remove(product);
            db.SaveChanges();

            return Ok(product);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProductExists(int id)
        {
            return db.Products.Count(e => e.Id == id) > 0;
        }

    }
}