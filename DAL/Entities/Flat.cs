﻿using System.Collections.Generic;

namespace DAL.Entities
{
    public class Flat: Entity
    {
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Rooms { get; set; }
        public int Sleeper { get; set; }
        public string MainImg { get; set; }
        public string Address { get; set; }

        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<FlatBusyDate> FlatBusyDates { get; set; }
    }
}
