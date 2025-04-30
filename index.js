const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

// Middleware
const corsOptions = {
    //origin: ["http://localhost:5173", "https://movie-portal-f7f50.web.app"],
    credentials: true,
    optionsSuccessStatus: 200, // fixed typo from "operationSuccessStatus"
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

// MongoDB connection URI
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uru7rsz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {

        //await client.connect();
        const carsCollection = client.db('ctgMarketing').collection('cars');


        app.get('/cars', async (req, res) => {
            const cursor = movieCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        app.post('/cars', async (req, res) => {
            const newMovie = req.body;
            console.log('Adding movie:', newMovie);
            const result = await movieCollection.insertOne(newMovie);
            res.send(result);
        });


        app.delete('/cars/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await movieCollection.deleteOne(query);
            res.send(result);
        });

        console.log("Connected to MongoDB successfully");
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Car Cleaning server is running');
});

app.listen(port, () => {
    console.log(`Car Cleaning is running on port: ${port}`);
});