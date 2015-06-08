using System;
using System.Collections.Generic;
using System.Configuration;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;

namespace GetRid.Models
{
    public class BlobStorage
    {
        public string BlobingTheStorage(string imageString)
        {
            string connectionSting = ConfigurationManager.ConnectionStrings["AzureStorageAccount"].ConnectionString;
            
            string destContainer = ConfigurationManager.AppSettings["destContainer"];

            CloudStorageAccount account = CloudStorageAccount.Parse(connectionSting);
            CloudBlobClient client = account.CreateCloudBlobClient();

            CloudBlobContainer container = client.GetContainerReference(destContainer);

            string key = DateTime.UtcNow.ToString("yyyy MMMM dd-HH:mm:ss");

                CloudBlockBlob blockBlob = container.GetBlockBlobReference(key);

            blockBlob.UploadText(imageString);

            //byte[] image = Convert.FromBase64String(imageString);
          

            //Image test = byteArrayToImage(image);

            //b.UploadFromFile(test);
       
            //MemoryStream stream = new MemoryStream(test);

            //b.UploadFromStream(stream);

            //using (var streaming = byteArrayToImage(image))
            //{
            //    b.UploadFromStream(streaming);
            //}

            //    using (var streaming = new MemoryStream(test, writable: false))
            //    {
            //        b.UploadFromStream(streaming);
            //    }
            //
           
            //    b.UploadFromStream(imageFile);
           

            //b.UploadFromStreamAsync(test);
            
            //using(var stream = new MemoryStream(image, writable: false)) {
            //    b.UploadFromStream(stream);
            //}
            //using (var ms = new MemoryStream(image))
            //{
            //    var imagetest = Image.FromStream(ms);

            //    b.UploadFromStream(imagetest.Save(System.Drawing.Imaging.ImageFormat.Png));
            //}


            //byte[] data = Convert.FromBase64String(imageString);
            //using (var stream2 = new MemoryStream(data, 0, data.Length))
            //{
            //    Image image64 = Image.FromStream(stream2);
            //    b.UploadFromStream(image64);

            //    using (var streaming = new MemoryStream(image64, writable: false))
            //    {
            //        b.UploadFromStream(streaming);
            //    }
            //}
                
            //    b.UploadFromStream(image, long);
            //b.UploadFromByteArrayAsync(b.UploadFromFileAsync(image));
                //b.UploadFromFile(image);
            //File.ReadAllBytes(imageString);
            //using (var fs = System.IO.File.Open(image, FileMode.Open, FileAccess.Read, FileShare.None))
            //{
            //    b.UploadFromStream(fs);
            //}


                //b.UploadFromStream(image, );
                //b.UploadText(imageString);

                return blockBlob.SnapshotQualifiedStorageUri.PrimaryUri.ToString();
            
        }

        public Image byteArrayToImage(byte[] imageArray)
        {
            MemoryStream ms = new MemoryStream(imageArray);
            Image returnImage = Image.FromStream(ms);
            return returnImage;
        }

        //public string RetrieveImages()
        //{
        //    // Retrieve storage account from connection string.
        //    CloudStorageAccount storageAccount = CloudStorageAccount.Parse(
        //        CloudConfigurationManager.GetSetting("StorageConnectionString"));

        //    // Create the blob client.
        //    CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

        //    // Retrieve reference to a previously created container.
        //    CloudBlobContainer container = blobClient.GetContainerReference("mycontainer");

        //    // Retrieve reference to a blob named "photo1.jpg".
        //    CloudBlockBlob blockBlob = container.GetBlockBlobReference("photo1.jpg");

        //    // Save blob contents to a file.
        //    using (var fileStream = System.IO.File.OpenWrite(@"path\myfile"))
        //    {
        //        blockBlob.DownloadToStream(fileStream);
        //    }
        //}

    }
}