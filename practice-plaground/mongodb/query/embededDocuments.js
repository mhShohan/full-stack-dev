/*
// example document 

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

// query to the nested or embeded documents 
db.getCollection('collection_name').find({ "company.location.country": "Italy" });

//query to the nested array
db.getCollection('collection_name').find({ "tags.0": value });

db.getCollection('collection_name').find({ tags: { $all: ["adipisicing", "in"] } }); // check to the array is the value includes or not
db.getCollection('collection_name').find({ tags: { $size: value } }); // return array if the length is equal to the value


// Array of nested object 


{ name_of_arrayField: { $elemMatch: { condition, condition; } } }
// where { age: { $lt: 30; } } is the example of condition



// Fields filtering 
db.getCollection('collection_name').find({}, { name: 1, _id: 0 }); // 1 => for show the field, and  0 => for hide the field




