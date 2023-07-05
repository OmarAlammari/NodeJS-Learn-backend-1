const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/';

async function connect() {
    const client = await MongoClient.connect(url);
    console.log('connect');

    const collection = client.db('it').collection('Students');

    const data = await collection
        .find(
        // {}
        // { _id: new ObjectId('64a45ae8a3e8bdb51af4c571') }
        // { fn: /^o/ }                  // >> Start o
        // { fn: /^o.*r$/ }              // >> Start o & End r
        // { fn: /.*(ar)$/ }             // >> End ar
        // { fn: /.*[arn]$/ }            // >> End a or r or n
        // { id: { $eq: 2 } }            // >> id = 2
        // { id: { $gt: 2 } }            // >> id > 2
        // { id: { $gte: 2 } }           // >> id >= 2
        // { id: { $lt: 2 } }            // >> id < 2
        // { id: { $lte: 2 } }           // >> id <= 2
        // { id: { $gte: 2, $lt: 4 } }   // >> id between (2,4)

        // {
        //     $or: [
        //         { fn: "omar" },
        //         { ln: "omar" }
        //     ]
        // }

        // {
        //     fn: "omar", ln: "omar1"  // And
        // }

        // , {
        //     projection: {
        //         id: 0,
        //         dept: 0
        //     }
        // }

    )

        // .limit(5)
        // .sort({ fn: 1 })
        // .select({ fn: 1, ln: 1 })
        .toArray();
    console.log(data);
}
connect();