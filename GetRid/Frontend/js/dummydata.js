$(document).ready(function() {

testData = [
  {
    "name": "Fridge",
    "description": "Random Words",
    "location": "Te Aro",
    "category": "Household Appliances",
    "image": "http://placehold.it/320x150"
  },
  {
    "name": "Frezer",
    "description": "More Random Words",
    "location": "Te Aro",
    "category": "Household Appliances",
    "image": "http://placehold.it/320x150"
  }
]


$(document).on('click', '#tester', function(e){
  e.preventDefault();
  var $things = testData
  console.log($things)
  console.log(testData)
  for (var i=0; i<testData.length; i+=1){

    $('#appender').append(
      testData[i].name + '<br>'


      )
  };

});




}); //End of doc ready
