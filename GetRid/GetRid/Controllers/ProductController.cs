using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace GetRid.Controllers
{
    public class ProductController : ApiController
    {
        // GET: api/Product
        public IEnumerable<string> Get()
        {
            //get all products (JSON)
            return new string[] { "value1", "value2" };
        }

        // GET: api/Product/5
        public string Get(int id)
        {
            //get individual product by id
            return "value";
        }

        // POST: api/Product
        public void Post([FromBody]string value)
        {
            //creating a product
            //needs a User (id), product details (Name, Desc, Category, Location)
            //Status should be auto set to true to begin with
        }

        // PUT: api/Product/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Product/5
        public void Delete(int id)
        {
        }
    }
}
