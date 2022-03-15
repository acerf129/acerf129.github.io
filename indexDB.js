var request = window.indexedDB.open("NewDB", 3);


request.onsuccess = function(event) {
  db = event.target.result;
};

// // This event is only implemented in recent browsers
// request.onupgradeneeded = function(event) {
//   // Save the IDBDatabase interface
//    db = event.target.result;

//   // Create an objectStore for this database
//   var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
// };

const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];


//Insert Data
const dbName = "NewDB";

var request = indexedDB.open(dbName, 3);

request.onerror = function(event) {
  // Handle errors.
};
request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique - or at least that's what I was told during the kickoff meeting.
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction("customers", "readwrite").objectStore("customers");
    customerObjectStore.oncomplete = function(event) {
      console.log("All done!");
    };
    
    customerObjectStore.onerror = function(event) {
      // Don't forget to handle errors!
    };
    customerData.forEach(function(customer) {
      customerObjectStore.add(customer);
    });
  };
};

//Remove Data
var request = db.transaction(["customers"], "readwrite")
                .objectStore("customers")
                .delete("444-44-4444");
request.onsuccess = function(event) {
  // It's gone!
};

//Get Data
var transaction = db.transaction(["customers"]);
var objectStore = transaction.objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  console.log("Name for SSN 444-44-4444 is " + request.result.name);
};


db.transaction("customers").objectStore("customers").get("444-44-4444").onsuccess = function(event) {
  console.log("Name for SSN 444-44-4444 is " + event.target.result.name);
};

//Updatet Data
var objectStore = db.transaction(["customers"], "readwrite").objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Get the old value that we want to update
  var data = event.target.result;

  // update the value(s) in the object that you want to change
  data.age = 42;

  // Put this updated object back into the database.
  var requestUpdate = objectStore.put(data);
   requestUpdate.onerror = function(event) {
     // Do something with the error
   };
   requestUpdate.onsuccess = function(event) {
     // Success - the data is updated!
   };
};



