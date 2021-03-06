const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
var jwt = require('jsonwebtoken');

// cors
app.use(cors());
app.use(express.json())

// db_USER
// 8vj5fm7NbmaisIOQ

const uri = `mongodb+srv://${process.env.db_Admin}:${process.env.db_Pass}@cluster0.tj4vl.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// main api
app.get('/', (req, res) => {
    res.send('Hello World!')
});

const run = async () => {

    try {
        await client.connect();
        const toolsCollections = client.db('manufacturer').collection('tools');
        const orderCollections = client.db('manufacturer').collection('order');
        const reviewsCollections = client.db('manufacturer').collection('reviews');
        const userCollections = client.db('manufacturer').collection('user');

        // tools collection
        app.get('/tools', async (req, res) => {
            const query = {};
            const cursor = toolsCollections.find(query);
            const tools = await cursor.toArray();
            res.send(tools)
        });
        app.get('/tools/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await toolsCollections.findOne(query);
            res.send(result);
        });
        // order api 
        app.post('/orders', async (req, res) => {
            const doc = {
                user: req.body
            }
            const result = await orderCollections.insertOne(doc);
            res.send(result)
        });
        app.get('/orders', async (req, res) => {
            const query = {}
            const result = await orderCollections.find(query).toArray();
            res.send(result)
        });
        app.delete('/orders/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: ObjectId(id) }
            const result = await orderCollections.deleteOne(query);
            res.send(result)
        });
        // review collection
        app.post('/review', async (req, res) => {
            const doc = {
                user: req.body
            }
            const result = await reviewsCollections.insertOne(doc);
            res.send(result)
        });
        app.get('/review', async (req, res) => {
            const query = {}
            const result = await reviewsCollections.find(query).toArray();
            res.send(result)
        });

        // user api
        app.put('/user/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    user: req.body,
                }
            };
            const result = await userCollectionsupdateOne(filter, updateDoc, options)
        });



    }

    finally {

    }

}

run().catch(console.dir);





app.listen(port, () => {
    console.log(`App is Running on port ${port}`)
})