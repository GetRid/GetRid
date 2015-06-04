using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GetRid.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string CategoryType { get; set; }
        public virtual List<Product> Products { get; set; }
    }
}