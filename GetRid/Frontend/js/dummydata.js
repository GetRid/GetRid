$(document).ready(function() {
ko.applyBindings({
  testData: [
    {
      "name": "Fridge",
      "description": "Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "https://www.topclasscarpentry.com/images/thumbnails/Fridges-Freezers/deluxe-frost-free-american-fridge-freezer-open_300.jpg"
    },
    {
      "name": "Frezer",
      "description": "More Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://thefreezerguide.com/wp-content/uploads/2012/10/frigidaire-ffc0923dw-chest-freezer.jpg"
    }
  ]
});

$(document).on('click', '#tester', function(e){
  e.preventDefault();
  var $things = testData


  for (var i=0; i<testData.length; i+=1){
    function listView(){
      this.name = ko.observable(testData[i].name)
      this.image = ko.observable(testData[i].image)
    }

    ko.applyBindings(new listView());


    // $('#appender').append(
    //   testData[i].name + '<br>'
      // )
  };


});




}); //End of doc ready
