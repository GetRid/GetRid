using System;
using System.Collections.Generic;
using System.Data.Entity.Spatial;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.UI.WebControls;
using GetRid.Models;
using Newtonsoft.Json;

namespace GetRid.Providers
{
    public class GeoCoderProvider
    {
        public DbGeography AddressToDbGeography(string address)
        {
            using (HttpClient client = new HttpClient())
            {
                client.BaseAddress = new Uri("https://maps.googleapis.com/maps/api/geocode/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                HttpResponseMessage response =
                    client.GetAsync("json?address=" + address + "&key=AIzaSyD1zK5yAfCbTztek6TfZwP4XJkTeEfVj1k").Result;

                if (response.IsSuccessStatusCode)
                {
                    string content = response.Content.ReadAsStringAsync().Result;

                    GoogleGeocodedAddressProvider.RootObject rootObject = new GoogleGeocodedAddressProvider.RootObject();
                    JsonConvert.PopulateObject(content, rootObject);

                    var geoCoords = DbGeography.FromText(string.Format("POINT({0} {1})", rootObject.results[0].geometry.location.lng, rootObject.results[0].geometry.location.lat));

                    return geoCoords;
                }
            }
            throw new Exception("address not working");
        }
    }
}