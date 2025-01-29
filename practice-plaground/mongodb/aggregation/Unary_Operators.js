/**
 * Unary Operators => used in $project stage
 * $type
 * $or
 * $and
 * $lt
 * $gt
 * $multiply
 */


// Example 1
db.getCollection("persons").aggregate([
    {
        $project: {
            name: { $type: "$name" }
        }
    },
]);