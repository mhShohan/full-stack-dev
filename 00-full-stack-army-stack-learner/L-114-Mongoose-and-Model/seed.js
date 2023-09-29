const { faker } = require('@faker-js/faker');
const User = require('./src/models/User');

const seedUser = (n = 5) => {
    for (let i = 0; i < n; i++) {
        const user = new User({
            name: faker.person.fullName(),
            email: faker.internet.email(),
            password: 'test123'
        });

        user.save();
    }
};

module.exports = { seedUser };
