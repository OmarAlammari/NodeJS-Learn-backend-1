const MongoClient = require('mongodb').MongoClient;
//"start": "nodemon app.js",

const url = 'mongodb://127.0.0.1:27017/';

const Connection = (async () => {
    const client = await MongoClient.connect(url);
    console.log('connect');

    const db = client.db('it');
    return { client,  db };
})();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

// const url = 'mongodb://127.0.0.1:27017/';

async function connect() {
    const client = await MongoClient.connect(url);
    console.log('connect');

    const collection = client.db('it').collection('Students');

    const data = await collection
        .find({ _id: new ObjectId('64a45ae8a3e8bdb51af4c571') })
        // .find({})
        .toArray();
    console.log(data);
}
// connect();


module.exports = Connection;