using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace GetRid.Models
{
    public class BlobStorage
    {
        public string BlobingTheStorage(string imageString)
        {
            string connectionSting = ConfigurationManager.ConnectionStrings["AzureStorageAccount"].ConnectionString;
            //string localFolder = ConfigurationManager.AppSettings["sourceFolder"];
            string destContainer = ConfigurationManager.AppSettings["destContainer"];

            CloudStorageAccount account = CloudStorageAccount.Parse(connectionSting);
            CloudBlobClient client = account.CreateCloudBlobClient();

            CloudBlobContainer container = client.GetContainerReference(destContainer);

            //string[] fileEntries = Directory.GetFiles(Image);
            //foreach (string filePath in fileEntries)
            //{
            string key = DateTime.UtcNow.ToString("yyyy MMMM dd-HH:mm:ss");// + "-" + Path.GetFileName(Image);

                //UploadBlob(container, key, imageString);
            //}
                CloudBlockBlob b = container.GetBlockBlobReference(key);

                b.UploadText(imageString);

                return b.SnapshotQualifiedStorageUri.PrimaryUri.ToString();
            
        }
    }
}