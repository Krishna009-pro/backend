// db.js
const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://kkp1882006_db_user:MongoDBPass123@airnb.qsqzoam.mongodb.net/airnb?appName=airnb";
const client = new MongoClient(uri);
let db;

async function connectDB() {
    if (!db) {
        await client.connect();
        console.log("MongoDB Atlas connected");
        db = client.db("airnb");
    }
    return db;
}

function getDB() {
    if (!db) {
        throw new Error("Database not connected");
    }
    return db;
}

exports.connectDB = connectDB;
exports.getDB = getDB;
