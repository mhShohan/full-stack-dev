db.getCollection('collection_name').findOne({});

// find all documents and query with the various conditions
db.getCollection('collection_name').find({});
db.getCollection('collection_name').find({ condition1, condition2, }); // condition like { age: { $lt: 30; } }
db.getCollection('collection_name').find({}).count();
db.getCollection('collection_name').find({}).sort({ key: 1 }); //sort key => 1 ascending sorting
db.getCollection('collection_name').find({}).sort({ key: -1 }); // sort key => -1 descending sorting