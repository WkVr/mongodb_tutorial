const { MongoClient } = require('mongodb');
const uri = require('./atlas_uri');

const client = new MongoClient(uri);
const dbname = 'tutorial';
const collentionName = 'account';

const accountCollection = client.db(dbname).collection(collentionName);

const connectToDatabase = async () => {
    try{
        await client.connect();
    }
    catch (e) {
        console.log(e);
    }
}

const sampleAccount = [{
    account_holder: 'John',
    account_id: '123456',
    balance: 200,
    last_updated: new Date(),
},{
    account_holder: 'John 2',
    account_id: '123456 2',
    balance: 202,
    last_updated: new Date(),
}];

const main = async () => {
    try{
        await connectToDatabase();
        // const databaseList = await client.db().admin().listDatabases();
        // databaseList.databases.forEach(db => console.log(db.name));

        // const res = await accountCollection.insertOne(sampleAccount);
        // console.log(res.insertedId);

        const res = await accountCollection.insertMany(sampleAccount);
        console.log(res.insertedIds);
    }
    catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main();