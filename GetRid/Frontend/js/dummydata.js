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
  //self.displays = ['All', 'Categories', 'Location', 'Get Rid'];

  self.displays = [{label : "All",
                    icon: "fa fa-globe"
                   },
                   {label : "Category",
                    icon: "fa fa-folder-open-o"
                   },
                   {label : "Search Location",
                    icon: "fa fa-location-arrow"
                   },
                   {label : "Get Rid",
                    icon: "fa fa-trash-o"
                   },
                   {label : "jbolo",
                    icon  : "fa fa-fw fa-user"}
                  ];
  self.chosenDisplayId = ko.observable();
  self.chosenDisplayData = ko.observable();
  self.chosenIndividualData = ko.observable();
  self.chosenIndividualDetails = ko.observable();
  self.makeContact = ko.observable();


  //Behaviours
  self.browseNearYou = function(display) {
    self.showSplashScreen(false);
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

  // self.makeContact = function(item){
  //   self.chosenIndividualDetails(null)
  //   self.makeContact(item)
  // }

  //self.goToDisplay('All');
  //self.goToItem(testData[0]);

}; //End of appViewModel
ko.applyBindings(new appViewModel());

// $(document).on('click', '#list', function(e){
//   e.preventDefault();
//    function listView(){
//     // if (testData.length > 0){
//     //   testData: ko.observable(true)
//     //     } else {
//     //   testData: ko.observable(false)
//     //     }
//     testData
//    }
//   ko.applyBindings(new listView());
// });

// $(document).on('click', '#swipe', function(e){
//   e.preventDefault();
//     function swipeView(){
//       swipeTestData
//     }
//   ko.applyBindings(new swipeView());
// });



// $(document).on('click', '#tester', function(e){
//   e.preventDefault();
//   var $things = testData
//   for (var i=0; i<testData.length; i+=1){
//     function listView(){
//       this.name = ko.observable(testData[i].name)
//       this.image = ko.observable(testData[i].image)
//     }
//     ko.applyBindings(new listView());
//   };
// });




}); //End of doc ready
