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
      "image": "http://thefreezerguide.com/wp-content/uploads/2012/10/frigidaire-ffc0923dw-chest-freezer.jpg"
    },
    {
      "name": "Oven",
      "description": "More Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://www.mustknowhow.com/wp-content/uploads/2010/05/fff37f7a-5e1d-49f7-b12f-7f2899effb0b_300.jpg"
    }
  ]


  function appViewModel(){
    var self = this;
    self.showSplashScreen = ko.observable(true);
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