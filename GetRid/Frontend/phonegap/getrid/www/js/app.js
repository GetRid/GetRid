$(document).ready(function() {

  var token = sessionStorage.getItem("getRidLoginToken");
  var headers = {};

  function appViewModel() {
    var self = this;

    self.itemData = ko.observable();

    // VIEWS
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);
    self.showSuccessfulGetRid = ko.observable(false);
    self.showSplashScreen = ko.observable(false);

    // SIGN IN bindings
    self.UserName = ko.observable();
    self.Password = ko.observable();

    // GET RID bindings
    self.Name = ko.observable();
    self.Description = ko.observable();
    self.Category = ko.observable();

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
    self.makeContact = ko.observable();
    self.getRidData = ko.observable();


    //Behaviours
    self.signIn = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.signUp = function(display) {
      self.showSplashScreen(false);
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
        self.showSignInSignUpForm(false);
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
              Category: self.Category
            }),
            type: "post",
            headers: headers,
            contentType: "application/json"
        })
        .done(function(result) {
          console.log("Add product successful.. ", result);
          self.showSuccessfulGetRid(true);
        })
        .fail(function(result) {
            console.log("Add Product FAILED", result);
        });
    }

    self.handleSignUp = function(formElement) {
        $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
            data: ko.toJSON({
              UserName: self.UserName,
              Email: "dummy30@email.com",
              Suburb: "Mt. Vic",
              Password: self.Password,
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
      self.showSplashScreen(true);
    }

    self.browseNearYou = function(display) {
      self.showSplashScreen(false);
      self.showNavBar(true);
      self.goToDisplay(display);
    }

    self.goToDisplay = function(display) {
      self.chosenDisplayId(display);
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);

      $.getJSON('http://getridapi.azurewebsites.net/api/products', function(data) {
          self.itemData(data);
          self.chosenDisplayData(self.itemData());
          self.goToItem(self.itemData()[0]);
      });
    }

    self.trash = function() {
      self.itemData().shift();
       self.goToItem(self.itemData()[0]);
    }

    self.treasure = function() {
      self.goToDetails(self.itemData()[0]);
    }

    self.goToItem = function(item) {
      self.chosenDisplayId(item.display);
      self.chosenDisplayData(null);
      self.chosenIndividualData(item);
    }

    self.goToDetails = function(item) {
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(item)
    }

    self.goToGetRid = function() {
      self.chosenDisplayId(null)
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);
      self.chosenDisplayData(null);
      self.getRidData();
      self.showSplashScreen(false);
      self.showGetRidForm(true);
    }

    // self.makeContact = function(item){
    //   self.chosenIndividualDetails(null)
    //   self.makeContact(item)
    // }

    if (token) {
      headers.Authorization = 'Bearer ' + token;
      self.browseNearYou("All");
    }
    else {
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
