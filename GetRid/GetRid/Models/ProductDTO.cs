using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Web;

namespace GetRid.Models
{
    public class ProductDTO
    {

        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Reserved { get; set; }
        public virtual ApplicationUser User { get; set; }
        public virtual string Category { get; set; }
        public virtual DbGeography Location { get; set; }
        public string ImageURL { get; set; }
        public string DistanceToUser { get; set; }
    }
}