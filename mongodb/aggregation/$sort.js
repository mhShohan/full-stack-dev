// $sort => this stage sort all documents by certain fields
// if fields value is 1, then sort documents ascending (low to high)
// if fields value is -1, then sort documents descending (high to low)

// Example 1
db.getCollection("persons").aggregate([
    { $sort: { age: -1 } },
]);



// Example 2
// if fields are boolean then 1 => false and -1 => true
db.getCollection("persons").aggregate([
    { $sort: { isActive: 1 } },
]);


// Example 3 => sort by multiple fields
db.getCollection("persons").aggregate([
    {
        $sort: {
            age: 1,
            gender: -1,
            eyeColor: 1,
            favoriteFruit: -1
        }
    },
]);


// Example 4 => group data and sort 
db.getCollection("persons").aggregate([
    { $group: { _id: '$age' } },
    { $sort: { _id: 1 } },
]);