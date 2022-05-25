const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
var cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        // tools collection
        app.get('/tools', async(req, res)=>{
            const query = {};
            const cursor = toolsCollections.find(query);
            const tools = await cursor.toArray();
            res.send(tools)
        });
        app.get('/tools/:id', async(req, res)=>{
            const id = req.params.id;
            const query ={_id: ObjectId(id)}
            const result = await toolsCollections.findOne(query);
            res.send(result);
        });
        app.post('/orders', async(req, res)=>{            
            const doc = {
                user: req.body
              }
              const result = await orderCollections.insertOne(doc);
              res.send(result)
        });



    }
    
    finally {

    }

}

run().catch(console.dir);





app.listen(port, () => {
    console.log(`App is Running on port ${port}`)
})