//Update methods syntax
db.collectionName.updateOne(query, update, option);
db.collectionName.updateMany(query, update, option);
db.collectionName.replaceOne(query, replacement_data, option);






// operators
// $set => Replace or set value of the field
db.getCollection('collection_name').update(
    //query
    { id: ObjectId },
    // updates 
    {
        $set: {
            customerId: 345,
            customer: {
                name: 'hello',
                email: 'hello@h.h',
                age: 34
            }
        }
    },
    // options (optional)
    {}
);


// $unset => remove the field
{ $unset: { fieldName: 1; } }





//// options
// to update multiple documents
{ multi: true; }


// timestamps
db.collectionName.updateMany(query, { $currentDate: { createdAt: true, updatedAt: true, } }, option);


// Array update operators
/**
 * $
 * $push        => {$push: {cart: 'item1' }} and {{$push: {cart: {$each: ['item' , 'item2']} }}}
 * $pop         => {$push: {cart: 1 }}                  => remove the last element of Array
 * $addToSet    => {$push: {cart: 'item1' }}            => push to array if same element is not exist in array
 * $pull        => {$pull: {'person.age': {$lt: 18} }}  => remove all element in the array if match the give condition
 * $pullAll     => {$pullAll: {'person.age': 18 }}      => remove all element to the array that match the specific value
 */