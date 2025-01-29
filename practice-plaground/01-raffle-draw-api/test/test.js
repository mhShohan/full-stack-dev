const myDB = require('../db/db')

myDB.create('shohan', 50)
myDB.create('mh', 50)
myDB.create('mehdi', 50)
myDB.create('hasan', 50)
myDB.create('hasan', 50)
myDB.create('hasan', 50)

// myDB.bulkCreate('mh shohan', 50,)
// myDB.bulkCreate('sakib', 50, 5)

// console.log(myDB.raffleDraw(3))
console.log(myDB.deleteByUsername('hasan'))
console.log(myDB.find())

// console.log(myDB.find())