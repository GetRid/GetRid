$(document).ready(function() {

  //you should define the function outside of the ready block and just create it here
  function appViewModel() {
    //instead of a blanket self it is better to use this in the constructor and just create a local self variable when you need to 
    //(e.g. when you create an ajaax call)
    var self = this; 

    self.itemData = ko.observable();
    self.showSplashScreen = ko.observable(true);
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);

    self.UserName = ko.observable();
    self.Password = ko.observable();

    self.displays = [{label : "All"},
                     {label : "Category"},
                     {label : "Search Location"},
                     {label : "Get Rid"},
                    ];

    self.chosenDisplayId = ko.observable();
    self.chosenDisplayData = ko.observable();
    self.chosenIndividualData = ko.observable();
    self.chosenIndividualDetails = ko.observable();
    self.makeContact = ko.observable();
    self.getRidData = ko.observable();


    //these should be on the prototype
    //Behaviours
    self.signIn = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.signUp = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.handleSignIn = function() {
      self.showSignInSignUpForm(false);
      self.showNavBar(true);
      self.goToDisplay(display);
    }

    self.handleSignUp = function(formElement) {
      /* Your data in JSON format - see below */

        //the url component (http://getridapi.azurewebsites.net/api) should be stored in one spot instead of duplicated
        $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
            data: ko.toJSON({
              UserName: self.UserName,
              Email: "dummy10@email.com",
              Suburb: "Mt. Vic",
              Password: self.Password,
              ConfirmPassword: self.Password
            }),
            type: "post",
            contentType: "application/json"
        })
        .done(function(result) {
          var data = $.param({
              "grant_type": "password",
              "username": self.UserName,
              "Password": self.Password
            });
          //you should only have console.logs turned on when you are debugging
          //either comment out or only display this if a global $debug var is set then you can just set that in the console to see the messages
          console.log("REGISTRATION REQUESET DONE: ", data);

          $.ajax("http://getridapi.azurewebsites.net/token", {
            Accept: "*/*",
            type: "post",
            contentType: "application/x-www-form-urlencoded",
            data: data
          })
          .done(function(result) {
            console.log("TOKEN REQUEST DONE: ", result);
          })
          .fail(function(result) {
            console.log("TOKEN REQUEST FAILED ", result);
          })
        })
        .fail(function(result) {
            console.log("REGISTRATION REQUEST FAILED", result);
        });

      // var jsonData = ko.toJSON(data);
      // $.post("getridapi.azurewebsites.net/api/Account/Register", data, function(returnedData) {
      //     // This callback is executed if the post was successful
      //})
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

  }; //End of appViewModel
  ko.applyBindings(new appViewModel());

}); //End of doc ready
