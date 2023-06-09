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
    account_holder: 'John 3',
    account_id: '123456 3',
    balance: 203,
    last_updated: new Date(),
},{
    account_holder: 'John 4',
    account_id: '123456 4',
    balance: 204,
    last_updated: new Date(),
},{
    account_holder: 'John 5',
    account_id: '123456 5',
    balance: 205,
    last_updated: new Date(),
},{
    account_holder: 'John 6',
    account_id: '123456 6',
    balance: 206,
    last_updated: new Date(),
}];

const documentsToFind = {balance: {$gt: 200}};
// const documentsToFind = { _id: "6478aeedff24c3837af9dac7" };

// const documentsToDelete = { _id: "6478aeedff24c3837af9dac7" };
const documentsToDelete = {balance: {$lt: 200}};

// const update = { $inc: { balance: 100 } };
const update = { $inc: { balance: 100 } };

const pipeline = [
    { $match: { balance: { $gt: 201 } } },
    { $sort: { last_updated: -1 } },
    { $project: {
        _id: 1,
        account_holder: 1,
        balance: 1,
        gbp_balance: { $divide: ["$balance", 1.3] }
    } }
]

const main = async () => {
    try{
        await connectToDatabase();
        // const databaseList = await client.db().admin().listDatabases();
        // databaseList.databases.forEach(db => console.log(db.name));

        // const res = await accountCollection.insertOne(sampleAccount);
        // console.log(res.insertedId);

        // const res = await accountCollection.insertMany(sampleAccount);
        // console.log(res.insertedIds);

        // let res = accountCollection.find(documentsToFind);
        // let count = accountCollection.countDocuments(documentsToFind);
        // await res.forEach((doc) => console.log(doc));

        // let res = await accountCollection.findOne(documentsToFind);
        // console.log(res);

        // let res = await accountCollection.updateOne(documentsToFind, update);
        // console.log(res);

        // let res = await accountCollection.updateMany(documentsToFind, update);
        // console.log(res);

        // let res = await accountCollection.deleteOne(documentsToDelete);
        // console.log(res);

        // let res = await accountCollection.deleteMany(documentsToDelete);
        // console.log(res);

        let res = await accountCollection.aggregate(pipeline);
        
        for await (const doc of res){
            console.log(doc);
        }
    }
    catch(e) {
        console.log(e);
    } finally {
        await client.close();
    }
}

main();