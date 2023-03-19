// $limit => give output of the first limited document
db.getCollection("persons").aggregate([
    { $limit: 10 }
]);


db.getCollection("persons").aggregate([
    { $skip: 200 }, // skip the first 200 documents
    { $limit: 20 }, // only returns 20 documents
]);