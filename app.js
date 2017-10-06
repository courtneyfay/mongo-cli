var mongo = require("mongodb").MongoClient;
var prompt = require("prompt-sync")();
var opn = require("opn");
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
  	if (oneName != "") {

      collection.find(nameLookup).toArray(function(err, doc){
        if (err) console.log(err);
        else {

          // reports back the record of the restaurant
          console.log("Found the restaurant: " + oneName);

          // asks the user which part of the restaurant record they'd like to update
          let editPrompt = prompt("What would you like to update? Type 'name' or 'address' or 'yelp': ");  
          if (editPrompt === "name") {
            let namePrompt = prompt("Type the new restaurant name and press enter: ");
            collection.update(nameLookup, { $set: { name: namePrompt }});
            collection.find().toArray(function(err, doc){
              if (err) {
                  console.log(err);
                } else {
                console.log(doc);
              }
            });
          } else if (editPrompt === "address") {
              let addressPrompt = prompt("Type the new restaurant address and press enter: ");
              collection.update(nameLookup, { $set: { address: addressPrompt }});
              collection.find().toArray(function(err, doc){
              if (err) {
                  console.log(err);
                } else {
                console.log(doc);
              }
            });
          } else if (editPrompt === "yelp") {
              let yelpPrompt = prompt("Type the new restaurant Yelp URL and press enter: ");
              collection.update(nameLookup, { $set: { yelp: yelpPrompt }});
              collection.find().toArray(function(err, doc){
              if (err) {
                  console.log(err);
                } else {
                console.log(doc);
              }
            });
          }
        }
      });      
	  } else {
			console.log("Okay, no problem.");
	  }  
  } else {
  	console.log('Okay, no problem.');
  };
  
  // DELETE - lets users delete specific restaurants 
  var deleteOne = prompt("Type 'delete' if you'd like to remove a restaurant from the list: ");
  if (deleteOne === "delete" ) {
    var theName = prompt("Type the name of the specific restaurant you're looking for: ");
    var getRestaurantByName = { "name" : theName };
    if (theName != "" ) {
      collection.find(getRestaurantByName).toArray(function(err, doc){
        collection.remove(doc[0]);
        console.log("That restaurant has been removed successfully.");
      });
    } else {
      console.log("Okay, no problem.");
    };
  }

  // DELETE - lets users delete specific restaurants 
  var deleteAll = prompt("Type 'dynamite' if you'd like to remove ALL the restaurants: ");
  if (deleteAll === "dynamite" ) {
    db.dropDatabase();
    opn('https://i.makeagif.com/media/12-01-2015/gscz6z.gif');
  }
});