// Example of the document given below 


// $project => Includes, Excludes or add new fields
// Example 1 => here 1 for show the field and 0 for hide the field
db.getCollection("persons").aggregate([
    {
        $project: {
            name: 1,
            age: 1,
            _id: 0,
            country: "$"
        }
    }
]);


// Example 2 
db.getCollection("persons").aggregate([
    {
        $project: {
            _id: 0,
            name: 1,
            age: 1,
            country: "$company.location.country" // this add a new field, this is an expression
        }
    }
]);

// Example 3 => restructure documents 
db.getCollection("persons").aggregate([
    {
        $project: {
            name: 1,
            age: 1,
            email: "$company.email",
            details: {
                phone: "$company.phone",
                address: "$company.location.address",
                country: "$company.location.country"
            }
        }
    }
]);



/*example document 
{
    "_id":  ObjectId("6410758cb6f45ffe45fbfaea"),
    "index": 23,
    "name": "Bowman Whitaker",
    "isActive": true,
    "registered": {
        "$date": {
            "$numberLong": "1403930351000";
        }
    },
    "age": 21,
    "gender": "male",
    "eyeColor": "blue",
    "favoriteFruit": "apple",
    "company": {
        "title": "HELIXO",
        "email": "bowmanwhitaker@helixo.com",
        "phone": "+1 (992) 530-2197",
        "location": {
            "country": "Italy",
            "address": "878 Erasmus Street";
        }
    },
    "tags": ["adipisicing","in"]
}
*/
