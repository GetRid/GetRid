using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace GetRid.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public bool Reserved { get; set; }
        //[Key]
        //[ForeignKey("Id")]
        //[Required]
        public virtual ApplicationUser User { get; set; }
        public virtual Category Category { get; set; }
        public virtual Location Location { get; set; }
    }
}