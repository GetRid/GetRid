$(document).ready(function() {

  function appViewModel() {
    var self = this;

    self.itemData = ko.observable();

    // VIEWS
    self.showSplashScreen = ko.observable(true);
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);
    self.showSuccessfulGetRid = ko.observable(false);

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
      $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
          data: ko.toJSON({
            UserName: self.UserName,
            Password: self.Password,
          }),
          type: "post",
          contentType: "application/json"
      })
      .done(function(result) {
        self.showSignInSignUpForm(false);
        self.showNavBar(true);
        self.goToDisplay(display);
      })
      .fail(function(result) {
          console.log("REGISTRATION REQUEST FAILED", result);
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
            contentType: "application/json"
        })
        .done(function(result) {
          console.log("REGISTRATION REQUEST DONE: ", data);
          self.showSuccessfulGetRid(true);
        })
        .fail(function(result) {
            console.log("GET RID REQUEST FAILED", result);
        });
    }

    self.handleSignUp = function(formElement) {
        $.ajax("http://getridapi.azurewebsites.net/api/Account/Register", {
            data: ko.toJSON({
              UserName: self.UserName,
              Email: "dummy22@email.com",
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

    // Hammer JS
    var imageSwipe = document.getElementById('imageSwipe'); //$('#imageSwipe');
    var swipeEvent = new Hammer(imageSwipe);
    //console.log(imageSwipe);
    //console.log(swipeEvent);
    swipeEvent.on("panleft panright", function(ev){
      console.log("NO!");
      console.log(ev);
      if (e.type == panleft) {
        self.trash();
      } else if (e.type == panright) {
        self.treasure();
      }
    });

  }; //End of appViewModel
  ko.applyBindings(new appViewModel());

  // // Hammer JS
  // var imageSwipe = $('#imageSwipe'); //document.getElementById('imageSwipe');
  // var swipeEvent = new Hammer(imageSwipe);
  // console.log(imageSwipe);
  // //console.log(swipeEvent);
  // swipeEvent.on("panleft panright", function(e){
  //   console.log("NO!");
  //   console.log(e);
  //   if (e.type == panleft) {
  //     //self.trash();
  //     console.log("pan left");
  //   } else if (e.type = panright) {
  //     //self.treasure();
  //     console.log("pan right");
  //   }
  // });

}); //End of doc ready
