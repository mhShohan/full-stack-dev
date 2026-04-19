const db = require("./src/config/db");

const main = async () => {
  try {
    // const [result] = await db.execute(
    //   'INSERT INTO users (name, email, gender, date_of_birth) VALUES (?, ?, ?, ?)',
    //   ['John Doe', 'john@example.com', 'Male', '1990-01-01']
    // );

    const [result] = await db.execute('SELECT * FROM users');
    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

main();