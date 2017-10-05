var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var url = "mongodb://localhost:27017/restaurant_db";

mongo.connect(url, function(err, db){
  var collection = db.collection('restaurants');
  var allChoice = prompt("Type 'all' and press enter to display all restaurants' names: ");
  if (allChoice == "all") {
    collection.find().toArray(function(err, doc){
      console.log(doc);
    });
  } else {
		console.log("Okay, no problem.");
  };

  // READ - find just one restaurant by typing in its name 
  // You may want to research the .forEach() command to see how you could employ a callback function.
  var oneChoice = prompt("Type the name of the specific restaurant you're looking for: ");
  var nameSearch = { "name" : oneChoice };
  if (oneChoice != "" ) {
  	collection.find(nameSearch).toArray(function(err, doc){
  		console.log(doc);
  	});
  } else {
		console.log("Okay, no problem.");
  };
  
  // CREATE - allow users to type in information to add their own restaurants to the db
 	var addRest = prompt("Type 'add' to create a new restaurant and add it to our database: ");
 	if (addRest == "add") {
 		
 		// prompts asking for name, yelp URL, and address of the restaurant
 		var newName = prompt("Type the name of the restaurant you'd like to add: ");
 		var newYelpURL = prompt("Type the yelp URL of the restaurant: ");
 		var newAddress = prompt("Type the physical address of the restaurant: ");

 		// ask user to type "yes" to submit data to the db
 		var verifyNewInfo = prompt("Type 'yes' to add this restaurant: ");
 		if (verifyNewInfo == "yes") {
 			var newRestaurant = { "name" : newName , "yelp" : newYelpURL , "address" : newAddress };
	 		collection.insert(newRestaurant);
	 		console.log("We've added your new restaurant to the database.");
		} else {
			console.log("Okay, no problem.");
		}
  } else {
			console.log("Okay, no problem.");
	};
  
  // UPDATE - lets users edit specific restaurants
  var updateEntry = prompt("Type 'edit' if you'd like to update information about a restaurant: ");
  if (updateEntry === "edit") {
  	var oneName = prompt("Type the name of the specific restaurant you're looking for: ");
  	var nameLookup = { "name" : oneName };
  	if (oneChoice != "" ) {
	  	collection.find(nameSearch).toArray(function(err, doc){
	  		console.log(doc);
	  	});
	  } else {
			console.log("Okay, no problem.");
	  }
  } else {
  	console.log('Okay, no problem.');
  };
  
  // DELETE - lets users delete specific restaurants (or the entire database?)
  
});