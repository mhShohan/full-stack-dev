// save a new collection to database
db.getCollection("persons").aggregate([
    { $group: { _id: "$age" } },
    { $out: "new" }
]);