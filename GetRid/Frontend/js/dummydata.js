$(document).ready(function() {


// ko.applyBinding({
// Use testData: [ to apply ko binding]
  testData = [
    {
      "name": "Fridge",
      "description": "Random Words",
      "location": "Te Aro",
      "category": "Household Appliances",
      "image": "http://carvalhoscleaning.com/wp-content/uploads/2012/06/fridge-1.jpg"
    },
    {
      "name": "Frezer",
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
// });

$(document).on('click', '#tester', function(e){
  e.preventDefault();
   function listView(){
    testData
   }
  ko.applyBindings(new listView());
});



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
