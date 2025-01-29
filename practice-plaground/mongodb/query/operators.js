// $eq  => To check equality
{ name: { $eq: 'shohan'; } }
// $ne  => not equal
{ name: { $ne: 'shohan'; } }


// $lt  => less than 
{ age: { $lt: 30; } }
// $lte => less than equal
{ age: { $lte: 30; } }


// $gt => greater than 
{ age: { $gt: 30; } }
// $gte => greater than equal
{ age: { $gte: 30; } }



// explicit and => when conditions are with the same key, then must use explicit and operator
// $and => combine multiple condition. Must match all conditions
{
    $and: [
        { age: { $gt: 20 } },
        { age: { $lt: 22 } }
    ];
}


// $or => combine multiple condition. Must match any of one from the given conditions
{
    $or: [
        { gender: { $gt: 20 } },
        { age: { $lt: 22 } }
    ];
}