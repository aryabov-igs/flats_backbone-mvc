﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.DB.Entities
{
    public class Entity
    {
        public int ID { get; set; }
        public DateTime Created { get; set; }
        public bool Deleted { get; set; }
    }
}
