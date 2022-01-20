const createUserTable = `
CREATE EXTENSION IF NOT EXISTS "uuid_ossp";
CREATE TABLE IF NOT EXISTS
users(
id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT  uuid_generate_v4(),
firstname VARCHAR(255) NOT NULL,
lastname VARCHAR(255) NOT NULL,
email VARCHAR(128) UNIQUE NOT NULL,
password VARCHAR(250) NOT NULL,
created_on TIMESTAMP DEFAULT NOW()
)`;

const createDiaryTable = `
CREATE TABLE IF NOT EXISTS
diary(
    id UUID PRIMARY KEY NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    user_id UUID NOT NULL,
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