import {MongoClient} from 'mongodb';

// this code runs only on server and is never exposed to the client, so we can store creds
async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://igorgo:testpass@cluster0.80g4m.mongodb.net/meetups?retryWrites=true&w=majority');
        const db = client.db();

        const meetupsCollection = db.collection('meetups'); // any name of the collection, may differ from the DB name, indicated in the connection string
        const result = await meetupsCollection.insertOne(data); // will return auto generated ID
        console.log('SERVER api handler logger - document returned ID:');
        // console.log(result); { insertedId: new ObjectId("61c9ef474805b4e8f2b18c61") }

        await client.close(); // close DB connection

        res.status(201).json({message: 'New meetup added'});
    }
}

export default handler;
