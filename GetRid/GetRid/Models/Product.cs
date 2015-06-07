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
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        public bool Reserved { get; set; }
        public virtual ApplicationUser User { get; set; }
        [Required]
        public virtual string Category { get; set; }
        public virtual Location Location { get; set; }
    }
}