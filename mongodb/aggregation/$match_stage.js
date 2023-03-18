
// { $match: { query }} 
// work as db.collection_name.find({query})

// Example 1
db.getCollection("persons").aggregate([
    { $match: { name: "Aurelia Gonzales" } }
]);


// Example 2
db.getCollection("persons").aggregate([
    { $match: { age: { $eq: 40 } } }
]);



// combination of 2 stages => $match and $group
db.getCollection("persons").aggregate([
    { $match: { isActive: true } },
    {
        $group: {
            _id: {
                gender: "$gender",
                age: "$age"
            },
        }
    }
]);