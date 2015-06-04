using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Web.Http;

namespace GetRid
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            //Converting XML to JSON by default - http://stackoverflow.com/questions/9847564/how-do-i-get-asp-net-web-api-to-return-json-instead-of-xml-using-chrome
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            // Web API configuration and services

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
