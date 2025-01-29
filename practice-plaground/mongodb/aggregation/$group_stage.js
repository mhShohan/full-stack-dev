
/**
 * _id: The id of the group.
 * fieldN: The first field name.
 
{
    _id: expression,
    fieldN: {
        accumulatorN: expressionN
    }
}
*/

// Example 1
db.getCollection("persons").aggregate([
    {
        $group: {
            _id: "$age",
        }
    }
]);

// Example 2 => group by multiple fields
db.getCollection("persons").aggregate([
    {
        $group: {
            _id: {
                gender: "$gender",
                eyeColor: "$eyeColor"
            },
        }
    }
]);

// Example 3 => group nested documents fields
db.getCollection("persons").aggregate([
    {
        $group: {
            _id: "$company.location.country",
        }
    }
]);
