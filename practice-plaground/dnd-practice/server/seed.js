const User = require("./User.model");
const users = [
    { index: 1, name: "Alice Johnson", email: "alice.johnson@example.com" },
    { index: 2, name: "Bob Smith", email: "bob.smith@example.com" },
    { index: 3, name: "Charlie Brown", email: "charlie.brown@example.com" },
    { index: 4, name: "Dana White", email: "dana.white@example.com" },
    { index: 5, name: "Evan Davis", email: "evan.davis@example.com" },
    { index: 6, name: "Fiona Green", email: "fiona.green@example.com" },
    { index: 7, name: "George Hill", email: "george.hill@example.com" },
    { index: 8, name: "Hannah Adams", email: "hannah.adams@example.com" },
    { index: 9, name: "Ian Miller", email: "ian.miller@example.com" },
    { index: 10, name: "Jane Moore", email: "jane.moore@example.com" },
    { index: 11, name: "Kyle Turner", email: "kyle.turner@example.com" },
    { index: 12, name: "Laura Scott", email: "laura.scott@example.com" },
    { index: 13, name: "Michael Lee", email: "michael.lee@example.com" },
    { index: 14, name: "Nancy Carter", email: "nancy.carter@example.com" },
    { index: 15, name: "Oscar Martin", email: "oscar.martin@example.com" },
    { index: 16, name: "Paul Harris", email: "paul.harris@example.com" },
    { index: 17, name: "Quinn Wright", email: "quinn.wright@example.com" },
    { index: 18, name: "Rachel Clark", email: "rachel.clark@example.com" },
    { index: 19, name: "Steven Lewis", email: "steven.lewis@example.com" },
    { index: 20, name: "Tina Hall", email: "tina.hall@example.com" }
];

const seedUsers = async () => {
    try {
        const newUsers = await User.insertMany(users)
        console.log("Users seeded successfully",newUsers.length);
    } catch (error) {
        console.error("Error seeding users:", error);
    }
};

module.exports = seedUsers