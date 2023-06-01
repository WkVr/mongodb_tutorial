const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');

const client = new MongoClient(uri);
const dbname = 'tutorial';

const connectToDatabase = async () => {
    try{
        await client.connect();
    }
    catch (e) {
        console.log(e);
    }
}

const main = async () => {
    try{
        await connectToDatabase();
        const databaseList = await client.db().admin().listDatabases();
        databaseList.databases.forEach(db => console.log(db.name));
    }
    catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main();