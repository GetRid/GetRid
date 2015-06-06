$(document).ready(function() {

  testData = [
    {
      "name": "Fridge",
      "description": "Random Words fdggshfs dfsgsfg dfss adfdf wretr retrtt rtysry ryryytw serewww fewr cffd sddfse rtttrty ttr qqww ewrr tetytyy",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://carvalhoscleaning.com/wp-content/uploads/2012/06/fridge-1.jpg"
    },
    {
      "name": "Freezer",
      "description": "More Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://beautifulkitchensblog.co.uk/wp-content/uploads/2013/04/WBA33992-NFC-IX-fridge-freezer-Whirlpool.jpg"
    },
    {
      "name": "Oven",
      "description": "More Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://ecx.images-amazon.com/images/I/71mdsLdw2-L._SL1500_.jpg"
    },
        {
      "name": "TV",
      "description": "This is a Cool TV!",
      "location": "Petone",
      "category": "Household Appliances",
      "image": "http://www.fotoagent.dk/single_picture/11174/138/medium/DENVER_DFT-4219.jpg"
    }
  ]


  function appViewModel(){
    var self = this;
    self.showSplashScreen = ko.observable(true);
    self.showSignInSignUpForm = ko.observable(false);
    self.showGetRidForm = ko.observable(false);
    self.showNavBar = ko.observable(false);
    //self.displays = ['All', 'Categories', 'Location', 'Get Rid'];

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
      self.chosenDisplayId(display)
      self.chosenIndividualData(null);
      self.chosenIndividualDetails(null);
      //$.get('/items#####', {param: all}, self.chosenDisplayData)
      self.chosenDisplayData(testData);
      self.goToItem(testData[0]);
    };

    self.trash = function(){
      testData.shift();
       self.goToItem(testData[0]);
    }

    self.treasure = function(){
      self.goToDetails(testData[0]);
    }

    self.goToItem = function(item) {
      self.chosenDisplayId(item.display);
      self.chosenDisplayData(null);
      //$.get('item', {itemId: testData.id}, self.chosenIndividualData)
      self.chosenIndividualData(item);
    }

    self.goToDetails = function(item){
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

    //self.goToDisplay('All');
    //self.goToItem(testData[0]);

  }; //End of appViewModel
  ko.applyBindings(new appViewModel());

}); //End of doc ready
