// delete all documents in the collection
db.collectionName.remove({});


// delete single documents in the collection which query will match
db.collectionName.remove({ query }, true);


// delete single documents in the collection which query will match
db.collectionName.deleteOne({ query });


// delete all documents in the collection which query will match
db.collectionName.deleteMany({ query });


// delete a collection 
db.collectionName.drop();


// delete entire database 
db.dropDatabase();