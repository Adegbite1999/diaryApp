const createUserTable = `
CREATE TABLE IF NOT EXISTS
users(
id INTEGER PRIMARY KEY NOT NULL UNIQUE,
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
email VARCHAR(128) UNIQUE NOT NULL,
password VARCHAR(250) NOT NULL,
created_on TIMESTAMP DEFAULT NOW()
)`;

const createDiaryTable = `
CREATE TABLE IF NOT EXISTS
diary(
    id INTEGER PRIMARY KEY NOT NULL UNIQUE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    created_on TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
)`;

const migrate = async (db) => {
    try {
        await db.query(createUserTable);
        await db.query(createDiaryTable);
        return true
    } catch (error) {
        return console.log(error)
    }
}


module.exports = { migrate, createDiaryTable, createUserTable }