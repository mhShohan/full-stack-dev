// $count => count the number of input documents

// $count stage always use as  last stage


// Example 1
db.getCollection("persons").aggregate([
    { $count: 'allDocumentsCount' },
]);


// Example 2
db.getCollection("persons").aggregate([
    { $match: { age: { $gt: 30 } } },
    { $count: 'allDocumentsCount' },
]);
