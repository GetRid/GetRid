$(document).ready(function() {

  function appViewModel() {
    var self = this;
    self.itemData = ko.observable();
    self.showSplashScreen = ko.observable(true);
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);

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


    //Behaviours
    self.signIn = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
    }

    self.signUp = function(display) {
      self.showSplashScreen(false);
      self.showSignInSignUpForm(true);
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
          console.log(self.itemData()[0]);
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
