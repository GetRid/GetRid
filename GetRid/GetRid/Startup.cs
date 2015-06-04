using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(GetRid.Startup))]
namespace GetRid
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
