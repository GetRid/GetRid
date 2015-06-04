using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetRid.Models
{
    public class Location
    {
        public int Id { get; set; }
        public string Suburb { get; set; }
        public virtual List<Product> Products { get; set; }
        public virtual List<ApplicationUser> Users { get; set; }
        //dbGeography?
    }
}