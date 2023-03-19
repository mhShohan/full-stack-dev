// Accumulators => only use in $group stage

/**
 * $sum {$sum: <expression>}
 * $avg {$age: <expression>}
 * $max
 * $min
 * 
 */


// Example 1 => count the documents have in each group
db.getCollection("persons").aggregate([
    {
        $group: {
            _id: "$age",
            count: { $sum: 1 }
        }
    },
]);

// Example 2
db.getCollection("persons").aggregate([
    {
        $group: {
            _id: "$gender",
            count: { $avg: "$age" }
        }
    },
]);

