$(document).ready(function() {

// $("#logo-hide").click(function(){
//   $('.logo-long').hide().show("slow");
// });

  var token = sessionStorage.getItem("getRidLoginToken");
  var headers = {};
  var currentUserPosition;
  var productImage;

  function appViewModel() {
    var self = this;

    self.itemData = ko.observable();

    // VIEWS
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);
    self.showSuccessfulGetRid = ko.observable(false);
    self.showSplashScreen = ko.observable(false);
    self.showMakeContact = ko.observable(false);
    self.showRadiusSelectorMap = ko.observable(false);

    // SIGN IN bindings
    self.UserName = ko.observable();
    self.Password = ko.observable();
    self.Email = ko.observable();
    self.Address = ko.observable();

    // GET RID bindings
    self.Name = ko.observable();
    self.Description = ko.observable();
    self.Category = ko.observable();
    self.ImageURL = ko.observable();
    self.Id = ko.observable();
    self.selectedCategory = ko.observable();

    // Radius Selector binding, 1000m by default
    self.searchRadius = ko.observable("10000");
    self.tempRadius = ko.observable(self.searchRadius());

    self.displays = [{label : "All"},
                     {label : "Category"},
                     {label : "Search Location"},
                     {label : "Get Rid"},
                    ];


    // Display Data bindings
    self.chosenDisplayId = ko.observable();
    self.chosenDisplayData = ko.observable();
    self.chosenIndividualData = ko.observable();
    self.chosenIndividualDetails = ko.observable();
    self.makeContactData = ko.observable();

    self.imageDisplay = ko.computed(function(){
      //check what the image type is (jpeg vs png)
      //check the url type http vs data base64
      //check self.itemData.ImageURL is defined
      if (self.chosenIndividualData() == undefined || self.chosenIndividualData().ImageURL == undefined) {return '';}
        return "data:image/jpeg;base64," + self.chosenIndividualData().ImageURL;
    });

    self.imageDetailsDisplay = ko.computed(function(){
      if (self.chosenIndividualDetails() == undefined || self.chosenIndividualDetails().ImageURL == undefined) {return '';}
        return "data:image/jpeg;base64," + self.chosenIndividualDetails().ImageURL;
    });

    self.imageContactDisplay = ko.computed(function(){
      if (self.makeContactData() == undefined || self.makeContactData().ImageURL == undefined) {return '';}
        return "data:image/jpeg;base64," + self.makeContactData().ImageURL;
    });

    self.getRidData = ko.observable();

    //Behaviours
    self.clearViews = function() {
      self.showSignInSignUpForm(false);
      self.showGetRidForm(false);
      self.showNavBar(false);
      self.showSuccessfulGetRid(false);
      self.showSplashScreen(false);
      self.showMakeContact(false);
      self.showRadiusSelectorMap(false);

      self.chosenDisplayId(null);
      self.chosenDisplayData(null);
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);
      self.makeContactData(null);
      self.getRidData(null);
    }

    self.signIn = function(display) {
      //self.showSplashScreen(false);
      self.clearViews();
      self.showSignInSignUpForm(true);
    }

    self.signUp = function(display) {
      //self.showSplashScreen(false);
      self.clearViews();
      self.showSignInSignUpForm(true);
    }

    self.handleSignIn = function(formElement) {
      var data = $.param({
          grant_type: 'password',
          username: self.UserName,
          Password: self.Password
        });

      $.ajax({
        type: 'POST',
        url: 'http://getridapi.azurewebsites.net/token',
        data: data
      })
      .done(function(result) {
        console.log("sign in successful.")
        sessionStorage.setItem("getRidLoginToken", result.access_token);
        headers.Authorization = 'Bearer ' + result.access_token;
        //self.showSignInSignUpForm(false);
        self.clearViews();
        self.showNavBar(true);
        self.goToDisplay("All");
      })
      .fail(function(result) {
          console.log("sign in failed.", result);
      });
    }

    self.handleGetRid = function(formElement) {
      $.ajax("http://getridapi.azurewebsites.net/api/products", {
            data: ko.toJSON({
              Name: self.Name,
              Description: self.Description,
              Category: self.Category,
              ImageURL: productImage
            }),
            type: "post",
            headers: headers,
            contentType: "application/json"
        })
        .done(function(result) {
          alert('post successful');
          console.log("Add product successful.. ", result);
          self.clearViews();
          self.showNavBar(true);
          self.showSuccessfulGetRid(true);
        })
        .fail(function(result) {
          alert('post failed:' + result);
            console.log("Add Product FAILED", result);
        });
    }

    self.takePhoto = function(formElement) {
      navigator.camera.getPicture(onSuccess, onFail, {
        quality : 80,
        destinationType : Camera.DestinationType.DATA_URL,
        sourceType : Camera.PictureSourceType.CAMERA,
        allowEdit : true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 200,
        targetHeight: 200,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: true
      });

      function onSuccess(imageData) {
        productImage = imageData;
        //$.post( "/", {data: imageData}, function(data) {
        //  alert("Image uploaded!");
        //});
      }

      function onFail(message) {
          alert('Failed because: ' + message);
      }
    }

    self.handleSignUp = function(formElement) {
        $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
            data: ko.toJSON({
              UserName: self.UserName,
              Address: self.Address,
              Password: self.Password,
              Email: self.Email,
              ConfirmPassword: self.Password
            }),
            type: "post",
            contentType: "application/json"
        })
        .done(function(result) {
          var data = $.param({
              grant_type: 'password',
              username: self.UserName,
              Password: self.Password
            });
          console.log("REGISTRATION REQUEST DONE: ", data);

          $.ajax({
            type: 'POST',
            url: 'http://getridapi.azurewebsites.net/token',
            data: data
          })
          .done(function(result) {
            console.log("TOKEN REQUEST DONE: ", result);
            //self.username(data.UserName)
            sessionStorage.setItem("getRidLoginToken", result.access_token)
          })
          .fail(function(result) {
            console.log("TOKEN REQUEST FAILED ", result);
          })
        })
        .fail(function(result) {
            console.log("REGISTRATION REQUEST FAILED", result);
        });
    }

    self.handleLogout = function() {
      console.log("logging out..");
      sessionStorage.removeItem("getRidLoginToken");
      self.clearViews();
      self.showNavBar(true);
      self.showSplashScreen(true);
    }

    self.browseNearYou = function(display) {
      //self.showSplashScreen(false);
      self.clearViews();
      self.showNavBar(true);
      self.goToDisplay(display);
    }

    self.selectRadius = function() {
      // self.showSignInSignUpForm(false);
      // self.showGetRidForm(false);
      // self.showSuccessfulGetRid(false);
      // self.showSplashScreen(false);
      // self.showMakeContact(false);
      // self.chosenDisplayId(null)
      // self.chosenIndividualData(null);
      // self.chosenIndividualDetails(null);
      // self.chosenDisplayData(null);
      self.clearViews();

      self.showNavBar(true);
      self.showRadiusSelectorMap(true);

      // Provide your access token
      L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
      // Create a map in the div #map
      var map = L.mapbox.map('map', 'envintage.i9eofp14');

      var featureGroup = L.featureGroup().addTo(map);
      // map.addLayer(featureGroup);

      //set the helper text when drawing circle begins
      L.drawLocal.draw.handlers.circle.tooltip.start = 'Pinch and drag to set your search radius';
      L.drawLocal.draw.handlers.simpleshape.tooltip.end = 'Release to finish drawing'

      var drawControl = new L.Control.Draw({
        position: "topleft",
        draw: {
          polyline: false,
          polygon: false,
          rectangle: false,
          marker: false
        }
        // edit: {
        //   featureGroup: featureGroup
        // }
      }).addTo(map);

      map.on('draw:drawstart', function(e) {
        $('#radius-display').removeClass('panel-success').addClass('panel-default');
        $('#radius-meters').html('');
        featureGroup.clearLayers();
      });

      map.on('draw:created', function(e) {
        console.log(e.layer._mRadius);
        $('#radius-display').removeClass('panel-default').addClass('panel-success');
        $('#radius-meters').html(Math.round(e.layer._mRadius) + " meters");
        //assign e.layer._mRadius to global data-bound variable
        self.tempRadius(e.layer._mRadius);
        featureGroup.addLayer(e.layer);
      });
    }

    self.confirmRadius = function() {
      self.clearViews();
      self.searchRadius(self.tempRadius());
      self.showNavBar(true);
      self.goToDisplay();
    }

    self.filterByCategory = function(searchCategory){
      // self.itemData(ko.utils.arrayFilter(self.itemData(), function(item){
      //   return item.Category == searchCategory
      // }))
      self.clearViews();
      console.log(searchCategory);
      self.selectedCategory(searchCategory);
      self.showNavBar(true);
      self.goToDisplay();
    }

    self.goToDisplay = function(display) {

      // onSuccess Callback
      // This method accepts a Position object, which contains the
      // current GPS coordinates
      //
      var onSuccess = function(position) {
          alert('Latitude: '          + position.coords.latitude          + '\n' +
                'Longitude: '         + position.coords.longitude         + '\n' +
                'Altitude: '          + position.coords.altitude          + '\n' +
                'Accuracy: '          + position.coords.accuracy          + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                'Heading: '           + position.coords.heading           + '\n' +
                'Speed: '             + position.coords.speed             + '\n' +
                'Timestamp: '         + position.timestamp                + '\n');
          currentUserPosition = position;

          // Commented out for browser testing
          // self.chosenDisplayId(display);
          // self.chosenIndividualData(null);
          // self.chosenIndividualDetails(null);
          // self.makeContactData(null);

          // $.getJSON('http://getridapi.azurewebsites.net/api/products',  {
          //     latitude: currentUserPosition.coords.latitude,
          //     longitude: currentUserPosition.coords.longitude,
          //     category: self.selectedCategory(),
          //    radius: self.searchRadius()
          //   },
          //   function(data) {
          //     self.itemData(data);
          //     self.chosenDisplayData(self.itemData());
          //     self.goToItem(self.itemData()[0]);
          // });
          // console.log("dsgsdgg")
      };

      // onError Callback receives a PositionError object

      function onError(error) {
          alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
      }

      // Commented out for browser testing
      // navigator.geolocation.getCurrentPosition(onSuccess, onError);

      self.clearViews();
      self.showNavBar(true);
      self.chosenDisplayId(display);
      // self.chosenIndividualData(null);
      // self.chosenIndividualDetails(null);
      // self.makeContactData(null);
      // self.showRadiusSelectorMap(false);

///////////////////////////////////
      $.getJSON('http://getridapi.azurewebsites.net/api/products',  {
          latitude: "-41.279576",
          longitude: "174.776066",
          category: self.selectedCategory(),
          radius: self.searchRadius()
        },
        function(data) {
          self.itemData(data);
          self.chosenDisplayData(self.itemData());
          console.log(self.itemData())
          self.goToItem(self.itemData()[0]);
      });

      ///////////////////////////////////////////////////
    }

    self.trash = function() {
      self.itemData().shift();
      if (self.itemData().length > 0) {
        self.goToItem(self.itemData()[0]);
      }
      else {
        // no more items to trash
      }
    }

    self.treasure = function() {
      self.goToDetails(self.itemData()[0]);
    }

    self.goToItem = function(item) {
      self.chosenDisplayId(item.display);
      //self.chosenDisplayData(null);
      self.chosenIndividualData(item);
    }

    self.goToDetails = function(item) {
      self.chosenIndividualData(null);
      //self.clearViews();
      self.chosenIndividualDetails(item);
    }

    self.getButtonHandler = function() {
      self.makeContact(itemData()[0]);
    }

    self.makeContact = function(item) {
      //self.chosenIndividualDetails(null);

      if (sessionStorage.getItem("getRidLoginToken")) {
        self.makeContactData(item);

        $.ajax("http://getridapi.azurewebsites.net/api/products/" + item.Id,
          {
              data: ko.toJSON({
                Name: item.Name,
                Description: item.Description,
                Category: item.Category,
                Reserved: 'true',
                Id: item.Id
              }),
              type: "put",
              headers: headers,
              contentType: "application/json"
          })
          .done(function(result) {
            console.log("Update successful.. ", result);
            self.clearViews();
            self.showNavBar(true);
            self.showMakeContact(true);
            console.log(item);
          })
          .fail(function(result) {
            alert('Update failed:' + result);
              console.log("Update FAILED", result);
          });
      } else {
        self.clearViews();
        self.showSignInSignUpForm(true);
      }

    }

    self.goToGetRid = function() {
      // self.chosenDisplayId(null)
      // self.chosenIndividualData(null);
      // self.chosenIndividualDetails(null);
      // self.chosenDisplayData(null);
      // self.getRidData();
      // self.showSplashScreen(false);

      if (sessionStorage.getItem("getRidLoginToken")) {
        self.clearViews();
        self.showNavBar(true);
        self.showGetRidForm(true);
      } else {
        self.clearViews();
        self.showSignInSignUpForm(true);
      }
    }


    if (token) {
      self.clearViews(true);
      headers.Authorization = 'Bearer ' + token;
      self.browseNearYou("All");
    }
    else {
      self.clearViews(true);
      self.showSplashScreen(true);
    }

    // Hammer JS
    imageSwipe = document.getElementById('imageSwipe');
    swipeEvent = new Hammer(imageSwipe);
    swipeEvent.add( new Hammer.Pan({threshold: 100}))

     swipeEvent.on("panleft panright", function(e){
      if (e.type == "panleft") {
        self.trash();
      } else if (e.type == "panright") {
        self.treasure();
      }
    });

  }; //End of appViewModel
  ko.applyBindings(new appViewModel());


}); //End of doc ready
