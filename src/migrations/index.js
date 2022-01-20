const { migrate} = require('./migration')
const db = require('../configurations/config');




(async () => {
    try {
        const result = await migrate(db);
        console.log(result);
        result && console.log('database migrated successfully');
        process.exit()
    } catch (error) {
        console.log(error)
    }
})()