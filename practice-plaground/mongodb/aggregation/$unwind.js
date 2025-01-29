// $unwind => Splits each document with specific array to the several documents - one document per array element


// Example 1 (combination of 3 stages => $unwind, $group, $count )
db.getCollection("persons").aggregate([
    { $unwind: "$tags" }, // Splits each document by tags array
    { $group: { _id: '$tags' } }, // group by the tags
    { $count: 'all' } // count the all documents
]);


// Example 2 => (combination of 2 stages => $unwind and $project)
db.getCollection("persons").aggregate([
    { $unwind: "$tags" },
    { $project: { name: 1, age: 1, tags: 1 } },
]);