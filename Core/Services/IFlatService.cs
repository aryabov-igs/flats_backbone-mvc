﻿using System.Collections.Generic;
using System.Security.Cryptography.X509Certificates;
using Core.Models;

namespace Core.Services
{
    public interface IFlatService
    {
        void Add(AddFlatModel flat);

        IEnumerable<FlatPreviewModel> GetAll();

        FlatViewModel Get(int id);

        string Update(AddFlatModelTemp flat);
    }
}